import { takeLatest } from "@redux-saga/core/effects";
import { GetIndustryGroup, GetSubCategoriesBasedOnCategory } from ".";
import { APIS as apis } from "../../apis";
import { sagaFunctions } from "../../utils";
import { GetIndustries, SaveIndustries, SaveCategories, SaveSubCategories, GetCategoriesBasedOnIndustry } from "./Action";

const get_industries = (req) => {
  return sagaFunctions(GetIndustries, "post", apis.industry_all+`/${req.payload.page}/${req.payload.pageSize || 100}`, req.payload)();
};
const save_industries = (req) => {
  return sagaFunctions(SaveIndustries, "post", apis.industry_save, req.payload)();
};
const save_categories = (req) => {
  return sagaFunctions(SaveCategories, "post", apis.category_save, req.payload)();
};
const save_subcategories = (req) => {
  return sagaFunctions(SaveSubCategories, "post", apis.subcategory_save, req.payload)();
};
const get_categories_based_industry_reducer = (req) => {
  return sagaFunctions(GetCategoriesBasedOnIndustry, "get", apis.category_basedon_industry+"/"+req.payload.industryTypeId)();
};
const get_industry_group_reducer = (req) => {
  return sagaFunctions(GetIndustryGroup,"post", apis.industry_group, req.payload)();
};
const get_subcategories_based_category_reducer = (req) => {
  return sagaFunctions(GetSubCategoriesBasedOnCategory, "get", apis.subcategory_basedon_category+"/"+req.payload.categoryId)();
};

export function* mastertWatcher() {
  yield takeLatest(GetIndustries.REQUEST, get_industries);
  yield takeLatest(SaveIndustries.REQUEST, save_industries);
  yield takeLatest(SaveCategories.REQUEST, save_categories);
  yield takeLatest(SaveSubCategories.REQUEST, save_subcategories);
  yield takeLatest(GetCategoriesBasedOnIndustry.REQUEST, get_categories_based_industry_reducer);
  yield takeLatest(GetIndustryGroup.REQUEST, get_industry_group_reducer);
  yield takeLatest(GetSubCategoriesBasedOnCategory.REQUEST, get_subcategories_based_category_reducer);
  
}
