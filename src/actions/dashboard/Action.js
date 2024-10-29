import { ActionTypesFactory } from "../../utils";

export const GetDashboardCounts = ActionTypesFactory("Dashboard", "POST");

export const getDashboardCounts = (payload) => {
  return {
    type: GetDashboardCounts.REQUEST,
    payload,
  };
};

