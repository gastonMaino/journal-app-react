import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyBTtZRgAufHwkuth3Jo-pnTTKl1tBrK92o",
    authDomain: "journal-react-redux.firebaseapp.com",
    projectId: "journal-react-redux",
    storageBucket: "journal-react-redux.appspot.com",
    messagingSenderId: "189133948252",
    appId: "1:189133948252:web:99aaaedf42fdb97243ed99"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
    db,
    googleAuthProvider,
    firebase
}