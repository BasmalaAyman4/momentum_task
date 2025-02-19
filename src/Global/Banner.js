import React from "react";
import Carousel from "react-bootstrap/Carousel";
import { Col, Row } from "react-bootstrap";
import img1 from "../assets/images/slide1.webp";
import img2 from "../assets/images/slide2.webp";
import img4 from "../assets/images/slide4jpg.jpg";
import img11 from "../assets/images/img1-1.webp";
import img12 from "../assets/images/img1-2.webp";
import img21 from "../assets/images/img2-1.jpg";
import img22 from "../assets/images/img2-2.jpg";
import img41 from "../assets/images/img4-1.webp";
import img42 from "../assets/images/img4-2.webp";
import styles from "../Styles/banners.module.css";
const slides = [
  {
    mainImage: img1,
    title: "Better interiors",
    description:
      "The perfect place for every contemporary furniture store and manufacture. This is Furnival.",
    sideImages: [img11, img12],
  },
  {
    mainImage: img2,
    title: "Better interiors",
    description:
      "The perfect place for every contemporary furniture store and manufacture. This is Furnival.",
    sideImages: [img21, img22],
  },
  {
    mainImage: img4,
    title: "Better interiors",
    description:
      "The perfect place for every contemporary furniture store and manufacture. This is Furnival.",
    sideImages: [img41, img42],
  },
];

const Banner = () => {
  return (
    <Carousel>
      {slides.map((slide, index) => (
        <Carousel.Item key={index} className={styles.carousel__item}>
          <img src={slide.mainImage} className={styles.carousel__img} alt="" />
          <Row className={styles.carousel__body}>
            <Col>
              <h2 className={styles.carousel__title}>{slide.title}</h2>
              <p className={styles.carousel__para}>{slide.description}</p>
            </Col>
            <Col className={styles.images__slide}>
              {slide.sideImages.map((img, imgIndex) => (
                <img
                  key={imgIndex}
                  src={img}
                  className={`${styles.slider__img} ${imgIndex === 0 ? styles.first : styles.second}`}
                  alt=""
                />
              ))}
            </Col>
          </Row>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default Banner;
