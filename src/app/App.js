import React, { Component } from 'react';
import { Link } from "react-router";
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom';
import Popup from './components/tools/Popup.js';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Navigation from './components/Navigation';

import { firebase } from './components/firebase';

import * as routes from './components/tools/routes.js';

export default class App extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            authUser: null
        };
    }

    componentDidMount() {
        firebase.auth.onAuthStateChanged(authUser => {
            authUser
                ? this.setState({
                    authUser
                })
                : this.setState({
                    authUser: null
                })
        })
    }

    render() {
        return (
            <Router>
                <div>
                    <Navigation authUser={this.state.authUser} />
                    <Route
                        exact path={routes.HOME}
                        component={() => <SignIn />}
                    />
                    <Route
                        exact path={routes.SIGN_IN}
                        component={() => <SignIn />}
                    />
                    <Route
                        exact path={routes.SIGN_UP}
                        component={() => <SignUp />}
                    />
                </div>
            </Router>
        );
    }
}