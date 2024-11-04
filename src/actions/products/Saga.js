import { takeLatest } from "@redux-saga/core/effects";
import { APIS as apis } from "../../apis";
import { sagaFunctions } from "../../utils";
import { GetProductsOwn, GetProductsSupplier, SaveProduct, GetProduct } from "./Action";

const get_products_own = (req) => {
  return sagaFunctions(GetProductsOwn, "post", apis.fetchProductsOwn + `/${req.payload.page}/${req.payload.pageSize || 20}`, req.payload)();
};
const get_products_sullpier = (req) => {
  return sagaFunctions(GetProductsSupplier, "post", apis.fetchProductsSupplier, req.payload)();
};

const get_product = (req) => {
  return sagaFunctions(
    GetProduct,
    "post",
    apis.detailsProduct,
    req.payload
  )();
};

const save_product = (req) => {
  return sagaFunctions(
    SaveProduct,
    "post",
    apis.saveProduct,
    req.payload
  )();
};

export function* productWatcher() {
  yield takeLatest(GetProductsOwn.REQUEST, get_products_own);
  yield takeLatest(GetProductsSupplier.REQUEST, get_products_sullpier);
  yield takeLatest(SaveProduct.REQUEST, save_product);
  yield takeLatest(GetProduct.REQUEST, get_product);
}
