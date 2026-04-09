import { put, takeEvery } from "redux-saga/effects";
import {
  CREATE_WISHLIST,
  CREATE_WISHLIST_RED,
  GET_WISHLIST,
  GET_WISHLIST_RED,
  UPDATE_WISHLIST,
  UPDATE_WISHLIST_RED,
  DELETE_WISHLIST,
  DELETE_WISHLIST_RED,
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
  let response = yield createRecord("wishlist", action.payload); // if data has no file field
  // let response = yield createMultipartRecord("wishlist", action.payload); // if data has at least 1 file field
  yield put({ type: CREATE_WISHLIST_RED, payload: response });
}

function* getSaga(action) {
  // worker saga
  let response = yield getRecord("wishlist", action.payload);
  yield put({ type: GET_WISHLIST_RED, payload: response });
}

function* updateSaga(action) {
  // worker saga
  yield updateRecord("wishlist", action.payload); // if data has no file field
  // yield updateMultipartRecord("wishlist", action.payload);  // if data has at least 1 file field
  yield put({ type: UPDATE_WISHLIST_RED, payload: action.payload });

  // in case of real backend
  // let response = yield updateRecord("wishlist", action.payload); // if data has no file field
  // let response = yield updateMultipartRecord("wishlist", action.payload);  // if data has at least 1 file field
  // yield put({ type: UPDATE_WISHLIST_RED, payload: response });
}

function* deleteSaga(action) {
  // worker saga
  let response = yield deleteRecord("wishlist", action.payload);
  yield put({ type: DELETE_WISHLIST_RED, payload: action.payload });
}

export default function* WishlistSagas() {
  yield takeEvery(CREATE_WISHLIST, createSaga); // watcher saga
  yield takeEvery(GET_WISHLIST, getSaga); // watcher saga
  yield takeEvery(UPDATE_WISHLIST, updateSaga); // watcher saga
  yield takeEvery(DELETE_WISHLIST, deleteSaga); // watcher saga
}
