import { ActionTypesFactory } from "../../utils";

export const AddCartProducts = ActionTypesFactory("CartAdd", "POST");
export const GetCartProducts = ActionTypesFactory("Cart", "POST");
export const DeleteCartProducts = ActionTypesFactory("CartDel", "POST");

export const addCartProducts = (payload) => {
  return {
    type: AddCartProducts.REQUEST,
    payload,
  };
};

export const getCartProducts = (payload) => {
  return {
    type: GetCartProducts.REQUEST,
    payload,
  };
};

export const deleteCartProducts = (payload) => {
  return {
    type: DeleteCartProducts.REQUEST,
    payload,
  };
};