import React from "react";
import styles from "../Styles/nav.module.css";
import { Link, NavLink } from "react-router-dom";
import Cart from "../Component/Cart";
const Nav = () => {
  return (
    <>
      <header className={`${styles.header}`}>
        <nav className={`${styles.nav}`}>
          <Link to="/" className={`${styles.nav__logo}`}>
            E-commerce Website
          </Link>
          <ul className={`${styles.nav__list}`}>
            <li className={`${styles.nav__item}`}>
              <NavLink to="/products" className={({ isActive }) =>
    `${styles.nav__link} ${isActive ? styles.active : ""}`
  }>
                Products List
              </NavLink>
            </li>
            <li className={`${styles.nav__item}`}>
            <Cart/>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Nav;
