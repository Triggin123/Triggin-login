import { ReducerFunctions } from "../../utils";
import { GetIndustries, SaveIndustries, SaveCategories, SaveSubCategories, GetCategoriesBasedOnIndustry, GetIndustryGroup,
GetSubCategoriesBasedOnCategory } from "./Action";

export const get_industries_reducer = ReducerFunctions(GetIndustries, {});
export const save_industries_reducer = ReducerFunctions(SaveIndustries, {});
export const save_categories_reducer = ReducerFunctions(SaveCategories, {});
export const save_subcategories_reducer = ReducerFunctions(SaveSubCategories, {});
export const get_categories_based_industry_reducer = ReducerFunctions(GetCategoriesBasedOnIndustry, {});
export const get_industry_group_reducer = ReducerFunctions(GetIndustryGroup, {});
export const get_subcategories_based_category_reducer = ReducerFunctions(GetSubCategoriesBasedOnCategory, {});