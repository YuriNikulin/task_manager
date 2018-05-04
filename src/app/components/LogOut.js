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

    componentDidUpdate() {
        if (!this.props.auth.isLogged) {
            history.push('/login');
        }
    }

    render() {
        return (
            <a className={this.props.className} onClick={this.handleClick}>Log out</a>
        )
    }
}

const mapStateToProps = (state) => {
    return ({
        'routing': state.routing,
        'auth': state.auth
    })
}

export default connect(mapStateToProps)(LogOut);