import { useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import shoppingCart from "../assets/images/shopping-cart.png";
import styles from "../Styles/cart.module.css";
import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "../Redux/slices/cartslice";
import deleteico from "../assets/images/delete (1).png";
const Cart = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const dispatch = useDispatch();
  console.log(cartItems);
  return (
    <>
      <div onClick={handleShow} className={`${styles.cart__body}`}>
        <img alt="" src={shoppingCart} className={`${styles.icon}`} />
        <p className={`${styles.cart__total}`}>{totalQuantity}</p>
      </div>
      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="end"
        name="end"
        className={`${styles.Offcanvas}`}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Shopping Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <hr />
        <Offcanvas.Body>
          {cartItems.length === 0 ? (
            <>
              <div className={`${styles.cart__empty}`}>
                <p>Your cart is currently empty</p>
              </div>
            </>
          ) : (
            cartItems.map((item) => (
              <div key={item.barCode}>
                <div className={`${styles.cart__details}`}>
                  <div className={`${styles.details__body}`}>
                    <img
                      alt=""
                      src={item.img}
                      className={`${styles.cart__img}`}
                    />
                    <div>
                      <h4>{item.itemName}</h4>
                      <p>Price: ${item.price}</p>
                      <div className={`${styles.cart__qty}`}>
                        <button
                          onClick={() =>
                            dispatch(cartActions.reduceItem(item.barCode))
                          }
                        >
                          -
                        </button>
                        <p> {item.quantity}</p>
                        <button
                          onClick={() =>
                            dispatch(cartActions.plusItem(item.barCode))
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <img
                    src={deleteico}
                    onClick={() =>
                      dispatch(cartActions.deleteItem(item.barCode))
                    }
                    alt=""
                    className={`${styles.deleteico}`}
                  />
                </div>
              </div>
            ))
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Cart;
