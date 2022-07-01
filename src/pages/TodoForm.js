 import React, { useContext, useState } from 'react'
import { AppContext } from '../Context';
 
 function TodoForm() {
    const [input,setInput]=useState({
      todo:"",
      endDate:""
    });

    function handleChange(evt) {
      const value = evt.target.value;
      setInput({
        ...input,
        [evt.target.name]: value
      });
    }

    const {SaveTodo,getTodos}=useContext(AppContext)

    const handleFormSubmit=(e)=>{
        e.preventDefault();
        SaveTodo(input)
        getTodos()
        setInput({
          todo:"",
          endDate:""
        })
    }
   return (
     <div>
         <p className="h1 text-center mt-3 mb-4 pb-3 text-primary">
              <i className="fas fa-check-square me-1"></i>
              <u>My Todo-s</u>
            </p>

            <div className="pb-2">
              <div className="card">
                <div className="card-body">
                <form onSubmit={handleFormSubmit}>
                  <div className="d-flex flex-row align-items-center">
                    <input name='todo' value={input.todo} onChange={handleChange}
                     type="text" className="form-control form-control-lg" id="exampleFormControlInput1"
                      placeholder="Add new..."/>
                        <input type="date" name='endDate' value={input.endDate} onChange={handleChange}></input>
                    <div>
                      <button type="submit" className="btn btn-primary">Add</button>
                    </div>
                  </div>
                  </form>
                </div>
              </div>
            </div>
     </div>
   )
 }
 
 export default TodoForm