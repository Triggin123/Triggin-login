import { combineReducers } from "redux";
import { login_reducer } from "./actions/auth/Reducer";

export default combineReducers({
  auth: combineReducers({
    login: login_reducer
  })
});
