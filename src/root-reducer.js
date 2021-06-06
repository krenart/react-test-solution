import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { reducer as oidcReducer } from "redux-oidc";
import  generalReducer  from "./domain/duck/reducers";

const rootReducer = (history) => {
  return combineReducers({
    oidc: oidcReducer,
    router: connectRouter(history),
    general: generalReducer,
  });
};

export default rootReducer;
