export default function reducer(state={
    entries_initial_load: true,
    list: []
}, action){
    switch(action.type){
        case 'ADD_ENTRY_TO_LIST': {
            return {...state}
        }
        case 'UPDATE_ENTRY_LIST': {
            return {...state, entries_initial_load: false, list: action.payload}
        }
        default: {
            return {...state}
        }
    }
}