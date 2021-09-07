import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


const firebaseConfig = {
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    projectId: process.env.REACT_APP_PROJECTID,
    storageBucket: process.env.REACT_APP_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_APPID
};

// const firebaseConfigTesting = {
//     apiKey: "AIzaSyD8CMn3hgAWM6iqD2cWa5Ymnz4Lt4b0ulg",
//     authDomain: "firestore-prueba-config.firebaseapp.com",
//     projectId: "firestore-prueba-config",
//     storageBucket: "firestore-prueba-config.appspot.com",
//     messagingSenderId: "675184789765",
//     appId: "1:675184789765:web:7c97cb34b7aa1c881b4f6c"
// };


// if (process.env.NODE_ENV === 'test') {
//     firebase.initializeApp(firebaseConfigTesting);
    
// } else {
//     firebase.initializeApp(firebaseConfig);
    
// }


firebase.initializeApp(firebaseConfig);



const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
    db,
    googleAuthProvider,
    firebase
}