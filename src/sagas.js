import { all } from "redux-saga/effects";
import { authWatcher } from "./actions/auth";
import { userWatcher } from "./actions/users";
import { buyerWatcher } from "./actions/buyers";
import { sellerWatcher } from "./actions/sellers";
import { productWatcher } from "./actions/products";
import { catalogueWatcher } from "./actions/catalogue";
import { cartWatcher } from "./actions/carts";
import { mastertWatcher } from "./actions/master";
import { orderWatcher } from "./actions/order";

export function* rootSagas() {
  yield all([
    authWatcher(),
    userWatcher(),
    buyerWatcher(),
    sellerWatcher(),
    productWatcher(),
    catalogueWatcher(),
    cartWatcher(),
    mastertWatcher(),
    orderWatcher()
  ]);
}
