import React from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory, hashHistory } from 'react-router';

import Preloader from './app/components/Preloader.js';
import getTracks from './app/redux/actions/track.js';
import actionAuth from './app/redux/actions/auth.js';
import LogIn from './app/components/LogIn.js';
import { firebase } from './app/services/firebase';

import { Redirect } from 'react-router';

import Authorization from './app/components/Authorization.js';
import { syncHistoryWithStore } from 'react-router-redux';
import store from './app/redux';
import Home from './app/components/Home.js';

import { FirebaseComp } from './app/services/firebase/firebase.js';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'song': '',
            'search': '',
            'isLoading': !this.props.isLogged,
            'isLogged': this.props.auth.isLogged
        }
    }

    componentDidMount() {
        this.props.onAuth();
        this.setState({
            'isLoading': !this.props.isLogged
        })
    }

    componentDidUpdate() {
        if (!this.props.auth.isLogged) {
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
        const items = this.props.items;
        const isLoading = !this.props.auth.isLogged;
        return (
            <div>
                <FirebaseComp func={this.props.onAuth}/>
                {isLoading ? <Preloader /> : <Home />}
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
)(App);