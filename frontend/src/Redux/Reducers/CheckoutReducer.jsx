import {
  CREATE_CHECKOUT_RED,
  GET_CHECKOUT_RED,
  UPDATE_CHECKOUT_RED,
  DELETE_CHECKOUT_RED,
} from "../Constant";

export default function CheckoutReducer(state = [], action) {
  let index;
  switch (action.type) {
    case CREATE_CHECKOUT_RED:
      return [ action.payload, ...state];

    case GET_CHECKOUT_RED:
      return action.payload;

    case UPDATE_CHECKOUT_RED:
      index = state.findIndex((x) => x._id === action.payload._id);
      state[index] = { ...action.payload };
      return state;

    case DELETE_CHECKOUT_RED:
      return state.filter((x) => x._id !== action.payload);

    default:
      return state;
  }
}
