import { ReducerFunctions } from "../../utils";
import { GetSeller, GetSellers, SaveSeller, SearchSeller } from "./Action";

export const get_sellers_reducer = ReducerFunctions(GetSellers, {});
export const get_seller_reducer = ReducerFunctions(GetSeller, {});
export const save_seller_reducer = ReducerFunctions(SaveSeller, {});
export const search_seller_reducer = ReducerFunctions(SearchSeller, {});
