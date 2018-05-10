import React from 'react';
import { auth}  from '../services/firebase/';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import store from '../redux';
import { syncHistoryWithStore } from 'react-router-redux';
const history = syncHistoryWithStore(hashHistory, store);

class LogOut extends React.Component {
    constructor(props) {
        super(props);
    }

    handleClick = () => {
        auth.doSignOut();
    }

    render() {
        return (
            <a className={this.props.className} onClick={this.handleClick}>Log out</a>
        )
    }
}

export default LogOut;