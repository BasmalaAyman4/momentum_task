import { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import shoppingCart from '../assets/images/shopping-cart.png'
import styles from '../Styles/cart.module.css'
import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "../Redux/slices/cartslice";
const Cart = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const cartItems = useSelector((state) => state.cart.cartItems);
    const totalQuantity = useSelector((state) => state.cart.totalQuantity);
    const totalAmount = useSelector((state) => state.cart.totalAmount);
    const dispatch = useDispatch();
  return (
    <>
          <div  onClick={handleShow} className={`${styles.cart__body}`}>
             <img alt='' src={shoppingCart} className={`${styles.icon}`}/>
              <p className={`${styles.cart__total}`}>{totalQuantity}</p>
          </div>
          <Offcanvas show={show} onHide={handleClose} placement='end' name='end' className={`${styles.Offcanvas}`}> 
              <Offcanvas.Header closeButton>
                  <Offcanvas.Title>Shopping Cart</Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                  {cartItems.length === 0 ? <p>No items in cart</p> : (
                      cartItems.map((item) => (
                          <div key={item.barCode}>
                              <h4>{item.itemName}</h4>
                              <p>Price: ${item.price}</p>
                              <p>Quantity: {item.quantity}</p>
                              <button onClick={() => dispatch(cartActions.reduceItem(item.barCode))}>-</button>
                              <button onClick={() => dispatch(cartActions.plusItem(item.barCode))}>+</button>
                              <button onClick={() => dispatch(cartActions.deleteItem(item.barCode))}>Remove</button>
                          </div>
                      ))
                  )}
                  <h3>Total: ${totalAmount}</h3>
              </Offcanvas.Body>
          </Offcanvas>
    </>
  )
}

export default Cart
