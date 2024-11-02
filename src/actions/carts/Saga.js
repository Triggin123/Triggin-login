import { takeLatest } from "@redux-saga/core/effects";
import { APIS as apis } from "../../apis";
import { sagaFunctions } from "../../utils";
import { GetCartProducts} from "./Action";

const get_cart_products = (req) => {
  return sagaFunctions(GetCartProducts, "post", apis.cartAll, req.payload)();
};

export function* cartWatcher() {
  yield takeLatest(GetCartProducts.REQUEST, get_cart_products);
}
