import firebase from 'firebase/app'
import "firebase/firestore"
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDVf75VukOlCVwZtdyU_VWV6l3kSfZWEng",
    authDomain: "todo-7342a.firebaseapp.com",
    projectId: "todo-7342a",
    storageBucket: "todo-7342a.appspot.com",
    messagingSenderId: "696156358049",
    appId: "1:696156358049:web:8312a31b8202fdf048f7e0",
    measurementId: "G-4PC0B75DFH"
  };

export const Firebase=firebase.initializeApp(firebaseConfig);