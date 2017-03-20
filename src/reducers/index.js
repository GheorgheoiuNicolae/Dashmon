import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import entries from './entries';
import user from './user';
import labels from './labels';
import entryImages from './entryImages';
import currentEntry from './currentEntry';


const rootReducer = combineReducers( {entries, currentEntry, entryImages, labels, user, routing: routerReducer} );

export default rootReducer;