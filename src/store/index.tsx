import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers/index';

const promiseMiddleware = require('redux-promise');

const configStore = () => {
  const reduxTools = window.__REDUX_DEVTOOLS_EXTENSION__;
  const promiseM = applyMiddleware(promiseMiddleware);

  const middleware = reduxTools ? compose(promiseM, reduxTools()) : promiseM;
  const store = createStore(rootReducer, middleware);
  return store;
};

export default configStore;
