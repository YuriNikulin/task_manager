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
        const currentUser = firebase.auth.currentUser;
        const isLogged = currentUser !== null;
        dispatch({
            type: 'AUTH_ACTION',
            payload: {
                isLogged: isLogged,
                currentUser: currentUser
            }
        });
    })
    
}

export default Auth;