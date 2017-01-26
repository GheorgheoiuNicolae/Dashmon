export default function reducer(state={
    labels_initial_load: true,
    list: [],
}, action){
    switch(action.type){
        case 'ADD_LABEL_TO_LIST': {
            return {...state}
        }
        case 'UPDATE_LABELS_LIST': {
            return {...state, labels_initial_load: false, list: action.payload}
        }
        default: {
            return {...state}
        }
    }
}