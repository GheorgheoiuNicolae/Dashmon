import { ref, firebaseAuth } from '../config/constants';
import { browserHistory } from 'react-router';

export function login(user, pass){
  return dispatch => {
    firebaseAuth().signInWithEmailAndPassword(user, pass).then(function(res){
      browserHistory.push('/dashboard')
      dispatch( {
        type: "LOGIN",
        payload: res
      })
    });
  };
}

export function logout(data){
  return dispatch => {
    firebaseAuth().signOut().then((res) => {
      browserHistory.push('/login')
      console.log('logout res: ', res);
      dispatch({
        type: "LOGOUT",
        payload: res
      });
    });
  };
}

// runs on firebaseAuth.onAuthStateChange
export function checkAuthState(data){
  if (data) {
    browserHistory.push('/dashboard')
  } else {
    browserHistory.push('/login')
  }
  return {
    type: 'UPDATE_AUTH_STATE',
    payload: data
  }
}

export function registerUser (email, pw) {
  return dispatch => {
    // Register with FB api
    firebaseAuth().createUserWithEmailAndPassword(email, pw)
      .then((user) => {
        // Save the user to a users collection
        ref.child(`users/${user.uid}/info`)
        .set({
          email: user.email,
          uid: user.uid
        }).then(() => {
          // user was successfully saved into the collection
          browserHistory.push('/dashboard')
          dispatch({
            type: 'LOGIN',
            payload: user
          })
        });  
      })
      .catch((error) => console.log('Oops', error))
  }
}
