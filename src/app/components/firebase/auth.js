import { auth } from './firebase';

export const doCreateUserWithEmailAndPassword = (email, password) =>
    auth.createUserWithEmailAndPassword(email, password);

export const doSignInWithEmailAndPassword = (email, password) =>
    auth.signInWithEmailAndPassword(email, password);

export const doSignOut = () => {
    auth.signOut().then(() => {
        console.log('signed out');
    }).catch(error => {
        console.log(error);
    })
}

export const doPasswordReset = (email) =>
    auth.sendPasswordResetEmail(email);

export const doPasswordUpdate = (password) =>
    auth.currentUser.updatePassword(password);                