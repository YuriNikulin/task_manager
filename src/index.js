import React from 'react';
import ReactDOM from 'react-dom';

import Rebase from 're-base';
import firebase from 'firebase';

import App from './app/App.js';
import registerServiceWorker from './registerServiceWorker';

import './design/css/main.css';

const root = document.getElementById('root');

ReactDOM.render(
    <App />,
    root
)
registerServiceWorker();
