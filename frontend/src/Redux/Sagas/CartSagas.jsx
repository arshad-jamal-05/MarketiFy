import { put, takeEvery } from "redux-saga/effects";
import {
  CREATE_CART,
  CREATE_CART_RED,
  GET_CART,
  GET_CART_RED,
  UPDATE_CART,
  UPDATE_CART_RED,
  DELETE_CART,
  DELETE_CART_RED,
} from "../Constant";
import {
  createRecord,
  createMultipartRecord,
  getRecord,
  updateMultipartRecord,
  updateRecord,
  deleteRecord,
} from "./Services/index";

function* createSaga(action) {
  // worker saga
  let response = yield createRecord("cart", action.payload);
  yield put({ type: CREATE_CART_RED, payload: response });
}

function* getSaga(action) {
  // worker saga
  let response = yield getRecord("cart", action.payload);
  yield put({ type: GET_CART_RED, payload: response });
}

function* updateSaga(action) {
  // worker saga
  yield updateRecord("cart", action.payload);
  yield put({ type: UPDATE_CART_RED, payload: action.payload });
}

function* deleteSaga(action) {
  // worker saga
  let response = yield deleteRecord("cart", action.payload);
  yield put({ type: DELETE_CART_RED, payload: action.payload });
}

export default function* CartSagas() {
  yield takeEvery(CREATE_CART, createSaga); // watcher saga
  yield takeEvery(GET_CART, getSaga); // watcher saga
  yield takeEvery(UPDATE_CART, updateSaga); // watcher saga
  yield takeEvery(DELETE_CART, deleteSaga); // watcher saga
}
