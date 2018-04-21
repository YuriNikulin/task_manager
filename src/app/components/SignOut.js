import React from 'react';

import { auth } from './firebase';


export default class SignOut extends React.Component {
    render() {
        return (
            <a className="tm__signout" onClick={auth.doSignOut}>
                Sign out
            </a>
        )
    }
}