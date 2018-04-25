import React from 'react';
import { auth}  from '../services/firebase/';

class LogOut extends React.Component {
    handleClick = () => {
        auth.doSignOut();
    }

    render() {
        return (
            <div>
                <button onClick={this.handleClick}>Log out</button>
            </div>
        )
    }
}

export default LogOut;