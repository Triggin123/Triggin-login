import { ReducerFunctions } from "../../utils";
import { ForgotPassword, Login, SignUp } from "./Action";

export const login_reducer = ReducerFunctions(Login, {});
export const signup_reducer = ReducerFunctions(SignUp, {});
export const forgot_password_reducer = ReducerFunctions(ForgotPassword, {});
