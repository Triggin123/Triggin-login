import { ActionTypesFactory } from "../../utils";

export const GetSellers = ActionTypesFactory("Sellers", "POST");
export const GetSeller = ActionTypesFactory("Get", "Seller");
export const SaveSeller = ActionTypesFactory("Sellers", "Save");
export const SearchSeller = ActionTypesFactory("Sellers", "Search");

export const getSellers = (payload) => {
  alert(JSON.stringify(payload))
  return {
    type: GetSellers.REQUEST,
    payload,
  };
};

export const saveSeller = (payload) => {
  return {
    type: SaveSeller.REQUEST,
    payload,
  };
};

export const getSeller = (payload) => {
  return {
    type: GetSeller.REQUEST,
    payload,
  };
};

export const searchSeller = (payload) => {
  return {
    type: SearchSeller.REQUEST,
    payload,
  };
};
