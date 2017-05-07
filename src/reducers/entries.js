import { addEntryToStore } from '../helpers/utils';

export default function reducer(state={
    entries_initial_load: true,
    list: [],
}, action){
    switch(action.type){
        case 'ADD_ENTRY_TO_LIST': {
            return {...state}
        }
        case 'UPDATE_ENTRY_LIST': {
            const list = addEntryToStore(action.payload, state.list);
            return {...state, list, entries_initial_load: false}
        }
        default: {
            return {...state}
        }
    }
}