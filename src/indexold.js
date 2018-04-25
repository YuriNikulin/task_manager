import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import About from './app/components/About.js';
import Track from './app/components/Track.js';
import LogIn from './app/components/LogIn.js';
import Register from './app/components/Register.js';
import Home from './app/components/Home.js';
import CreateTask from './app/components/CreateTask.js';
import ProtectedRoute from './app/components/ProtectedRoute.js';

import './main.css';

import { syncHistoryWithStore } from 'react-router-redux';

import { composeWithDevTools } from 'redux-devtools-extension';

import App from './App';

import store from './app/redux';

const history = syncHistoryWithStore(hashHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <div className="tm-container">
        <Router history={history}>
            <Route path="/" component={App} />
            <Route path="/login" component={LogIn} />
            <Route path="/register" component={Register} />
            <ProtectedRoute path="/createtask" component={CreateTask} />
        </Router>
    </div>    
  </Provider>,
  document.getElementById('root')
);
