import { ActionTypesFactory } from "../../utils";

export const Login = ActionTypesFactory("Auth", "Login");
export const SignUp = ActionTypesFactory("Auth", "SignUp");
export const ForgotPassword = ActionTypesFactory("Auth", "ForgotPassword");

export const login = (payload) => {
  return {
    type: Login.REQUEST,
    payload,
  };
};

export const signup = (payload) => {
  return {
    type: SignUp.REQUEST,
    payload,
  };
};

export const forgot_password = (payload) => {
  return {
    type: ForgotPassword.REQUEST,
    payload,
  };
};
