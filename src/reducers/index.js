import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import addEntry from './addEntry';
import entries from './entries';
import user from './user';
import labels from './labels';


const rootReducer = combineReducers( {addEntry, entries, labels, user, routing: routerReducer} );

export default rootReducer;