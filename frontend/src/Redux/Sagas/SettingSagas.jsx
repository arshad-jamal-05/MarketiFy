import { put, takeEvery } from "redux-saga/effects";
import {
  CREATE_SETTING,
  CREATE_SETTING_RED,
  GET_SETTING,
  GET_SETTING_RED,
  UPDATE_SETTING,
  UPDATE_SETTING_RED,
  DELETE_SETTING,
  DELETE_SETTING_RED,
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
  let response = yield createRecord("setting", action.payload);
  yield put({ type: CREATE_SETTING_RED, payload: response });
}

function* getSaga(action) {
  // worker saga
  let response = yield getRecord("setting", action.payload);
  yield put({ type: GET_SETTING_RED, payload: response });
}

function* updateSaga(action) {
  // worker saga
  let response = yield createRecord("setting", action.payload);
  yield put({ type: UPDATE_SETTING_RED, payload: response });
}

function* deleteSaga(action) {
  // worker saga
  let response = yield deleteRecord("setting", action.payload);
  yield put({ type: DELETE_SETTING_RED, payload: action.payload });
}

export default function* SettingSagas() {
  yield takeEvery(CREATE_SETTING, createSaga); // watcher saga
  yield takeEvery(GET_SETTING, getSaga); // watcher saga
  yield takeEvery(UPDATE_SETTING, updateSaga); // watcher saga
  yield takeEvery(DELETE_SETTING, deleteSaga); // watcher saga
}
