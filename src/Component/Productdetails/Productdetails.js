import React, { useEffect, useRef, useState } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";
import Environment from "../../Environment";
import styles from '../../Styles/productdetails.module.css'
import noImg from '../../assets/images/noimg.png'
import { Col, Row } from "react-bootstrap";
import minus from '../../assets/images/minus.png'
import plus from '../../assets/images/plus.png'
import { useDispatch } from "react-redux";
import { cartActions } from "../../Redux/slices/cartslice";
import Loading from '../../Global/Loading'
const Productdetails = () => {
    const { id } = useParams(); 
     const [loading, setLoading] = useState(true); 
     const [prod, setDetails] = useState({});
     const [number, setNumber] = useState(1);
     const thumbnailRef = useRef(null);
     const [slideIndex, setSlideIndex] = useState(0);
const [colorImage,setColorImage]=useState([])   
const dispatch = useDispatch();

useEffect(() => {
    setLoading(true); 
   
      axios.get(`${Environment.baseURL}/api/HomeV2/getItemById?ItemId=${id}`, {
        headers: { "Content-Type": "application/json", langCode: 2 },
      })
   
      .then((response) => {
        if (response.status === 200)
           {
          
            setDetails(response.data.data);
            setColorImage(response.data.data.reacentlyAddedDetails)
        }
       
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [id]);
     const increaseNumber = () => {
       setNumber(number + 1);
     };
   
     const decreaseNumber = () => {
       if (number > 1) {
         setNumber(number - 1);
       }
     };
    
    
      const currentSlide = (n) => {
        setSlideIndex(n);
        const thumbnail = thumbnailRef.current;
        if (thumbnail) {
          const selectedThumbnail = thumbnail.children[n];
          if (selectedThumbnail) {
            selectedThumbnail.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }
      };
      const uniqueColors = {};
    
      if (Array.isArray(colorImage)) {
        for (const item of colorImage) {
          const colorKey = `${item.itemColor}-${item.colorHex}`;
          if (!uniqueColors[colorKey]) {
            uniqueColors[colorKey] = {
              itemColor: item.itemColor,
              colorName: item.colorName,
              colorHex: item.colorHex,
              sizes: [],
              productPic: item.productPic,
              productVedio: item.productVedio,
            };
          }
          uniqueColors[colorKey].sizes.push({
            size: item.sizeName,
            itemSize: item.itemSize,
            qty: item.quantity,
          });
        }
    
        for (const key in uniqueColors) {
          if (uniqueColors.hasOwnProperty(key)) {
            uniqueColors[key].sizes.sort((a, b) => a.itemSize - b.itemSize);
          }
        }
      }
      const result = Object.values(uniqueColors);
      const [selectColor, setSelectColor] = useState({});
      const [firstSize, setFirstSize] = useState({});
      const handleSizeSelection = (size) => {
        setFirstSize(size);
      };
      useEffect(() => {
        setSelectColor(result[0]);
        setFirstSize(result[0]?.sizes[0]);
      }, [prod]);
    
      const handleColorSelection = (color) => {
        setSelectColor(color);
        setFirstSize(color?.sizes[0]);
        setSlideIndex(0)
      };

      const handleWheel = (event) => {
        if (thumbnailRef.current && thumbnailRef.current.contains(event.target)) {
          event.preventDefault();
          thumbnailRef.current.scrollBy({
            top: event.deltaY,
            behavior: 'smooth',
          });
        }
      };
    
      React.useEffect(() => {
        const thumbnailContainer = thumbnailRef.current;
        if (thumbnailContainer) {
          thumbnailContainer.addEventListener('wheel', handleWheel);
        }
    
        return () => {
          if (thumbnailContainer) {
            thumbnailContainer.removeEventListener('wheel', handleWheel);
          }
        };
      }, []);
      const addToCartHandler = () => {
          dispatch(
              cartActions.addItem({
                  barCode: prod.barCode,
                  itemName: prod.itemName,
                  price: prod.price,
                  img: prod.mainPic,
                  quantity: number,
              })
          );
      };
  if (loading)
    return(<Loading/>)
  return (
    <>
  <section className={`${styles.section} `}>
        
          <Row  >
            <Col xl={6}>
              {selectColor?.productPic?.length!=0 ? (
               <div className={`${styles.select__images}`}>
                <div className={`${styles.mySwiper2}`}>
                  {selectColor?.productPic?.map((src, index) => (
                    <div className={`${styles.mySlides} ${index === slideIndex ? styles.active : ''}`} key={index}>
                      <img src={src} style={{ width: '100%' }} alt={`Slide ${index + 1}`} />
                    </div>
                  ))}
              
                </div>
                <div className={`${styles.mySwiper}`} ref={thumbnailRef}>
                  {selectColor?.productPic?.map((src, index) => (
                    <div className={`${styles.column}`} key={index}>
                      <img
                        className={` ${styles.demo}${index === slideIndex ? styles.active : ''}`}
                        src={src}
                        style={{ width: '100%' }}
                        onClick={() => currentSlide(index)}
                        alt={`Thumbnail ${index + 1}`}
                      />
                    </div>
                  ))}
                </div>
                
                </div> 
              ) : (
                <img alt='' src={noImg}/>
              )}

            </Col>
            <Col xl={6} className={`${styles.row__details}`}>
              <h2>{prod?.itemName}</h2>
              <div className={`${styles.isTruncated__body}`}>
                <p>{prod?.itemDesc} - {prod.itemName}</p>
                
              </div>
              <div className={`${styles.price__body}`}>
                {prod?.dealPrice == 0 ? (
                  <p> EGP {prod?.price}</p>
                ) : (
                  <div className={`${styles.update__price}`}>
                    <p>EGP {prod?.dealPrice}</p>
                    <del className={`${styles.price__del}`}>
                      EGP {prod?.price}
                    </del>
                  </div>
                )}
              </div>
              <p className={`${styles.choose__color__para}`}>choose color</p>
              <div className={`${styles.choose__color}`}>
                {result.map((color) => (
                  <div
                    key={color?.itemColor}
                    style={{
                      backgroundColor: `#${color?.colorHex}`,
                      cursor: "pointer",
                      width: "30px",
                      height: "30px",
                    }}
                    className={
                      selectColor?.itemColor == color.itemColor
                        ? `${styles.selectcolorhex} boxshadow mb-2`
                        : `mb-2 boxshadow`
                    }
                    onClick={() => handleColorSelection(color)}
                  ></div>
                ))}
              </div>
              <p className={`${styles.choose__color__para}`}>Size Available</p>
              <div className={`${styles.size__body}`}>
                {selectColor?.sizes?.map((siz) => (
                  <p
                    key={siz.itemSize}
                    className={
                      firstSize?.size == siz?.size
                        ? `${styles.selectsize}`
                        : `${styles.size}`
                    }
                    onClick={() => handleSizeSelection(siz)}
                  >
                    {siz.size}
                  </p>
                ))}
              </div>
              <hr className={`${styles.hr}`}/>
              <div className={`${styles.qty__body}`}>
              <p className={`${styles.choose__color__para}`}> Quantity : <span>{number}</span></p>
              <div className={`${styles.number__body}`}>
                  <button onClick={increaseNumber}>
                  <img alt='' src={plus}/>
                  </button>
                  <button onClick={decreaseNumber}>
                  <img alt='' src={minus}/>
                  </button>
                </div>
              </div>
              <hr className={`${styles.hr}`}/>
              <div className={`${styles.watch__btn}`}>
              
                 
                                      <button onClick={addToCartHandler} className={`${styles.filter__btn}`} type="button" >Add To Cart </button>

              
                
              </div>
            </Col>
          </Row>
        

      </section>
    </>
  )
}

export default Productdetails