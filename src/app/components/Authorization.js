import React from 'react';

import { firebase } from '../services/firebase';

const Authorization = () => {
    console.log(firebase.auth);
}

export default connected(
        (state) => ({

        }),
        dispatch => ({
            onChange:
        })
    )(Authorization);