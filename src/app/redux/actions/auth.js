import { firebase, auth } from '../../services/firebase';

const Auth = () => (dispatch) => {
    const currentUser = firebase.auth.currentUser;
    const isLogged = currentUser !== null;
    dispatch({
        type: 'AUTH_ACTION',
        payload: {
            isLogged: isLogged,
            currentUser: currentUser
        }
    });
    
}

export const AuthAlternate = () => {
    const currentUser = firebase.auth.currentUser;
    const isLogged = currentUser !== null;
    return (
        {
            'type': 'AUTH_ACTION',
            payload: {
                isLogged: isLogged,
                currentUser: currentUser
            }
        }
    )
}

export default Auth;