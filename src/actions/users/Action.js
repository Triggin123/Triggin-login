import { ActionTypesFactory } from "../../utils";

export const GetUsers = ActionTypesFactory("Users", "POST");
export const GetUser = ActionTypesFactory("Get", "User");
export const SaveUser = ActionTypesFactory("User", "Save");
export const UpdateUser = ActionTypesFactory("User", "Update");

export const getUsers = (payload) => {
  return {
    type: GetUsers.REQUEST,
    payload,
  };
};

export const saveUser = (payload) => {
  return {
    type: SaveUser.REQUEST,
    payload,
  };
};

export const getUser = (payload) => {
  return {
    type: GetUser.REQUEST,
    payload,
  };
};

export const updateUser = (payload) => {
  return {
    type: UpdateUser.REQUEST,
    payload,
  };
};
