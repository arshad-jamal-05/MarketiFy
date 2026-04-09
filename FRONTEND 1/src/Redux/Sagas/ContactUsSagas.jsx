import { put, takeEvery } from "redux-saga/effects";
import {
  CREATE_CONTACT_US,
  CREATE_CONTACT_US_RED,
  GET_CONTACT_US,
  GET_CONTACT_US_RED,
  UPDATE_CONTACT_US,
  UPDATE_CONTACT_US_RED,
  DELETE_CONTACT_US,
  DELETE_CONTACT_US_RED,
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
  let response = yield createRecord("contactus", action.payload); // if data has no file field
  // let response = yield createMultipartRecord("contactus", action.payload); // if data has at least 1 file field
  yield put({ type: CREATE_CONTACT_US_RED, payload: response });
}

function* getSaga(action) {
  // worker saga
  let response = yield getRecord("contactus", action.payload);
  yield put({ type: GET_CONTACT_US_RED, payload: response });
}

function* updateSaga(action) {
  // worker saga
  yield updateRecord("contactus", action.payload); // if data has no file field
  // yield updateMultipartRecord("contactus", action.payload);  // if data has at least 1 file field
  yield put({ type: UPDATE_CONTACT_US_RED, payload: action.payload });

  // in case of real backend
  // let response = yield updateRecord("contactus", action.payload); // if data has no file field
  // let response = yield updateMultipartRecord("contactus", action.payload);  // if data has at least 1 file field
  // yield put({ UPDATE_CONTACT_US_RED, payload: response });
}

function* deleteSaga(action) {
  // worker saga
  let response = yield deleteRecord("contactus", action.payload);
  yield put({ type: DELETE_CONTACT_US_RED, payload: action.payload });
}

export default function* ContactUsSagas() {
  yield takeEvery(CREATE_CONTACT_US, createSaga); // watcher saga
  yield takeEvery(GET_CONTACT_US, getSaga); // watcher saga
  yield takeEvery(UPDATE_CONTACT_US, updateSaga); // watcher saga
  yield takeEvery(DELETE_CONTACT_US, deleteSaga); // watcher saga
}
