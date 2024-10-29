import { all } from "redux-saga/effects";
import { authWatcher } from "./actions/auth";
import { userWatcher } from "./actions/users";

export function* rootSagas() {
  yield all([
    authWatcher(),
    userWatcher(),
  ]);
}
