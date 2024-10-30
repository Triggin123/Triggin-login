import { ActionTypesFactory } from "../../utils";

export const GetBuyers = ActionTypesFactory("Buyers", "POST");
export const GetBuyer = ActionTypesFactory("Get", "Buyer");
export const SaveBuyer = ActionTypesFactory("Buyers", "Save");
export const SearchBuyer = ActionTypesFactory("Buyers", "Search");

export const getBuyers = (payload) => {
  return {
    type: GetBuyers.REQUEST,
    payload,
  };
};

export const saveBuyer = (payload) => {
  return {
    type: SaveBuyer.REQUEST,
    payload,
  };
};

export const getBuyer = (payload) => {
  return {
    type: GetBuyer.REQUEST,
    payload,
  };
};

export const searchBuyer = (payload) => {
  return {
    type: SearchBuyer.REQUEST,
    payload,
  };
};
