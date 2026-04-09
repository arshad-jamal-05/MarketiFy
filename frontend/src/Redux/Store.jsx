import { configureStore } from "@reduxjs/toolkit";
import CreateSagaMiddleware from "redux-saga";
import RootReducer from "./Reducers/RootReducer";
import RootSaga from "./Sagas/RootSaga";

const Saga = CreateSagaMiddleware();

const Store = configureStore({
  reducer: RootReducer,
  middleware: () => [Saga],
});

Saga.run(RootSaga);

export default Store;
