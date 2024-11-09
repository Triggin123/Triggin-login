import { ReducerFunctions } from "../../utils";
import { PlaceOrder, GetOrderDetails, GetOrders } from "./Action";

export const place_order_reducer = ReducerFunctions(PlaceOrder, {});
export const get_oeders_reducer = ReducerFunctions(GetOrders, {});
export const get_order_details_reducer = ReducerFunctions(GetOrderDetails, {});
