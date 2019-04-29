import React, { Component } from "react";
import ReactDOM from "react-dom";

import * as firebase from "firebase/app";
import { firebaseProject, listenForAuthChanges } from "./js/firebase-setup";
import { ready } from "./js/utils";
import "./css/FirebaseApp.scss";

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
      authState: null,
      todos: []
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

  saveTodo(text, done = false, callback = () => {}) {
    return firebase
      .firestore()
      .collection("todos")
      .add({
        text,
        done,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })
      .then(resp => {
        callback();
      })
      .catch(function(error) {
        console.error("Error writing new message to Firebase Database", error);
        callback(error);
      });
  }

  onFilterSwitch() {
    console.log("on filter switch");
  }

  onAddTodo(ev) {
    ev.preventDefault();
    console.log("on add todo");
  }

  render() {
    const isLoggedIn = !!this.state.authState;
    const status = isLoggedIn ? this.state.authState.userName : "firebase demo";

    const TodoList = ({ todos }) => {
      if (!todos || !todos.length) {
        return <div className="empty-list">please add some todo's</div>;
      }
      return todos.map((todo, index) => {
        return (
          <div key={index} className="custom-control custom-checkbox todo-text">
            <input
              type="checkbox"
              className="custom-control-input"
              id={`customCheck${index}`}
            />
            <label className="custom-control-label" for={`customCheck${index}`}>
              {todo.status ? "<s>" + todo.value + "</s>" : todo.value}
            </label>
          </div>
        );
      });
    };

    return (
      <>
        <Menu
          title={isLoggedIn ? "Logout" : "Login"}
          onClick={isLoggedIn ? this.signOut : this.signIn}
        />
        <div className="container">
          <p>Hello {status}!</p>

          <div className="card" data-item="todo1">
            <div
              className="alert alert-warning alert-dismissible fade d-none"
              role="alert"
            >
              <span className="alert-message" />
              <button type="button" className="close" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <div className="card-body">
              <h1 className="text-center">add todo's</h1>

              <form onSubmit={this.onAddTodo}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    id="new-todo"
                    placeholder="new todo"
                  />
                </div>
              </form>

              <ul className="list-group list-group-flush todo-list" />
              <TodoList todos={this.state.todos} />
              <div
                className="btn-group btn-group-toggle btn-toolbar"
                data-toggle="buttons"
              >
                <label className="btn btn-secondary active">
                  <input
                    type="radio"
                    name="options"
                    id="option1"
                    autoComplete="off"
                    onClick={this.onFilterSwitch}
                  />{" "}
                  Todo
                </label>
                <label className="btn btn-secondary">
                  <input
                    type="radio"
                    name="options"
                    id="option2"
                    autoComplete="off"
                    onClick={this.onFilterSwitch}
                  />{" "}
                  All
                </label>
                <label className="btn btn-secondary">
                  <input
                    type="radio"
                    name="options"
                    id="option3"
                    autoComplete="off"
                    onClick={this.onFilterSwitch}
                  />{" "}
                  Done
                </label>
              </div>
            </div>
          </div>
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
