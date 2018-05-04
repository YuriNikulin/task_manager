import React from 'react';
import { connect } from 'react-redux';

import getTracks from '../redux/actions/track.js';
import actionAuth from '../redux/actions/auth.js';
import LogIn from './LogIn.js';
import { firebase } from '../services/firebase';

import { Redirect } from 'react-router';

import Authorization from './Authorization.js';
import { syncHistoryWithStore } from 'react-router-redux';

import { Router, Route,  hashHistory } from 'react-router';
import Register from './Register.js';
import ProtectedRoute from './ProtectedRoute.js';
import CreateTask from './CreateTask.js';
import Toolbar from './Toolbar.js';
import ListOfTasks from './ListOfTasks/ListOfTasks.js';

import store from '../redux';
import { FirebaseComp } from '../services/firebase/firebase.js';

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
                <ListOfTasks />
            </div>
        )
    }
}

export default Home;

// export default connect(
//     (state, ownProps) => ({

//     }),
//     dispatch => ({
//         onAuth: () => {
//             dispatch(actionAuth());
//         }
//     })
// )(Home);