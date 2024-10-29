import { ReducerFunctions } from "../../utils";
import { GetUser, GetUsers, SaveUser } from "./Action";

export const get_users_reducer = ReducerFunctions(GetUsers, {});
export const get_user_reducer = ReducerFunctions(GetUser, {});
export const save_user_reducer = ReducerFunctions(SaveUser, {});
