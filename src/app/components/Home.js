import React from 'react';
import { connect } from 'react-redux';

import actionAuth from '../redux/actions/auth.js';
import LogIn from './LogIn.js';
import { firebase } from '../services/firebase';

import { Redirect } from 'react-router';

import { syncHistoryWithStore } from 'react-router-redux';

import { Router, Route,  hashHistory } from 'react-router';
import Register from './Register.js';

import CreateTask from './CreateTask.js';
import Toolbar from './Toolbar.js';
import ListOfTasks from './ListOfTasks/ListOfTasks.js';

import store from '../redux';
import { FirebaseComp } from '../services/firebase/firebase.js';

import { Advanced } from './Advanced.js';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'song': '',
            'search': '',
            'isLoading': true,
            'isLogged': false
        }
    }

    componentDidUpdate() {

    }

    render() {
        return(
            <div>
                <Toolbar listOfTasks={true}/>
                
                <Advanced />
            </div>
        )
    }
}

export default Home;
