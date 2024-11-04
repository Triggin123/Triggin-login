import { combineReducers } from "redux";
import { login_reducer } from "./actions/auth/Reducer";
import { get_user_reducer, get_users_reducer, save_user_reducer, update_user_reducer} from "./actions/users/Reducer";
import { get_buyer_reducer, get_buyers_reducer, save_buyer_reducer, search_buyer_reducer} from "./actions/buyers/Reducer";
import { get_seller_reducer, get_sellers_reducer, save_seller_reducer, search_seller_reducer} from "./actions/sellers/Reducer";
import { get_products_own_reducer, get_products_supplier_reducer, save_product_reducer, details_product_reducer} from "./actions/products/Reducer";
import { get_catalogue_reducer, get_catalogue_products_reducer } from "./actions/catalogue/Reducer";
import { get_cart_products_reducer, add_cart_products_reducer, del_cart_products_reducer } from "./actions/carts/Reducer";
import { get_industries_reducer, save_industries_reducer , save_categories_reducer, save_subcategories_reducer,
  get_categories_based_industry_reducer, get_industry_group_reducer,
get_subcategories_based_category_reducer} from "./actions/master/Reducer";

export default combineReducers({
  auth: combineReducers({
    login: login_reducer
  }),
  user: combineReducers({
    all: get_users_reducer,
    detail: get_user_reducer,
    save: save_user_reducer,
    update: update_user_reducer
  }),
  buyer: combineReducers({
    all: get_buyers_reducer,
    detail: get_buyer_reducer,
    save: save_buyer_reducer,
    search: search_buyer_reducer
  }),
  seller: combineReducers({
    all: get_sellers_reducer,
    detail: get_seller_reducer,
    save: save_seller_reducer,
    search: search_seller_reducer
  }),
  product: combineReducers({
    all_own: get_products_own_reducer,
    all_supplier: get_products_supplier_reducer,
    detail: details_product_reducer,
    save: save_product_reducer
  }),
  catalogue: combineReducers({
    all: get_catalogue_reducer,
    catalogue_products: get_catalogue_products_reducer
  }),
  cart: combineReducers({
    all: get_cart_products_reducer,
    add: add_cart_products_reducer,
    delete: del_cart_products_reducer
  }),
  master: combineReducers({
    industry_all: get_industries_reducer,
    industry_save: save_industries_reducer,
    category_save: save_categories_reducer,
    subcategory_save: save_subcategories_reducer,
    category_based_industry: get_categories_based_industry_reducer,
    industry_group: get_industry_group_reducer,
    subcategory_based_category: get_subcategories_based_category_reducer
  }),

});
