import { takeLatest } from "@redux-saga/core/effects";
import { APIS as apis } from "../../apis";
import { sagaFunctions } from "../../utils";
import { GetDashboardCounts } from "./Action";

const get_dashboard_count = (req) => {
  return sagaFunctions(GetDashboardCounts, "post", apis.dashboardCount, req.payload)();
};


export function* dashboardWatcher() {
  yield takeLatest(GetDashboardCounts.REQUEST, get_dashboard_count);
}
