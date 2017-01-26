import * as firebase from 'firebase';
// import dispatcher from '../dispatchers/dispatcher';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyClyqYdKjwiNh6MYB3aQdAcirJ2ppxzce4",
  authDomain: "everlist-f2ba5.firebaseapp.com",
  databaseURL: "https://everlist-f2ba5.firebaseio.com",
  storageBucket: "everlist-f2ba5.appspot.com",
  messagingSenderId: "1054249488306"
};
firebase.initializeApp(config);

export const ref = firebase.database().ref()
export let firebaseAuth = firebase.auth;
window.firebaseAuth = firebaseAuth;

// Export db paths
export const fb = firebase;
export const dbRef = firebase.database();
export const userssRef = dbRef.ref('users');
export const todosRef = dbRef.ref('todos');
