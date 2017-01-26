import { createStore, applyMiddleware } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';
// import logger from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index';


// const middleware = applyMiddleware(thunk, logger());
const middleware = applyMiddleware(thunk);
const store = createStore(rootReducer, middleware);

export const history = syncHistoryWithStore(browserHistory, store);

export default store;
store.subscribe(function(){
    console.log('store state:', store.getState());
});

// , window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()