// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

const _onAuthStateChangedObservers = [];

const firebaseConfig = {
  apiKey: "AIzaSyC76nSpYoSG1JKUlmOmcHFU17TyFrb_Yj8",
  authDomain: "fcc-todo-project.firebaseapp.com",
  databaseURL: "https://fcc-todo-project.firebaseio.com",
  projectId: "fcc-todo-project",
  storageBucket: "fcc-todo-project.appspot.com",
  messagingSenderId: "989312702341"
};

// Initialize Firebase
const firebaseProject = firebase.initializeApp(firebaseConfig);

// listen for auth state changes
firebase.auth().onAuthStateChanged(authStateObserver);

// Returns the signed-in user's profile Pic URL.
function getProfilePicUrl() {
  return firebase.auth().currentUser.photoURL;
}

// Returns the signed-in user's display name.
function getUserName() {
  return firebase.auth().currentUser.displayName;
}

// Returns true if a user is signed-in.
function isUserSignedIn() {
  return !!firebase.auth().currentUser;
}

// Triggers when the auth state change for instance when the user signs-in or signs-out.
function authStateObserver(user) {
  // no listeners
  if (_onAuthStateChangedObservers.length === 0) {
    return;
  }
  if (user) {
    // https://firebase.google.com/docs/auth/web/start?authuser=0
    // var uid = user.uid;
    // var email = user.email;
    // var photoURL = user.photoURL;
    // var displayName = user.displayName;

    // User is signed in!
    // const userName = getUserName();
    // const profilePicUrl = getProfilePicUrl();

    // notify every listener about login state
    _onAuthStateChangedObservers.map(callback => {
      callback({
        userId: user.uid,
        userName: user.displayName,
        profilePicUrl: user.photoURL
      });
    });
  } else {
    // notify every listener about logout state
    _onAuthStateChangedObservers.map(callback => {
      callback();
    });
  }
}

function listenForAuthChanges(callback) {
  _onAuthStateChangedObservers.push(callback);
}

function getDatabase() {
  return firebase.firestore();
}

function signIn() {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider);
}

function signOut() {
  firebase.auth().signOut();
}

function generateTimeStamp() {
  return firebase.firestore.FieldValue.serverTimestamp();
}

function saveData(collectionName, data) {
  // Add a new message entry to the Firebase database.
  return firebase
    .firestore()
    .collection(collectionName)
    .add({
      ...data,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
}

export {
  signIn,
  signOut,
  firebaseProject,
  listenForAuthChanges,
  isUserSignedIn,
  getDatabase,
  generateTimeStamp,
  saveData
};
