import React from 'react'
import TodoForm from '../pages/TodoForm'
import TodoList from '../pages/TodoList'
import "./bbot.css"

function ToDoComponent() {
  return (
    <div>
        <section style={{ backgroundColor: "black"}}>
  <div className="container py-5 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col">
        <div className="card" id="list1" style={{borderRadius: ".75rem", backgroundColor: "#eff1f2"}}>
          <div className="card-body py-4 px-4 px-md-5">

           <TodoForm/>

            <hr className="my-4"/>

            <TodoList/>

          </div>
        </div>
      </div>
    </div>
  </div>
</section>
    </div>
  )
}

export default ToDoComponent