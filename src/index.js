import { ready } from "./js/utils";
import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.scss';
import App from './js/App';

ready(() => {
  ReactDOM.render(<App />, document.getElementById('root'));
})
