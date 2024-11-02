import { ActionTypesFactory } from "../../utils";

export const GetCartProducts = ActionTypesFactory("Cart", "POST");

export const getCartProducts = (payload) => {
  return {
    type: GetCartProducts.REQUEST,
    payload,
  };
};