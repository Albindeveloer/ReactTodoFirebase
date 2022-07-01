
import { useEffect, useState } from 'react';
import './App.css';
import { Firebase } from './components/Firebase';
import Header from './components/Header';
import ToDoComponent from './components/ToDoComponent';
import { AppContext } from './Context';



function App() {
  const [todos,setTodos]=useState([])

  useEffect(()=>{
    getTodos();
   
  },[])

  const SaveTodo=(input)=>{
    console.log("multuiple inputs",input);
    Firebase.firestore().collection("todos").add({
      
      item:input.todo,
      d:Date.now(),
      endDate:input.endDate
    });
  }

  const getTodos=()=>{
    Firebase.firestore().collection("todos").get().then((snapshot)=>{
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
      <AppContext.Provider value={{SaveTodo,getTodos,todos}}>
      <ToDoComponent />

      </AppContext.Provider>
    </div>
  );
}

export default App;
