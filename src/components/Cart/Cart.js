import React, { useContext } from 'react';
import CartContext from '../store/cart-context';
import classes from './Cart.module.css';
import Modal from '../UI/Modal';
import CartItem from './CartItem';

const Cart = (props) => {
  const cartCtx = useContext(CartContext);

  let showOrder = false;
  if (cartCtx.items.length > 0) {
    showOrder = true;
  }

  const addItemHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };
  const removeItemHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItem = cartCtx.items.map((item) => (
    <CartItem
      key={item.id}
      name={item.name}
      amount={item.amount}
      price={item.price}
      onAdd={addItemHandler.bind(null, item)}
      onRemove={removeItemHandler.bind(null, item.id)}
    />
  ));
  return (
    <Modal onClick={props.onCartClose}>
      <ul className={classes['cart-items']}>{cartItem}</ul>
      <div className={classes.total}>
        <p>Total Price</p>
        <p>{`$${cartCtx.totalPrice.toFixed(2)}`}</p>
      </div>
      <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onCartClose}>
          Close
        </button>
        {showOrder && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
