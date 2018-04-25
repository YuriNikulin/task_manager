import * as firebase from 'firebase';
import { connect } from 'react-redux';
import actionAuth from '../../redux/actions/auth.js';
import React from 'react';
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
    console.log(props);
}

const auth = firebase.auth();

class FirebaseComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    } 

    componentDidMount() {
        firebase.auth().onAuthStateChanged(() => {
            this.props.func();
        })
    }

    render() {
        return (
            <div>test</div>
        )
    }
}
// const db = firebase.database();

export {
    auth,
    FirebaseComp,
    // db
}


export default FirebaseComp;
