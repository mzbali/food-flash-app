import classes from './Checkout.module.css';
import useInput from '../../hooks/use-input';

const checkValidity = (value) => value.trim() !== '';

const Checkout = (props) => {
  const {
    value: enteredName,
    isValid: nameIsValid,
    hasError: nameHasError,
    changeHandler: nameChangehandler,
    blurHandler: nameBlurHandler,
    reset: nameInputReset,
  } = useInput(checkValidity);

  const {
    value: enteredStreet,
    isValid: streetIsValid,
    hasError: streetHasError,
    changeHandler: streetChangehandler,
    blurHandler: streetBlurHandler,
    reset: streetInputReset,
  } = useInput(checkValidity);

  const {
    value: enteredPostal,
    isValid: postalIsValid,
    hasError: postalHasError,
    changeHandler: postalChangehandler,
    blurHandler: postalBlurHandler,
    reset: postalInputReset,
  } = useInput(checkValidity);

  const {
    value: enteredCity,
    isValid: cityIsValid,
    hasError: cityHasError,
    changeHandler: cityChangehandler,
    blurHandler: cityBlurHandler,
    reset: cityInputReset,
  } = useInput(checkValidity);

  const formIsValid =
    nameIsValid && streetIsValid && postalIsValid && cityIsValid;
  const confirmHandler = (event) => {
    event.preventDefault();
    if (!formIsValid) {
      return;
    }
    const userData = {
      name: enteredName,
      street: enteredStreet,
      postal: enteredPostal,
      city: enteredCity,
    };
    props.onConfirm(userData);
    nameInputReset();
    streetInputReset();
    postalInputReset();
    cityInputReset();
  };

  const nameInputStyle = `${classes.control} ${
    nameHasError ? classes.invalid : ''
  }`;

  const streetInputStyle = `${classes.control} ${
    streetHasError ? classes.invalid : ''
  }`;

  const postalInputStyle = `${classes.control} ${
    postalHasError ? classes.invalid : ''
  }`;

  const cityInputStyle = `${classes.control} ${
    cityHasError ? classes.invalid : ''
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameInputStyle}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={nameChangehandler}
          onBlur={nameBlurHandler}
          value={enteredName}
        />
      </div>
      <div className={streetInputStyle}>
        <label htmlFor="street">Street</label>
        <input
          type="text"
          id="street"
          onChange={streetChangehandler}
          onBlur={streetBlurHandler}
          value={enteredStreet}
        />
      </div>
      <div className={postalInputStyle}>
        <label htmlFor="postal">Postal Code</label>
        <input
          type="text"
          id="postal"
          onChange={postalChangehandler}
          onBlur={postalBlurHandler}
          value={enteredPostal}
        />
      </div>
      <div className={cityInputStyle}>
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          onChange={cityChangehandler}
          onBlur={cityBlurHandler}
          value={enteredCity}
        />
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
