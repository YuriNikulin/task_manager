import React from 'react';
import { connect } from 'react-redux';

import Preloader from './app/components/Preloader.js';
import getTracks from './app/redux/actions/track.js';
import actionAuth from './app/redux/actions/auth.js';
import LogIn from './app/components/LogIn.js';
import { firebase } from './app/services/firebase';

import Authorization from './app/components/Authorization.js';
import { syncHistoryWithStore } from 'react-router-redux';
import Home from './app/components/Home.js';
import Task from './app/components/Task.js';

import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import Register from './app/components/Register.js';
import ProtectedRoute from './app/components/ProtectedRoute.js';
import CreateTask from './app/components/CreateTask.js';

import store from './app/redux';
import { FirebaseComp } from './app/services/firebase/firebase.js';

const history = syncHistoryWithStore(hashHistory, store);
class App extends React.Component {
    render() {
        return(
            <div className="tm-container">
                <Router history={history}>
                    <Route path="/" component={Home} />
                    <Route path="/register" component={Register} />
                    <Route path="/createtask" component={CreateTask} />
                    <Route path="/task:id" component={Task} />
                    <Route path="/login" component={LogIn} />
                </Router>
            </div> 
        )
    }
}

export default App;