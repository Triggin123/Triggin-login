import { ActionTypesFactory } from "../../utils";

export const GetProductsOwn = ActionTypesFactory("Products_Own", "POST");
export const GetProductsSupplier = ActionTypesFactory("Products_Supplier", "POST");
export const GetProduct = ActionTypesFactory("Get", "Product");
export const SaveProduct = ActionTypesFactory("Products", "Save");

export const getProductsOwn = (payload) => {
  return {
    type: GetProductsOwn.REQUEST,
    payload,
  };
};
export const getProductsSupplier = (payload) => {
  return {
    type: GetProductsSupplier.REQUEST,
    payload,
  };
};

export const saveProduct = (payload) => {
  return {
    type: SaveProduct.REQUEST,
    payload,
  };
};

export const getProduct = (payload) => {
  return {
    type: GetProduct.REQUEST,
    payload,
  };
};
