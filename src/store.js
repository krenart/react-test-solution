import { createStore, applyMiddleware, compose } from "redux";
import {createBrowserHistory} from 'history'
import { routerMiddleware} from 'connected-react-router';
import rootReducer from "./root-reducer";
import thunk from 'redux-thunk'

export const history = createBrowserHistory({basename:''})

const loggerMiddleware = store => next => action => {
  next(action);
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

export default store;
