import { put, takeEvery } from "redux-saga/effects";
import {
  CREATE_BRAND,
  CREATE_BRAND_RED,
  GET_BRAND,
  GET_BRAND_RED,
  UPDATE_BRAND,
  UPDATE_BRAND_RED,
  DELETE_BRAND,
  DELETE_BRAND_RED,
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
  // let response = yield createRecord("brand", action.payload); // if data has no file field
  let response = yield createMultipartRecord("brand", action.payload); // if data has at least 1 file field
  yield put({ type: CREATE_BRAND_RED, payload: response });
}

function* getSaga(action) {
  // worker saga
  let response = yield getRecord("brand", action.payload);
  yield put({ type: GET_BRAND_RED, payload: response });
}

function* updateSaga(action) {
  // worker saga
  // yield updateRecord("brand", action.payload); // if data has no file field
  // yield updateMultipartRecord("brand", action.payload);  // if data has at least 1 file field
  // yield put({ type: UPDATE_BRAND_RED, payload: action.payload });

  // in case of real backend
  // let response = yield updateRecord("brand", action.payload); // if data has no file field
  let response = yield updateMultipartRecord("brand", action.payload);  // if data has at least 1 file field
  yield put({ type:UPDATE_BRAND_RED, payload: response });
}

function* deleteSaga(action) {
  // worker saga
  let response = yield deleteRecord("brand", action.payload);
  yield put({ type: DELETE_BRAND_RED, payload: action.payload });
}

export default function* BrandSagas() {
  yield takeEvery(CREATE_BRAND, createSaga); // watcher saga
  yield takeEvery(GET_BRAND, getSaga); // watcher saga
  yield takeEvery(UPDATE_BRAND, updateSaga); // watcher saga
  yield takeEvery(DELETE_BRAND, deleteSaga); // watcher saga
}
