
import { useEffect, useState } from 'react';
import './App.css';
import { Firebase } from './components/Firebase';
import Header from './components/Header';
import ToDoComponent from './components/ToDoComponent';
import { AppContext } from './Context';
import {Route, Routes, useNavigate} from "react-router-dom"
import SignUpPage from './components/SignUpPage';
import LoginPage from './components/LoginPage';




function App() {
  const [todos,setTodos]=useState([])
  const [userId,setUserId]=useState(null);
  const Navigate= useNavigate();

  useEffect(()=>{
    getTodos();
    console.log("current user id is",userId)
    Firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        var uid = user.uid;
        setUserId(uid)
        console.log("user id now",userId)
        // ...
      } else {
        // User is signed out
        // ...
        console.log("logged out")
      }
    });
    
   
  },[userId])
   
  const Signup=(input)=>{
    Firebase.auth().createUserWithEmailAndPassword(input.email, input.pwd)
    .then((userCredential) => {
      // Signed in 
      var user = userCredential.user;
      console.log(user)
      setUserId(userCredential.user.uid)

      // ...
    
      Firebase.firestore().collection("users").add({
        id:userCredential.user.uid,
        username:input.firstName,
        phone:input.phone
      }).then(()=>{
        Navigate("Home")
      })
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage)
      alert(errorMessage)
      // ..
    });
  }

  const Login=(input)=>{
    Firebase.auth().signInWithEmailAndPassword(input.email, input.pwd)
  .then((userCredential) => {
    // Signed in
   
    setUserId(userCredential.user.uid)
    console.log("id fter login",userId)
    // ...
  }).then(()=>{
    Navigate("Home")
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    alert(errorMessage)
  });
  }

  const Logout=()=>{
    Firebase.auth().signOut().then(() => {
      console.log("signed out")
      Navigate("Login")
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  }

  const SaveTodo=(input)=>{
    console.log("multuiple inputs",input);
    Firebase.firestore().collection("todos").add({
      
      item:input.todo,
      d:Date.now(),
      endDate:input.endDate,
      userid:userId
    });
  }

  const getTodos=()=>{
    Firebase.firestore().collection("todos").where("userid", "==", userId).get().then((snapshot)=>{
      const saveFirebaseTodos=[];
      snapshot.forEach((doc)=>{
        saveFirebaseTodos.push(
          {
            todo:doc.data(),
            id:doc.id
          });
        //console.log(obj.data())
        
      });
      console.log("saved to todos from firebase",saveFirebaseTodos)
      setTodos(saveFirebaseTodos)
      

    })
  }

  const deleteOldTodos=()=>{
    var dateObj = new Date();
var month = dateObj.getUTCMonth() + 1; //months from 1-12
var day = dateObj.getUTCDate();
var year = dateObj.getUTCFullYear();

var newdate = year + "-" + month + "-" + day;
console.log("newdate is",newdate)
    const coversations = Firebase.firestore().collection('todos')
.where('endDate', '<=', newdate)


coversations.get().then(function(querySnapshot) {
  querySnapshot.forEach(function(doc) {
    doc.ref.delete();
  });
});
  }

  return (
    <div className="App">
      {/* <h1>react app for toApp with fireBase</h1>
      <Header SaveTodo={SaveTodo}/> */}
      
      <AppContext.Provider value={{SaveTodo,getTodos,todos,Signup,Login,userId,Logout}}>
       <Routes> 
      
      <Route element={<SignUpPage/>} path="/"></Route>
      <Route element={<LoginPage/>} path='Login'/>
      <Route element={<ToDoComponent />} path='Home'/>


      </Routes>

      </AppContext.Provider>
      
    </div>
  );
}

export default App;
