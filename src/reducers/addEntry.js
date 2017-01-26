export default function reducer(state={
    displayAddEntryForm: false
}, action){
    switch(action.type){
        case 'SHOW_ADD_ENTRY_FORM': {
            return {...state, displayAddEntryForm: true}
        }
        case 'HIDE_ADD_ENTRY_FORM': {
            return {...state, displayAddEntryForm: false}
        }
        default: {
            return {...state}
        }
    }
}