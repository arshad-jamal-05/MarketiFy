import { put, takeEvery } from "redux-saga/effects";
import {
  CREATE_NEWSLETTER,
  CREATE_NEWSLETTER_RED,
  GET_NEWSLETTER,
  GET_NEWSLETTER_RED,
  UPDATE_NEWSLETTER,
  UPDATE_NEWSLETTER_RED,
  DELETE_NEWSLETTER,
  DELETE_NEWSLETTER_RED,
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
  let response = yield createRecord("newsletter", action.payload); // if data has no file field
  // let response = yield createMultipartRecord("newsletter", action.payload); // if data has at least 1 file field
  yield put({ type: CREATE_NEWSLETTER_RED, payload: response });
}

function* getSaga(action) {
  // worker saga
  let response = yield getRecord("newsletter", action.payload);
  yield put({ type: GET_NEWSLETTER_RED, payload: response });
}

function* updateSaga(action) {
  // worker saga
  yield updateRecord("newsletter", action.payload); // if data has no file field
  // yield updateMultipartRecord("newsletter", action.payload);  // if data has at least 1 file field
  yield put({ type: UPDATE_NEWSLETTER_RED, payload: action.payload });

  // in case of real backend
  // let response = yield updateRecord("newsletter", action.payload); // if data has no file field
  // let response = yield updateMultipartRecord("newsletter", action.payload);  // if data has at least 1 file field
  // yield put({ type: UPDATE_NEWSLETTER_RED, payload: response });
}

function* deleteSaga(action) {
  // worker saga
  let response = yield deleteRecord("newsletter", action.payload);
  yield put({ type: DELETE_NEWSLETTER_RED, payload: action.payload });
}

export default function* NewsletterSagas() {
  yield takeEvery(CREATE_NEWSLETTER, createSaga); // watcher saga
  yield takeEvery(GET_NEWSLETTER, getSaga); // watcher saga
  yield takeEvery(UPDATE_NEWSLETTER, updateSaga); // watcher saga
  yield takeEvery(DELETE_NEWSLETTER, deleteSaga); // watcher saga
}
