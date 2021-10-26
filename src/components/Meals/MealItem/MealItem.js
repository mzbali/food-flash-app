import React, { useContext } from 'react';
import CartContext from '../../../store/cart-context';

import MealItemForm from './MealItemForm';

import classes from './MealItem.module.css';

const MealItem = (props) => {
  const cartCtx = useContext(CartContext);
  const addCartHandler = (amount) => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      price: props.price,
      amount: parseInt(amount),
    });
  };
  return (
    <li className={classes.meal} key={props.id}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{props.price}</div>
      </div>
      <MealItemForm id={props.id} onClick={addCartHandler} />
    </li>
  );
};

export default MealItem;
