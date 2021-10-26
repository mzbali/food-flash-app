import { useReducer } from 'react';

const initialValue = { value: '', isTouched: false };

const inputFormReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE':
      return { value: action.value, isTouched: state.isTouched };
    case 'BLUR':
      return { value: state.value, isTouched: true };
    case 'reset':
      return { value: '', isTouched: false };
    default:
      return initialValue;
  }
};

const useInput = (valueValidator) => {
  const [inputForm, dispatchInputForm] = useReducer(
    inputFormReducer,
    initialValue
  );

  const isValid = valueValidator(inputForm.value);
  const hasError = inputForm.isTouched && !isValid;

  const changeHandler = (event) => {
    dispatchInputForm({ type: 'CHANGE', value: event.target.value });
  };
  const blurHandler = (event) => {
    dispatchInputForm({ type: 'BLUR' });
  };
  const reset = () => {
    dispatchInputForm({ type: 'RESET' });
  };

  return {
    value: inputForm.value,
    isValid,
    hasError,
    changeHandler,
    blurHandler,
    reset,
  };
};

export default useInput;
