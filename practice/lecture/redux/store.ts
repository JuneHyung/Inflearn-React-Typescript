import {createStore, MiddlewareAPI, Dispatch, AnyAction, applyMiddleware, compose, } from 'redux';
import reducer from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

const initialState = {
  user: {
    isLoggingIn: false,
    data: null,
  },
  psts: [],
}

const firstMiddleware = (store:MiddlewareAPI) => (next: Dispatch<AnyAction>) => (action: AnyAction) => {
  console.log('로깅', action);
  next(action);
}

const thunkMiddleware = (store:MiddlewareAPI) => (next: Dispatch<AnyAction>) => (action: any) => {
  if(typeof action === 'function'){
    return action(store.dispatch, store.getState);
  }
  return next(action)
}

const enhancer = process.env.NODE_ENV === 'production' 
? compose(applyMiddleware(firstMiddleware, thunkMiddleware))
: composeWithDevTools(
  applyMiddleware(firstMiddleware, thunkMiddleware)
)

const store = createStore(reducer, initialState, enhancer)

export default store;