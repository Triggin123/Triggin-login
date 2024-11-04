import { ReducerFunctions } from "../../utils";
import { GetCartProducts, AddCartProducts, DeleteCartProducts } from "./Action";

export const get_cart_products_reducer = ReducerFunctions(GetCartProducts, {});
export const add_cart_products_reducer = ReducerFunctions(AddCartProducts, {});
export const del_cart_products_reducer = ReducerFunctions(DeleteCartProducts, {});
