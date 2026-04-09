import { put, takeEvery } from "redux-saga/effects";
import {
  CREATE_USER,
  CREATE_USER_RED,
  GET_USER,
  GET_USER_RED,
  UPDATE_USER,
  UPDATE_USER_RED,
  DELETE_USER,
  DELETE_USER_RED,
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
  let response = yield createRecord("user", action.payload); // if data has no file field
  // let response = yield createMultipartRecord("user", action.payload); // if data has at least 1 file field
  yield put({ type: CREATE_USER_RED, payload: response });
}

function* getSaga(action) {
  // worker saga
  let response = yield getRecord("user", action.payload);
  yield put({ type: GET_USER_RED, payload: response });
}

function* updateSaga(action) {
  // worker saga
  yield updateRecord("user", action.payload); // if data has no file field
  // yield updateMultipartRecord("user", action.payload);  // if data has at least 1 file field
  yield put({ type: UPDATE_USER_RED, payload: action.payload });

  // in case of real backend
  // let response = yield updateRecord("user", action.payload); // if data has no file field
  // let response = yield updateMultipartRecord("user", action.payload);  // if data has at least 1 file field
  // yield put({ UPDATE_USER_RED, payload: response });
}

function* deleteSaga(action) {
  // worker saga
  let response = yield deleteRecord("user", action.payload);
  yield put({ type: DELETE_USER_RED, payload: action.payload });
}

export default function* UserSagas() {
  yield takeEvery(CREATE_USER, createSaga); // watcher saga
  yield takeEvery(GET_USER, getSaga); // watcher saga
  yield takeEvery(UPDATE_USER, updateSaga); // watcher saga
  yield takeEvery(DELETE_USER, deleteSaga); // watcher saga
}
