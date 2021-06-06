import { createStore, applyMiddleware, compose } from "redux";
import {createBrowserHistory} from 'history'
import { routerMiddleware} from 'connected-react-router';
// import { connectRouter} from 'connected-react-router'
import {  loadUser } from "redux-oidc";
// import createOidcMiddleware from "redux-oidc";
import rootReducer from "./root-reducer";
import thunk from 'redux-thunk'
// import userManager from "./util/auth/userManager";

export const history = createBrowserHistory({basename:process.env.REACT_APP_ROUTER_BASE || ''})
//const oidcMiddleware = createOidcMiddleware(userManager);

const loggerMiddleware = store => next => action => {
  //console.log("Action type:", action.type);
  //console.log("Action payload:", action.payload);
  //console.log("State before:", store.getState());
  next(action);
  //console.log("State after:", store.getState());
};

const initialState = {};
const enhancers = [];
const middleware = [
    thunk,
  loggerMiddleware,
  //oidcMiddleware,
  routerMiddleware(history)];

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension())
  }
}

const composedEnhancers = compose(
    applyMiddleware(...middleware),
    ...enhancers
)

const store = createStore(
    rootReducer(history),
    initialState,
    composedEnhancers
)

// loadUser(store, userManager);
export default store;
