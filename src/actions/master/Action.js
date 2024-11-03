import { ActionTypesFactory } from "../../utils";

export const GetIndustries = ActionTypesFactory("Industry", "POST");
export const SaveIndustries = ActionTypesFactory("Industry", "SAVE");

export const SaveCategories = ActionTypesFactory("Categories", "SAVE");
export const SaveSubCategories = ActionTypesFactory("SubCategories", "SAVE");

export const GetCategoriesBasedOnIndustry = ActionTypesFactory("CatInd", "POST");
export const GetSubCategoriesBasedOnCategory = ActionTypesFactory("SubCatCat", "POST");

export const GetIndustryGroup = ActionTypesFactory("Industry_Group", "POST");

export const getIndustries = (payload) => {
  return {
    type: GetIndustries.REQUEST,
    payload,
  };
};

export const saveIndustries = (payload) => {
  return {
    type: SaveIndustries.REQUEST,
    payload,
  };
};

export const saveCategories = (payload) => {
  return {
    type: SaveCategories.REQUEST,
    payload,
  };
};

export const saveSubCategories = (payload) => {
  return {
    type: SaveSubCategories.REQUEST,
    payload,
  };
};

export const getCategoriesBasedOnIndustry = (payload) => {
  return {
    type: GetCategoriesBasedOnIndustry.REQUEST,
    payload,
  };
};

export const getSubCategoriesBasedOnCategory = (payload) => {
  return {
    type: GetSubCategoriesBasedOnCategory.REQUEST,
    payload,
  };
};

export const getIndustryGroup = (payload) => {
  return {
    type: GetIndustryGroup.REQUEST,
    payload,
  };
};