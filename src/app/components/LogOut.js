import React from 'react';
import { auth}  from '../services/firebase/';

class LogOut extends React.Component {
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