export default function reducer(state={
    isLoggedIn: false
}, action){
    switch(action.type){
        case 'UPDATE_AUTH_STATE': {
            if(action.payload){
                localStorage.setItem('is_logged_in', true);
                const user = {
                    email: action.payload.email,
                    emailVerified: action.payload.emailVerified,
                    uid: action.payload.uid,
                    displayName: action.payload.displayName,
                    photoURL: action.payload.photoURL,
                    isAnonymous: action.payload.isAnonymous
                }
                return {...state, ...user, isLoggedIn: true}
            } else {
                localStorage.setItem('is_logged_in', false);
                let newState = {
                    isLoggedIn: false, 
                    user: null
                }
                return newState;
            }
        }
        case 'LOGIN': {
            const user = {
                email: action.payload.email,
                emailVerified: action.payload.emailVerified,
                uid: action.payload.uid,
                displayName: action.payload.displayName,
                photoURL: action.payload.photoURL,
                isAnonymous: action.payload.isAnonymous
            }
            return {...state, ...user, isLoggedIn: true}
        }
        case 'LOGOUT': {
            return {...state, isLoggedIn: false}
        }
        default: {
            return state
        }
    }
}