import { all } from "redux-saga/effects";
import { authWatcher } from "./actions/auth";
import { userWatcher } from "./actions/users";
import { buyerWatcher } from "./actions/buyers";
import { sellerWatcher } from "./actions/sellers";

export function* rootSagas() {
  yield all([
    authWatcher(),
    userWatcher(),
    buyerWatcher(),
    sellerWatcher()
  ]);
}
