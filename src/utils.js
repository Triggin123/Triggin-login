import _ from "lodash";
import { call, put } from "redux-saga/effects";
import endpoint from "./endpoint";

export const RESET_ON_LOGOUT = "RESET_ON_LOGOUT";

export const getUserName = () => {
  if (localStorage?.getItem("user")) {
    let user = JSON.parse(localStorage?.getItem("user"));
    return user?.lname ? user?.fname +" "+user?.lname : user?.fname
  }
  return "";
};

export const getLoggedinId = () => {
  if (localStorage?.getItem("user")) {
    let user = JSON.parse(localStorage?.getItem("user"));
    return user?._id || user?.id
  }
  return "";
};

export const getFirstName = () => {
  if (localStorage?.getItem("user")) {
    let user = JSON.parse(localStorage?.getItem("user"));
    return user?.fame || "";
  }
  return "";
};
export const getLastName = () => {
  if (localStorage?.getItem("user")) {
    let user = JSON.parse(localStorage?.getItem("user"));
    return user?.lname || "";
  }
  return "";
};

export const getUserEmail = () => {
  if (localStorage?.getItem("user")) {
    let user = JSON.parse(localStorage?.getItem("user"));
    return user?.email || "";
  }
  return "";
};

export const getUserPhoneNumeber = () => {
  if (localStorage?.getItem("user")) {
    let user = JSON.parse(localStorage?.getItem("user"));
    return user?.phoneNumber || "";
  }
  return "";
};

export const isSuperAdmin = () => {
  if (localStorage?.getItem("user")) {
    let user = JSON.parse(localStorage?.getItem("user"));
    if (user?.isSuperAdmin) {
      return true;
    }
    return false;
  }
  return false;
};

export const getUserType = () => {
  if (localStorage?.getItem("user")) {
    let user = JSON.parse(localStorage?.getItem("user"));
    return user?.role;
  }
  return ""
};

export const getIndustryId = () => {
  if (localStorage?.getItem("user")) {
    let user = JSON.parse(localStorage?.getItem("user"));
    return user?.industryTypeId || null;
  }
  return ""
};


export const ActionTypesFactory = (prefix, type) => {
  let p = _.upperCase(prefix) + "/" + _.upperCase(type);
  return {
    REQUEST: p + "_REQUEST",
    INPROGRESS: p + "_INPROGRESS",
    SUCCESS: p + "_SUCCESS",
    FAILED: p + "_FAILED",
    CHANGED: p + "_CHANGED",
    RESET: p + "_RESET",
    custom: (name) => {
      return `${p}_${name}`;
    },
  };
};

export const sagaFunctions = (action_type, method, api, data, headers) => {
  return function* () {
    let res = null;
    try {
      if (method === "post" || method === "put" || method === "patch") {
        res = yield call(endpoint[method], api, data, {
          headers,
        });
      } else if (method === "delete") {
        res = yield call(endpoint[method], api, { data: { ...data } });
      } else {
        res = yield call(endpoint[method], api, {
          params: data,
        });
      }
      if (res.status < 400) {
        yield put({
          type: action_type.SUCCESS,
          payload: res.data,
        });
      } else {
        yield put({
          type: action_type.FAILED,
          payload: res.data,
        });
      }
    } catch (err) {
      yield put({
        type: action_type.FAILED,
        payload: err?.response?.data
          ? err?.response?.data
          : {
            msg: "Something went wrong!",
          },
      });
    }
  };
};

export const ReducerFunctions = (ActionType, initialState) => {
  return (state = initialState, action) => {
    switch (action.type) {
      case ActionType.REQUEST:
        return {
          ...state,
          loading: true,
        };
      case ActionType.SUCCESS:
        return {
          ...state,
          ...action.payload,
          loading: false,
        };
      case ActionType.CHANGED:
        return {
          ...state,
          ...action.payload,
          loading: false,
        };
      case ActionType.FAILED:
        let errMsg = action?.payload?.msg;
        return {
          ...state,
          ...action.payload,
          errMsg,
          loading: false,
          success: false,
        };
      case ActionType.RESET: {
        return {
          loading: false,
          suc: "",
          msg: "",
        };
      }

      case RESET_ON_LOGOUT: {
        return {
          loading: false,
          suc: "",
          msg: "",
        };
      }

      default:
        return state;
    }
  };
};
