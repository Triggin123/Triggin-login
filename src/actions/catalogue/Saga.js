import { takeLatest } from "@redux-saga/core/effects";
import { APIS as apis } from "../../apis";
import { sagaFunctions } from "../../utils";
import { GetCatalogues, CatalogueProducts} from "./Action";

const get_catalogues = (req) => {
  return sagaFunctions(GetCatalogues, "post", apis.catalogue , req.payload)();
};
const get_catalogue_products = (req) => {
  return sagaFunctions(CatalogueProducts, "post", apis.catalogue_products , req.payload)();
};


export function* catalogueWatcher() {
  yield takeLatest(GetCatalogues.REQUEST, get_catalogues);
  yield takeLatest(CatalogueProducts.REQUEST, get_catalogue_products);
}
