export const APIS = {
  login: "/login",
  user: "/user/all",
  userDetails: "/user/fetch",
  updateUser:"/user/update",
  saveUser:"/signup",
  dashboardCount: "/dashboard/counts",

  saveBuyer:"/buyer/add",
  fetchBuyer: "/buyer/fetch",
  allBuyers: "/buyer/getAll",
  searchBuyer:"/buyer/search",

  saveSeller:"/seller/add",
  fetchSeller: "/seller/fetch",
  allSellers: "/seller/getAll",
  searchSeller:"/seller/search",

  saveProduct:"/product/save",
  fetchProductsOwn: "/product/all",
  fetchProductsSupplier: "/product/supplier/all",
  detailsProduct: "/product/details",

  catalogue:"/seller/fromBuyer",
  catalogue_products:"/product/supplier/all",

  cartAll: "/cart/getAll",
  cartAdd: "/cart/add",
  cartDelete: "/cart/delete",

  industry_all: "/master/industry/list",
  industry_save: "/master/industry/save",

  category_save: "/category/save",
  subcategory_save: "/subcategory/save",

  category_basedon_industry: "/category/industryType",
  subcategory_basedon_category: "/subcategory/category",
  industry_group: "/master/industry/group"
}
