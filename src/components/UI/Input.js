import React from 'react';

import classes from './Input.module.css';

const Input = (props) => {
  return (
    <div className={classes.input}>
      <label htmlFor="input">{props.label}</label>
      <input type={props.type} min="0" max="5" />
    </div>
  );
};

export default Input;
