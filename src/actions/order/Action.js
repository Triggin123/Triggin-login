import { ActionTypesFactory } from "../../utils";

export const PlaceOrder = ActionTypesFactory("Order", "POST");
export const GetOrders = ActionTypesFactory("Order_GET", "POST");
export const GetOrderDetails = ActionTypesFactory("Order_DET", "POST");

export const placeOrder = (payload) => {
  return {
    type: PlaceOrder.REQUEST,
    payload,
  };
};

export const getOrders = (payload) => {
  return {
    type: GetOrders.REQUEST,
    payload,
  };
};

export const getOrderDetails = (payload) => {
  return {
    type: GetOrderDetails.REQUEST,
    payload,
  };
};