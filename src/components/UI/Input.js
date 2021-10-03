import React from 'react';

import classes from './Input.module.css';

const Input = React.forwardRef((props, ref) => {
  return (
    <div className={classes.input}>
      <label htmlFor={props.meal.id}>{props.label}</label>
      <input {...props.meal} ref={ref} />
    </div>
  );
});

export default Input;
