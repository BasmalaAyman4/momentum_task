import React, { useState } from 'react';
import styles from '../Styles/card.module.css';
import { Button } from 'react-bootstrap';
import noimg from '../assets/images/noimg.png';
import { useDispatch } from "react-redux";
import { cartActions } from "../Redux/slices/cartslice";
import { useNavigate } from 'react-router-dom';

const Card = ({ product }) => {
    const images = Array.isArray(product.twoImages) && product.twoImages.length > 0
        ? product.twoImages
        : [noimg, noimg]; 
    const dispatch = useDispatch();
    const addToCartHandler = () => {
        dispatch(
            cartActions.addItem({
                barCode: product.barCode,
                itemName: product.itemName,
                price: product.price,
                img: product.mainPic,
                quantity: 1,
            })
        );
    };
    const navigate = useNavigate();

    const goToDetails = () => {
        navigate(`/product-details/${product.itemCode}`);
    };
        return (
        <div key={product.itemCode} className={styles.card}>
            <div className={styles.imageWrapper} onClick={goToDetails}>
                <img
                    src={images[0]}
                    alt={product.itemName || 'Product image'}
                    className={`${styles.product__img} ${styles.defaultImg}`}
                />
                <img
                    src={images[1]}
                    alt={product.itemName || 'Product image'}
                    className={`${styles.product__img} ${styles.hoverImg}`}
                />
            </div>
          
            <h3>{product.itemName || 'No Name'}</h3>
            <p>{product.price ? `${product.price} EGP` : 'Price not available'}</p>
           
                <Button className={`${styles.card__btn}`} onClick={addToCartHandler}>Add To Cart</Button>

        </div>
    );
};

export default Card;
