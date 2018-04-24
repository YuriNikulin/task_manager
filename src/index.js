import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import About from './app/components/About.js';
import Track from './app/components/Track.js';

import { syncHistoryWithStore } from 'react-router-redux';

import { composeWithDevTools } from 'redux-devtools-extension';

import App from './App';

import store from './app/redux';

const history = syncHistoryWithStore(hashHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
        <Route path="/" component={App} />
        <Route path="/about" component={About} />
        <Route path="/tracks/:id" component={Track} />
    </Router>
  </Provider>,
  document.getElementById('root')
);
