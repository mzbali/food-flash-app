import { useRef } from 'react';
import Input from '../../UI/Input';

import classes from './MealItemForm.module.css';

const MealItemForm = (props) => {
  const mealInputRef = useRef();
  const submitHandler = (event) => {
    event.preventDefault();
    props.onClick(mealInputRef.current.value);
  };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        label="Amount"
        meal={{
          id: `$Amount_${props.id}`,
          type: 'number',
          min: 1,
          max: 5,
          step: 1,
          defaultValue: 1,
        }}
        ref={mealInputRef}
      />
      <button type="submit">+Add</button>
    </form>
  );
};

export default MealItemForm;
