import React from 'react';
import { connect } from 'react-redux';
import { firebase } from '../services/firebase';

const Authorization = () => {
    console.log(firebase.auth);
}

export default Authorization;