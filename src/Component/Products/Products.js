import React, { useEffect, useRef, useState } from "react";
import banner from "../../assets/images/productbanner.webp";
import styles from "../../Styles/products.module.css";
import axios from "axios";
import Environment from "../../Environment";
import { Container, Spinner } from "react-bootstrap";
import Card from "../../Global/Card";
import Loading from "../../Global/Loading";

const Products = () => {
  const [loading, setLoading] = useState(true); 
  const [categories, setCategories] = useState([]);
  const [productsList, setProductsList] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const [activeCategory, setActiveCategory] = useState(null);
  const categoryRefs = useRef({});

  useEffect(() => {
    setLoading(true); 
    Promise.all([
      axios.get(`${Environment.baseURL}/api/ItemTypes`, {
        headers: { "Content-Type": "application/json", langCode: 2 },
      }),
      axios.get(`${Environment.baseURL}/api/HomeV2`, {
        headers: { "Content-Type": "application/json", langCode: 2 },
      }),
    ])
      .then(([categoriesRes, productsRes]) => {
        if (categoriesRes.status === 200) {
          setCategories(categoriesRes.data.data);
        }
        if (productsRes.status === 200) {
          setProductsList(productsRes.data.data);
          setSortedProducts(productsRes.data.data);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  const sortProducts = (option) => {
    let sorted = [...productsList];
    setSortOption(option);
    switch (option) {
      case "priceHighToLow":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "priceLowToHigh":
        sorted.sort((a, b) => a.price - b.price);
        break;
      default:
        return;
    }
    setSortedProducts(sorted);
  };
  const scrollToCategory = (category) => {
    if (categoryRefs.current[category.typeId]) {
      categoryRefs.current[category.typeId].scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  const groupedProducts = categories.reduce((acc, category) => {
    acc[category.typeId] = sortedProducts.filter(
      (product) => product.category === category.typeId
    );
    return acc;
  }, {});
  useEffect(() => {
    const handleScroll = () => {
      let currentCategory = null;
      Object.entries(categoryRefs.current).forEach(([categoryId, section]) => {
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            currentCategory = categoryId;
          }
        }
      });
      setActiveCategory(currentCategory);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <>
      <section>
        <div className={styles.banner}>
          <img alt="" src={banner} />
          <div className={styles.banner__body}>
            <h3>Outdoor Furniture</h3>
            <p className={styles.banner__para}>
              Modular seating, patio designs, and outdoor dining sets all made with durable, all-weather materials
            </p>
          </div>
        </div>
        <div className={`${styles.filters__category}`}>

          {
            categories.map((category, index) => (
              <p key={index} className={`${styles.category__para} ${activeCategory == category.typeId ? styles.active__category : ''}`} onClick={() => scrollToCategory(category)}>{category.typeName}</p>
            ))
          }

        </div>
        <div className={styles.sortingButtons}>
          <h3>Sort by Price:</h3>
          <div>
          <label
            className={`${styles.container} ${sortOption === "priceHighToLow" ? styles.active : ""}`}
            onClick={() => sortProducts("priceHighToLow")}
          >
            <input type="radio" name="sort" checked={sortOption === "priceHighToLow"} readOnly />
            <svg viewBox="0 0 64 64" height="2em" width="2em">
              <path
                d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16"
                className={styles.path}
              ></path>
            </svg>
            <span>Price: High to Low</span>
          </label>
          <label
            className={`${styles.container} ${sortOption === "priceLowToHigh" ? styles.active : ""}`}
            onClick={() => sortProducts("priceLowToHigh")}
          >
            <input type="radio" name="sort" checked={sortOption === "priceLowToHigh"} readOnly />
            <svg viewBox="0 0 64 64" height="2em" width="2em">
              <path
                d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16"
                className={styles.path}
              ></path>
            </svg>
            <span>Price: Low to High</span>
          </label>
          </div>
        </div>

        <Container>
          {loading ? (
           
             <Loading/>
          
          ) : categories.length === 0 || productsList.length === 0 ? (
            <p>No products available.</p>
          ) : (
            categories.map((category) => (
              <div key={category.typeId} ref={(el) => (categoryRefs.current[category.typeId] = el)} className={styles.category_section}>
                <h2>{category.typeName}</h2>
                <div className={styles.products__body}>
                  {groupedProducts[category.typeId]?.length > 0 ? (
                    groupedProducts[category.typeId].slice(0, 10).map((product) => <Card key={product.itemCode} product={product} />)
                  ) : (
                    <p>No products available</p>
                  )}
                </div>
              </div>
            ))
          )}
        </Container>
      </section>
    </>
  );
};

export default Products;
