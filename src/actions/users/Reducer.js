import { ReducerFunctions } from "../../utils";
import { GetUser, GetUsers, SaveUser, UpdateUser } from "./Action";

export const get_users_reducer = ReducerFunctions(GetUsers, {});
export const get_user_reducer = ReducerFunctions(GetUser, {});
export const save_user_reducer = ReducerFunctions(SaveUser, {});
export const update_user_reducer = ReducerFunctions(UpdateUser, {});
