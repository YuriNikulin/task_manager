import { firebase, auth } from '../../services/firebase';

const AuthAlternate = () => {
    const currentUser = firebase.auth.currentUser;
    const isLogged = currentUser !== null;
    return (
        {
            type: 'AUTH_ACTION',
            payload: {
                isLogged: isLogged,
                currentUser: currentUser
            }
        }
    )
};

export default AuthAlternate;