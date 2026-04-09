import {
  CREATE_FEATURES_RED,
  GET_FEATURES_RED,
  UPDATE_FEATURES_RED,
  DELETE_FEATURES_RED,
} from "../Constant";

export default function FeaturesReducer(state = [], action) {
  let index;
  switch (action.type) {
    case CREATE_FEATURES_RED:
      return [...state, action.payload];

    case GET_FEATURES_RED:
      return action.payload;

    case UPDATE_FEATURES_RED:
      index = state.findIndex((x) => x._id === action.payload._id);
      state[index] = { ...action.payload };
      return state;

    case DELETE_FEATURES_RED:
      return state.filter((x) => x._id !== action.payload);

    default:
      return state;
  }
}
