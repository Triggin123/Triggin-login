import { takeLatest } from "@redux-saga/core/effects";
import { APIS as apis } from "../../apis";
import { sagaFunctions } from "../../utils";
import { GetUser, GetUsers, SaveUser, UpdateUser } from "./Action";

const get_users = (req) => {
  return sagaFunctions(GetUsers, "post", apis.user + `/${req.payload.page}/${req.payload.pageSize || 10}`, req.payload)();
};

const get_user = (req) => {
  return sagaFunctions(
    GetUser,
    "post",
    apis.userDetails,
    req.payload
  )();
};

const saveUser = (req) => {
  return sagaFunctions(
    SaveUser,
    "post",
    apis.saveUser,
    req.payload
  )();
};

const updateUser = (req) => {
  return sagaFunctions(
    UpdateUser,
    "post",
    apis.updateUser,
    req.payload
  )();
};


export function* userWatcher() {
  yield takeLatest(GetUsers.REQUEST, get_users);
  yield takeLatest(GetUser.REQUEST, get_user);
  yield takeLatest(SaveUser.REQUEST, saveUser);
  yield takeLatest(UpdateUser.REQUEST, updateUser);
}
