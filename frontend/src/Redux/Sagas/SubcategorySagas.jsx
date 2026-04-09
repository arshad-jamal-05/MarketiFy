import { put, takeEvery } from "redux-saga/effects";
import {
  CREATE_SUBCATEGORY,
  CREATE_SUBCATEGORY_RED,
  GET_SUBCATEGORY,
  GET_SUBCATEGORY_RED,
  UPDATE_SUBCATEGORY,
  UPDATE_SUBCATEGORY_RED,
  DELETE_SUBCATEGORY,
  DELETE_SUBCATEGORY_RED,
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
  // let response = yield createRecord("subcategory", action.payload); // if data has no file field
  let response = yield createMultipartRecord("subcategory", action.payload); // if data has at least 1 file field
  yield put({ type: CREATE_SUBCATEGORY_RED, payload: response });
}

function* getSaga(action) {
  // worker saga
  let response = yield getRecord("subcategory", action.payload);
  yield put({ type: GET_SUBCATEGORY_RED, payload: response });
}

function* updateSaga(action) {
  // worker saga
  // yield updateRecord("subcategory", action.payload); // if data has no file field
  // yield updateMultipartRecord("subcategory", action.payload);  // if data has at least 1 file field
  // yield put({ type: UPDATE_SUBCATEGORY_RED, payload: action.payload });

  // in case of real backend
  // let response = yield updateRecord("subcategory", action.payload); // if data has no file field
  let response = yield updateMultipartRecord("subcategory", action.payload); // if data has at least 1 file field
  yield put({ type: UPDATE_SUBCATEGORY_RED, payload: response });
}

function* deleteSaga(action) {
  // worker saga
  let response = yield deleteRecord("subcategory", action.payload);
  yield put({ type: DELETE_SUBCATEGORY_RED, payload: action.payload });
}

export default function* SubcategorySagas() {
  yield takeEvery(CREATE_SUBCATEGORY, createSaga); // watcher saga
  yield takeEvery(GET_SUBCATEGORY, getSaga); // watcher saga
  yield takeEvery(UPDATE_SUBCATEGORY, updateSaga); // watcher saga
  yield takeEvery(DELETE_SUBCATEGORY, deleteSaga); // watcher saga
}
