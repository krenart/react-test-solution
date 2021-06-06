import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import itemsReducer from "./domain/duck/reducers";
import { reducer as oidcReducer } from "redux-oidc";

const rootReducer = (history) => {
    return combineReducers({
        oidc: oidcReducer, 
        router: connectRouter(history),itemsR: itemsReducer,
    });
}
export default rootReducer;