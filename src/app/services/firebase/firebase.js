import * as firebase from 'firebase';
import { connect } from 'react-redux';
import actionAuth from '../../redux/actions/auth.js';
import React from 'react';
import store from '../../redux';
// import FirebaseComp from './FirebaseComp.js';

const config = {
    apiKey: "AIzaSyDHjkrP16-xFnBlfE-IYyYqwzfK9WH3cMg",
    authDomain: "task-manager-a7b8d.firebaseapp.com",
    databaseURL: "https://task-manager-a7b8d.firebaseio.com",
    projectId: "task-manager-a7b8d",
    storageBucket: "task-manager-a7b8d.appspot.com",
    messagingSenderId: "923584868298"
  };

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

const afterChange = (props) => {

}

const auth = firebase.auth();

class FirebaseComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    } 

    componentDidMount() {
        firebase.auth().onAuthStateChanged((data) => {
            store.dispatch({
                'type': 'AUTH_ACTION',
                'payload': {
                    'isLogged': !(data === null),
                    'currentUser': data
                }
            })
        })
    }

    render() {
        return (
            null
        )
    }
}

const db = firebase.database();

export {
    auth,
    FirebaseComp,
    db
}

export default FirebaseComp;
