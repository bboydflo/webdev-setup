import React, { Component } from "react";
import ReactDOM from "react-dom";

import {
  signIn,
  signOut,
  getDatabase,
  listenForAuthChanges,
  generateTimestamp
} from "./js/firebase-setup";
import { ready } from "./js/utils";
import { Todo } from "./js/todo";
import "./css/FirebaseApp.scss";

let database = null;

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

const TodoList = ({ todos }) => {
  if (!todos || !todos.length) {
    return <div className="empty-list">please add some todo's</div>;
  }
  return todos.map(todo => {
    return (
      <div key={todo.id} className="custom-control custom-checkbox todo-text">
        <input
          type="checkbox"
          className="custom-control-input"
          id={`customCheck${todo.id}`}
        />
        <label
          className="custom-control-label"
          htmlFor={`customCheck${todo.id}`}
        >
          {todo.done ? "<s>" + todo.text + "</s>" : todo.text}
        </label>
      </div>
    );
  });
};

class FirebaseApp extends Component {
  constructor() {
    super();

    this.state = {
      authState: null,
      todos: [],
      todoInputValue: ""
    };

    listenForAuthChanges(authState => {
      // get database only when we're authenticated and database reference is null
      if (!!authState && !database) {
        database = getDatabase();
      } else {
        database = null;
      }
      this.setState({ authState });
    });
  }

  saveTodo(todo) {
    if (!database) {
      return;
    }
    return database()
      .collection("todos")
      .add({
        ...todo,
        timestamp: generateTimestamp
      });
  }

  onFilterSwitch() {
    console.log("on filter switch");
  }

  onAddTodo = ev => {
    ev.preventDefault();
    const currentTodoInputValue = this.state.todoInputValue;

    if (!currentTodoInputValue) {
      return;
    }

    const todo = Todo(currentTodoInputValue);

    // update first in the state
    this.setState(
      {
        todos: [...this.state.todos, todo],
        todoInputValue: ""
      },
      () => {
        this.saveTodo(todo)
          .then(result => {
            console.log(result);
            // actually update update state
          })
          .catch(err => {
            console.error(err);

            // TODO: in case of error reverse the last operation
          });
      }
    );
  };

  updateCurrentTodoInputValue = ev => {
    this.setState({ todoInputValue: ev.target.value });
  };

  render() {
    const { todos, authState, todoInputValue } = this.state;
    const isLoggedIn = !!authState;
    const status = isLoggedIn ? authState.userName : "firebase demo";

    return (
      <>
        <Menu
          title={isLoggedIn ? "Logout" : "Login"}
          onClick={isLoggedIn ? signOut : signIn}
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
                    value={todoInputValue}
                    onChange={this.updateCurrentTodoInputValue}
                  />
                </div>
              </form>

              <ul className="list-group list-group-flush todo-list" />
              <TodoList todos={todos} />
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
