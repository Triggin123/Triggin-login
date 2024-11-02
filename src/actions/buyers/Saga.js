import { takeLatest } from "@redux-saga/core/effects";
import { APIS as apis } from "../../apis";
import { sagaFunctions } from "../../utils";
import { GetBuyer, GetBuyers, SaveBuyer, SearchBuyer } from "./Action";

const get_buyers = (req) => {
  return sagaFunctions(GetBuyers, "post", apis.allBuyers + `/${req.payload.page}/${req.payload.pageSize || 10}`, req.payload)();
};

const get_buyer = (req) => {
  return sagaFunctions(
    GetBuyer,
    "post",
    apis.fetchBuyer,
    req.payload
  )();
};

const save_buyer = (req) => {
  return sagaFunctions(
    SaveBuyer,
    "post",
    apis.saveBuyer,
    req.payload
  )();
};

const search_buyer = (req) => {
  return sagaFunctions(
    SearchBuyer,
    "post",
    apis.searchBuyer,
    req.payload
  )();
};


export function* buyerWatcher() {
  yield takeLatest(GetBuyers.REQUEST, get_buyers);
  yield takeLatest(GetBuyer.REQUEST, get_buyer);
  yield takeLatest(SaveBuyer.REQUEST, save_buyer);
  yield takeLatest(SearchBuyer.REQUEST, search_buyer);
}
