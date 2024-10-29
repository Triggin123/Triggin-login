export const APIS = {
  login: "/login",
  states: "/master/states",
  cities: "/master/cities",
  countries: "/master/countries",
  currencies: "/master/currencies",
  
  group: "/group",
  groupDetails: "/group/details",
  saveGroup:"/group/create",
  groupQustBindFetch:"/group/question/bind/fetch",
  groupNames: "/group/names",
  groupsByUid: "/group/info/byuid/fetch",
  
  question: "/question",
  questionDetails: "/question/details",
  saveQuestion:"/question/create",
  saveGrpAndQtnBind:"/group/question/bind/map",
  questionsBasedOnGroupId:"/question/based/groupId/fetch",
  
  user: "/user",
  userDetails: "/user/fetch",
  saveUser:"/user/save",
  dashboardCount: "/dashboard/counts",

  getTopRatingsBasedGroupId:"rating/top",
  saveReview:"/review/create"
}
