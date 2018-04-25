import React from 'react';
import { connect } from 'react-redux';

import Preloader from './Preloader.js';
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
import ListOfTasks from './ListOfTasks.js';

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

    componentDidMount() {
        this.props.onAuth();
    }

    componentDidUpdate() {
        if (this.state.isLoading && this.props.isLogged) {
            this.setState({
                isLoading: false
            });
        }
        if (!this.props.auth.isLogged && this.props.auth.currentUser === null) {
           this.props.router.push('/login');
        }
    }

    handleInputChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = () => {
        this.props.onAddTrack(this.state.song);
        this.setState({'song': ''})
    }

    handleRemove = (event) => {
        event.preventDefault();
        const elemId = parseInt(event.target.parentNode.id);
        this.props.onRemoveTrack(elemId);
    }

    handleFind = (event) => {
        this.props.onFindTrack(this.state.search);
    }
    render() {
        return(
            <div>
                <FirebaseComp func={this.props.onAuth}/>
                <Toolbar />
                <ListOfTasks />
            </div>
        )
    }
}

export default connect(
    (state, ownProps) => ({
        items: state.track.filter(item => item.name.includes(state.filter)),
        auth: state.auth,
        isLogged: state.auth.isLogged
    }),
    dispatch => ({
        onAddTrack: (data) => {
            dispatch(
                {
                    type: "ADD_TRACK",
                    payload: {
                        name: data,
                        id: Date.now().toString() 
                    }
                }
            )
        },
        onRemoveTrack: (trackId) => {
            dispatch(
                {
                    type: 'REMOVE_TRACK',
                    payload: trackId
                }
            )
        },
        onFindTrack: (name) => {
            dispatch(
                {
                    type: "FIND_TRACK", 
                    payload: name
                }
            )
        },
        onGetTracks: () => {
            dispatch(getTracks());
        },
        onAuth: () => {
            dispatch(actionAuth());
        }
    })
)(Home);