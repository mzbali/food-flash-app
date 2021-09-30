import React from 'react';
import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCartButton.module.css';

const HeaderCartButton = (props) => {
  return (
    <button
      className={`${classes.button} ${classes.bump}`}
      onClick={props.onCartClick}
    >
      <span className={classes.icon}>
        <CartIcon />
      </span>
      Your Cart<span className={classes.badge}>3</span>
    </button>
  );
};

export default HeaderCartButton;
