import React, { Component } from "react";
import { hot } from "react-hot-loader/root";

class BootstrapApp extends Component {
  render() {
    return (
      <div className="bootstrap-component">
        <button type="button" className="btn btn-default btn-lg">
          <span className="glyphicon glyphicon-star" aria-hidden="true" /> Star
        </button>
        <br />
        <div className="alert alert-danger" role="alert">
          <span
            className="glyphicon glyphicon-exclamation-sign"
            aria-hidden="true"
          />
          <span className="sr-only">Error:</span>
          Enter a valid email address Florin!
        </div>
      </div>
    );
  }
}

export default hot(BootstrapApp);
