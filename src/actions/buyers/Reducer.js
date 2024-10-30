import { ReducerFunctions } from "../../utils";
import { GetBuyer, GetBuyers, SaveBuyer, SearchBuyer } from "./Action";

export const get_buyers_reducer = ReducerFunctions(GetBuyers, {});
export const get_buyer_reducer = ReducerFunctions(GetBuyer, {});
export const save_buyer_reducer = ReducerFunctions(SaveBuyer, {});
export const search_buyer_reducer = ReducerFunctions(SearchBuyer, {});
