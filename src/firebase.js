import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyA06E6ZUm5A61IW27Ww5CfdslUPrw0f7WY",
    authDomain: "crud-539c9.firebaseapp.com",
    projectId: "crud-539c9",
    storageBucket: "crud-539c9.appspot.com",
    messagingSenderId: "426439257120",
    appId: "1:426439257120:web:f575c37044ef53c8746045",
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
