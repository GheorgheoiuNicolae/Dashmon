import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import entries from './entries';
import user from './user';
import labels from './labels';
import entryImages from './entryImages';


const rootReducer = combineReducers( {entries, entryImages, labels, user, routing: routerReducer} );

export default rootReducer;