import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyDHjkrP16-xFnBlfE-IYyYqwzfK9WH3cMg",
    authDomain: "task-manager-a7b8d.firebaseapp.com",
    databaseURL: "https://task-manager-a7b8d.firebaseio.com",
    projectId: "task-manager-a7b8d",
    storageBucket: "task-manager-a7b8d.appspot.com",
    messagingSenderId: "923584868298"
  };

if (!firebase.apps.length) {
    firebase.initializeApp(config);
} 

const auth = firebase.auth();
const db = firebase.database();

export {
    auth,
    db
}