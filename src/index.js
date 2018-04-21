import React from 'react';
import ReactDOM from 'react-dom';

import Rebase from 're-base';
import firebase from 'firebase';

import './design/css/main.css';

import Layout from './app/Layout.js';

import registerServiceWorker from './registerServiceWorker';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

const root = document.getElementById('root');

class App extends React.Component {
    constructor() {
        super();
    }
    
    render() {
        return (
            <div className="tm-main-container">
                <Router history={hashHistory}>
                    <Route path="/" component={Layout}>
                    </Route>
                </Router>
            </div>
        )    
    }
}

ReactDOM.render(
    <App />,
    root
)
registerServiceWorker();
