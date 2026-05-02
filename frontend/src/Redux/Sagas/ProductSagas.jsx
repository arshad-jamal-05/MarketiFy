import { put, takeEvery } from "redux-saga/effects";
import {
  CREATE_PRODUCT,
  CREATE_PRODUCT_RED,
  GET_PRODUCT,
  GET_PRODUCT_RED,
  UPDATE_PRODUCT,
  UPDATE_PRODUCT_RED,
  DELETE_PRODUCT,
  DELETE_PRODUCT_RED,
} from "../Constant";
import {
  createRecord,
  createMultipartRecord,
  getRecord,
  updateMultipartRecord,
  updateRecord,
  deleteRecord,
} from "./Services/index";
import { act } from "react";

function* createSaga(action) {
  // worker saga
  let response = yield createMultipartRecord("product", action.payload);
  yield put({ type: CREATE_PRODUCT_RED, payload: response });
}

function* getSaga(action) {
  // worker saga
  let response = yield getRecord("product", action.payload);
  yield put({ type: GET_PRODUCT_RED, payload: response });
}

function* updateSaga(action) {
  // worker saga
  if(action.payload?.option){
    let response = yield updateMultipartRecord("product", action.payload);
    yield put({ type: UPDATE_PRODUCT_RED, payload: action.payload });
  } else {
    let response = yield updateMultipartRecord("product", action.payload);
    yield put({ type: UPDATE_PRODUCT_RED, payload: response });
  }
}

function* deleteSaga(action) {
  // worker saga
  let response = yield deleteRecord("product", action.payload);
  yield put({ type: DELETE_PRODUCT_RED, payload: action.payload });
}

export default function* ProductSagas() {
  yield takeEvery(CREATE_PRODUCT, createSaga); // watcher saga
  yield takeEvery(GET_PRODUCT, getSaga); // watcher saga
  yield takeEvery(UPDATE_PRODUCT, updateSaga); // watcher saga
  yield takeEvery(DELETE_PRODUCT, deleteSaga); // watcher saga
}
