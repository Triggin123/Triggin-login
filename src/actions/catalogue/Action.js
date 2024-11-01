import { ActionTypesFactory } from "../../utils";

export const GetCatalogues = ActionTypesFactory("Catalogue", "POST");
export const CatalogueProducts = ActionTypesFactory("CatalogueProduct", "POST");

export const getCatalogues = (payload) => {
  return {
    type: GetCatalogues.REQUEST,
    payload,
  };
};

export const getCatalogueProducts = (payload) => {
  return {
    type: CatalogueProducts.REQUEST,
    payload,
  };
};

