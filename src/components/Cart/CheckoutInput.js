import classes from './Checkout.module.css';
import useInput from '../../hooks/use-input';
const checkValidity = (value) => value.trim() !== '';

const CheckoutInput = (props) => {
  const { value, isValid, hasError, changeHandler, blurHandler, reset } =
    useInput(checkValidity);

  const inputStyle = `${classes.control} ${hasError ? classes.invalid : ''}`;

  return (
    <div className={inputStyle}>
      <label htmlFor={props.id}>{props.label}</label>
      <input
        type={props.type}
        id={props.id}
        onChange={changeHandler}
        onBlur={blurHandler}
        value={value}
      />
    </div>
  );
};

export default CheckoutInput;
