import { put, takeEvery } from "redux-saga/effects";
import {
  CREATE_FEATURES,
  CREATE_FEATURES_RED,
  GET_FEATURES,
  GET_FEATURES_RED,
  UPDATE_FEATURES,
  UPDATE_FEATURES_RED,
  DELETE_FEATURES,
  DELETE_FEATURES_RED,
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
  let response = yield createRecord("feature", action.payload); 
  yield put({ type: CREATE_FEATURES_RED, payload: response });
}

function* getSaga(action) {
  // worker saga
  let response = yield getRecord("feature", action.payload);
  yield put({ type: GET_FEATURES_RED, payload: response });
}

function* updateSaga(action) {
  // worker saga
  yield updateRecord("feature", action.payload); 
  yield put({ type: UPDATE_FEATURES_RED, payload: action.payload });
}

function* deleteSaga(action) {
  // worker saga
  let response = yield deleteRecord("feature", action.payload);
  yield put({ type: DELETE_FEATURES_RED, payload: action.payload });
}

export default function* FeaturesSagas() {
  yield takeEvery(CREATE_FEATURES, createSaga); // watcher saga
  yield takeEvery(GET_FEATURES, getSaga); // watcher saga
  yield takeEvery(UPDATE_FEATURES, updateSaga); // watcher saga
  yield takeEvery(DELETE_FEATURES, deleteSaga); // watcher saga
}
