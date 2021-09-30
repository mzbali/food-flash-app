import React from 'react';
import classes from './Cart.module.css';
import Modal from '../UI/Modal';
import CartItem from './CartItem';

const Cart = (props) => {
  const cartItem = [
    { id: 'm1', name: 'shushi', amount: '4', price: '23.4' },
  ].map((item) => (
    <CartItem
      key={item.id}
      name={item.name}
      amount={item.amount}
      price={item.price}
    />
  ));
  return (
    <Modal onClick={props.onCartClose}>
      <ul className={classes['cart-items']}>{cartItem}</ul>
      <div className={classes.total}>
        <p>Total Price</p>
        <p>23.65</p>
      </div>
      <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onCartClose}>
          Close
        </button>
        <button className={classes.button}>Order</button>
      </div>
    </Modal>
  );
};

export default Cart;
