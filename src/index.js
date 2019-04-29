import { ready } from "./js/utils";
import React, { Component } from "react";
import ReactDOM from "react-dom";

import * as firebase from "firebase/app";
import { firebaseProject, listenForAuthChanges } from "./js/firebase-setup";

const Menu = ({ title, onClick }) => {
  return (
    <nav className="navbar navbar-light bg-light">
      <a className="navbar-brand">Firebase Demo</a>
      <button
        className="btn btn-outline-success"
        type="submit"
        onClick={onClick}
      >
        {title}
      </button>
    </nav>
  );
};

class FirebaseApp extends Component {
  constructor() {
    super();
    this.state = {
      authState: null
    };

    listenForAuthChanges(authState => {
      this.setState({ authState });
    });
  }

  signIn() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  }

  signOut() {
    firebase.auth().signOut();
  }

  render() {
    const isLoggedIn = !!this.state.authState;
    const status = isLoggedIn ? this.state.authState.userName : "firebase demo";

    return (
      <>
        <Menu
          title={isLoggedIn ? "Logout" : "Login"}
          onClick={isLoggedIn ? this.signOut : this.signIn}
        />
        <div className="container">
          <p>Hello {status}!</p>
        </div>
      </>
    );
  }
}

ready(() => {
  // const database = firebaseProject.database();
  // console.log(database);

  ReactDOM.render(<FirebaseApp />, document.getElementById("root"));
});
