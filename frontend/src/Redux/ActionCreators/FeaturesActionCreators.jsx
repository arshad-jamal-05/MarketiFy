import {
  CREATE_FEATURES,
  DELETE_FEATURES,
  GET_FEATURES,
  UPDATE_FEATURES,
} from "../Constant";

export function createFeatures(data) {
  return {
    type: CREATE_FEATURES,
    payload: data,
  };
}

export function getFeatures() {
  return {
    type: GET_FEATURES,
  };
}

export function updateFeatures(data) {
  return {
    type: UPDATE_FEATURES,
    payload: data,
  };
}

export function deleteFeatures(data) {
  return {
    type: DELETE_FEATURES,
    payload: data,
  };
}
