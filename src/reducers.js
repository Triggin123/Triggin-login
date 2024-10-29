import { combineReducers } from "redux";
import { login_reducer, states_reducer, cities_reducer, countries_reducer, currencies_reducer } from "./actions/auth/Reducer";
import { get_user_reducer, get_users_reducer, save_user_reducer} from "./actions/users/Reducer";

export default combineReducers({
  auth: combineReducers({
    login: login_reducer
  }),
  user: combineReducers({
    all: get_users_reducer,
    detail: get_user_reducer,
    save: save_user_reducer,
  }),

});
