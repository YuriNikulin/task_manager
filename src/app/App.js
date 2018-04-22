import React, { Component } from 'react';
import { Link } from "react-router";
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './components/Home.js';
import Popup from './components/tools/Popup.js';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Navigation from './components/Navigation';
import Toolbar from './components/Toolbar.js';
import CreateTask from './components/CreateTask';

import { firebase } from './components/firebase';

import * as routes from './components/tools/routes.js';

import withAuthentication from './components/withAuthentication';
import AuthUserContext from './components/AuthUserContext';

const App = (props) => {
    const currentUser = firebase.auth.currentUser;

    return (  
        <Router>
            <div className="tm-container">
                <Navigation />
                <Toolbar />
                <ProtectedRoute
                    exact path={routes.HOME}
                    component={() => 
                        currentUser !== null ? 
                            <Home /> 
                            : 
                            <SignIn />
                    }
                />
                <Route
                    exact path={routes.SIGN_IN}
                    component={() => <SignIn />}
                />
                <Route
                    exact path={routes.SIGN_UP}
                    component={() => <SignUp />}
                />
                <ProtectedRoute
                    exact path={routes.CREATE_TASK}
                    component={() => <CreateTask />
                    }
                    currentUser={currentUser}
                />
            </div>
        </Router>
    )
}
export default withAuthentication(App);