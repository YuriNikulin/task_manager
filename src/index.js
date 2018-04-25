import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import About from './app/components/About.js';
import Track from './app/components/Track.js';
import LogIn from './app/components/LogIn.js';
import Register from './app/components/Register.js';


import { syncHistoryWithStore } from 'react-router-redux';

import { composeWithDevTools } from 'redux-devtools-extension';

import App from './App';

import store from './app/redux';

const history = syncHistoryWithStore(hashHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <div>
        <Router history={history}>
            <Route path="/" component={App} />
            <Route path="/login" component={LogIn} />
            <Route path="/register" component={Register} />
            <Route path="/about" component={About} />
            <Route path="/tracks/:id" component={Track} />
        </Router>
    </div>    
  </Provider>,
  document.getElementById('root')
);
