export default function reducer(state={
}, action){
    switch(action.type){
        case 'ADD_ENTRY_DATA': {
            console.log('reducer: ', action)
            return {...state, ...action.payload}
        }
        default: {
            return {...state}
        }
    }
}