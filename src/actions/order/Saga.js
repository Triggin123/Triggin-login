import { takeLatest } from "@redux-saga/core/effects";
import { APIS as apis } from "../../apis";
import { sagaFunctions } from "../../utils";
import { GetOrders, PlaceOrder, GetOrderDetails} from "./Action";

const place_order = (req) => {
  return sagaFunctions(PlaceOrder, "post", apis.place_order, req.payload)();
};
const get_orders = (req) => {
  return sagaFunctions(GetOrders, "post", apis.order_all+`/${req.payload.page}/${req.payload.pageSize || 20}`, req.payload)();
};
const get_order_details = (req) => {
  return sagaFunctions(GetOrderDetails, "post", apis.get_order_details, req.payload)();
};

export function* orderWatcher() {
  yield takeLatest(GetOrders.REQUEST, get_orders);
  yield takeLatest(PlaceOrder.REQUEST, place_order);
  yield takeLatest(GetOrderDetails.REQUEST, get_order_details);
}
