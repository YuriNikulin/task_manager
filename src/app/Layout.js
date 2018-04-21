import React, { Component } from 'react';
import { Link } from "react-router";
import Popup from './components/tools/Popup.js';
import Login from './components/Login.js';

export default class Layout extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: false
        };
        this.switchLogin = this.switchLogin.bind(this);
    }
    switchLogin() {
        console.log('hey');
        this.setState(prevState => ({
            isAuthenticated: !prevState.isAuthenticated
        }))
    }

    render() {
        let isAuthenticated = this.state.isAuthenticated;
        let switchLogin = this.switchLogin;
        console.log(isAuthenticated);
        return (
            <div>
                {isAuthenticated ?
                    <Popup>
                        Wow! You are authenticated!
                    </Popup> : 
                    <Login /> 
                }
                <button onClick={switchLogin}>Click me</button> 
            </div>
        );
    }
}