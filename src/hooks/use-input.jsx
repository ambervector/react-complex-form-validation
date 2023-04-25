import { useReducer } from "react";

const initialInputState = {
  value: "",
  isTouched: false,
};

const inputReducerFn = (state, action) => {
  if (action.type === "INPUT") {
    return { value: action.value, isTouched: state.isTouched };
  }
  if (action.type === "BLUR") {
    return { value: state.value, isTouched: true };
  }
  if (action.type === "RESET") {
    return { value: "", isTouched: false };
  }
  return initialInputState;
};

const useInput = (validate) => {
  const [inputState, dispatch] = useReducer(inputReducerFn, initialInputState);

  const valueIsInvalid = validate(inputState.value); //   => value.includes(`@`) = false
  const hasError = valueIsInvalid && inputState.isTouched;

  const valueChangeHandler = (e) => {
    dispatch({ type: "INPUT", value: e.target.value });
  };

  const valueBlurHandler = (e) => {
    dispatch({ type: "BLUR" });
  };

  const reset = () => {
    dispatch({ type: "RESET" });
  };

  return {
    value: inputState.value,
    isInvalid: valueIsInvalid,
    hasError,
    valueChangeHandler,
    valueBlurHandler,
    reset,
  };
};

export default useInput;
