import React from 'react';

import { auth } from './firebase';


const SignOut = (props) => {
    return (
        <a className={"tm__signout " + props.className} onClick={auth.doSignOut}>
            Sign out
        </a>
    )
}

export default SignOut;