import React, { useContext, useState } from 'react';
import CartContext from '../../store/cart-context';
import classes from './Cart.module.css';
import Modal from '../UI/Modal';
import CartItem from './CartItem';
import Checkout from './Checkout';
import useHttp from '../../hooks/use-http';

const Cart = (props) => {
  const { isLoading, error, sendRequest } = useHttp();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const cartCtx = useContext(CartContext);
  const [showCheckout, setShowCheckout] = useState(false);

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

  const orderHandler = () => {
    setShowCheckout(true);
  };

  const confirmHandler = (userData) => {
    sendRequest(
      {
        url: 'https://react-http-d90c3-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: { user: userData, orderItems: cartCtx.items },
      },
      (data) => {
        console.log(data);
      }
    );
    setIsSubmitted(true);
    cartCtx.clearCart();
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

  const actionBtn = (
    <div className={classes.actions}>
      <button className={classes['button--alt']} onClick={props.onCartClose}>
        Close
      </button>
      {showOrder && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );
  let modalContent = (
    <React.Fragment>
      <ul className={classes['cart-items']}>{cartItem}</ul>
      <div className={classes.total}>
        <p>Total Price</p>
        <p>{`$${cartCtx.totalPrice.toFixed(2)}`}</p>
      </div>
      {!showCheckout && actionBtn}
      {showCheckout && (
        <Checkout onCancel={props.onCartClose} onConfirm={confirmHandler} />
      )}
    </React.Fragment>
  );
  if (isLoading) {
    modalContent = <p>Food Order is Sending...</p>;
  } else if (isSubmitted) {
    modalContent = (
      <React.Fragment>
        <p>Food has been successfully ordered</p>
        <div className={classes.actions}>
          <button className={classes.button} onClick={props.onCartClose}>
            Close
          </button>
        </div>
      </React.Fragment>
    );
  } else if (error) {
    modalContent = <p>Something went Wrong :(</p>;
  }

  return <Modal onClick={props.onCartClose}>{modalContent}</Modal>;
};

export default Cart;
