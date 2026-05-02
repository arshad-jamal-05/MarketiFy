import { put, takeEvery } from "redux-saga/effects";
import {
  CREATE_FAQ,
  CREATE_FAQ_RED,
  GET_FAQ,
  GET_FAQ_RED,
  UPDATE_FAQ,
  UPDATE_FAQ_RED,
  DELETE_FAQ,
  DELETE_FAQ_RED,
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
  let response = yield createRecord("faq", action.payload);
  yield put({ type: CREATE_FAQ_RED, payload: response });
}

function* getSaga(action) {
  // worker saga
  let response = yield getRecord("faq", action.payload);
  yield put({ type: GET_FAQ_RED, payload: response });
}

function* updateSaga(action) {
  // worker saga
  yield updateRecord("faq", action.payload);
  yield put({ type: UPDATE_FAQ_RED, payload: action.payload });
}

function* deleteSaga(action) {
  // worker saga
  let response = yield deleteRecord("faq", action.payload);
  yield put({ type: DELETE_FAQ_RED, payload: action.payload });
}

export default function* FAQSagas() {
  yield takeEvery(CREATE_FAQ, createSaga); // watcher saga
  yield takeEvery(GET_FAQ, getSaga); // watcher saga
  yield takeEvery(UPDATE_FAQ, updateSaga); // watcher saga
  yield takeEvery(DELETE_FAQ, deleteSaga); // watcher saga
}
