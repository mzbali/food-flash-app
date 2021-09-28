import React from 'react';
import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCartButton.module.css';

const HeaderCartButton = () => {
  return (
    <button className={`${classes.button} ${classes.bump}`}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      Cart<span className={classes.badge}>3</span>
    </button>
  );
};

export default HeaderCartButton;
