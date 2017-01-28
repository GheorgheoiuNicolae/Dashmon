import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import entries from './entries';
import user from './user';
import labels from './labels';


const rootReducer = combineReducers( {entries, labels, user, routing: routerReducer} );

export default rootReducer;