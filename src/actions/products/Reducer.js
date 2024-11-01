import { ReducerFunctions } from "../../utils";
import { GetProductsOwn, GetProductsSupplier, SaveProduct, GetProduct } from "./Action";

export const get_products_own_reducer = ReducerFunctions(GetProductsOwn, {});
export const get_products_supplier_reducer = ReducerFunctions(GetProductsSupplier, {});
export const save_product_reducer = ReducerFunctions(SaveProduct, {});
export const details_product_reducer = ReducerFunctions(GetProduct, {});
