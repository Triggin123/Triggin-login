import { takeLatest } from "@redux-saga/core/effects";
import { APIS as apis } from "../../apis";
import { sagaFunctions } from "../../utils";
import { Login } from "./Action";

const login = (req) => {
  return sagaFunctions(Login, "post", apis.login, req.payload)();
};

export function* authWatcher() {
  yield takeLatest(Login.REQUEST, login);
}
