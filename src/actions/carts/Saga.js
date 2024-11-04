import { takeLatest } from "@redux-saga/core/effects";
import { APIS as apis } from "../../apis";
import { sagaFunctions } from "../../utils";
import { GetCartProducts, AddCartProducts, DeleteCartProducts} from "./Action";

const get_cart_products = (req) => {
  return sagaFunctions(GetCartProducts, "post", apis.cartAll, req.payload)();
};
const add_cart_products = (req) => {
  return sagaFunctions(AddCartProducts, "post", apis.cartAdd, req.payload)();
};
const del_cart_products = (req) => {
  return sagaFunctions(DeleteCartProducts, "post", apis.cartDelete, req.payload)();
};

export function* cartWatcher() {
  yield takeLatest(GetCartProducts.REQUEST, get_cart_products);
  yield takeLatest(AddCartProducts.REQUEST, add_cart_products);
  yield takeLatest(DeleteCartProducts.REQUEST, del_cart_products);
}
