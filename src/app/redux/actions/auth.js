import { firebase, auth } from '../../services/firebase';

let mockApiData = [
    {
        id: 600,
        name: 'Enter Sandman'
    },
    {
        id: 601,
        name: 'Welcome Home'
    }
];

const Auth = () => dispatch => {
    setTimeout(() => {
        const isLogged = firebase.auth.currentUser !== null;
        dispatch({
            type: 'AUTH_ACTION',
            payload: isLogged
        });
    })
    
}

export default Auth;