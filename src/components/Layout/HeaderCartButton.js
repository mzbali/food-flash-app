import React, { useContext, useEffect, useState } from 'react';
import CartContext from '../../store/cart-context';
import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCartButton.module.css';

const HeaderCartButton = (props) => {
  const cartCtx = useContext(CartContext);
  const amountOfMeal = cartCtx.items.reduce(
    (totalAmount, item) => totalAmount + item.amount,
    0
  );
  const [btnAnimate, setBtnAnimate] = useState(false);
  const btnClass = `${classes.button} ${btnAnimate ? classes.bump : ''}`;

  useEffect(() => {
    setBtnAnimate(true);
    const timer = setTimeout(() => {
      setBtnAnimate(false);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [cartCtx.items]);

  return (
    <button className={btnClass} onClick={props.onCartClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      Your Cart<span className={classes.badge}>{amountOfMeal}</span>
    </button>
  );
};

export default HeaderCartButton;
