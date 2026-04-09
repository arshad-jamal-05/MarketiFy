import { CREATE_FAQ, DELETE_FAQ, GET_FAQ, UPDATE_FAQ } from "../Constant";

export function createFAQ(data) {
  return {
    type: CREATE_FAQ,
    payload: data,
  };
}

export function getFAQ() {
  return {
    type: GET_FAQ,
  };
}

export function updateFAQ(data) {
  return {
    type: UPDATE_FAQ,
    payload: data,
  };
}

export function deleteFAQ(data) {
  return {
    type: DELETE_FAQ,
    payload: data,
  };
}
