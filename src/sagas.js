import { all } from "redux-saga/effects";
import { authWatcher } from "./actions/auth";

export function* rootSagas() {
  yield all([
    authWatcher(),
  ]);
}
