import { takeLatest } from "@redux-saga/core/effects";
import { APIS as apis } from "../../apis";
import { sagaFunctions } from "../../utils";
import { GetSeller, GetSellers, SaveSeller, SearchSeller } from "./Action";

const get_sellers = (req) => {
  return sagaFunctions(GetSellers, "post", apis.allSellers + `/${req.payload.page}/10`, req.payload)();
};

const get_seller = (req) => {
  return sagaFunctions(
    GetSeller,
    "post",
    apis.fetchSeller,
    req.payload
  )();
};

const save_seller = (req) => {
  return sagaFunctions(
    SaveSeller,
    "post",
    apis.saveSeller,
    req.payload
  )();
};

const search_seller = (req) => {
  return sagaFunctions(
    SearchSeller,
    "post",
    apis.searchSeller,
    req.payload
  )();
};


export function* sellerWatcher() {
  yield takeLatest(GetSellers.REQUEST, get_sellers);
  yield takeLatest(GetSeller.REQUEST, get_seller);
  yield takeLatest(SaveSeller.REQUEST, save_seller);
  yield takeLatest(SearchSeller.REQUEST, search_seller);
}
