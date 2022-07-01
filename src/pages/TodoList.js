import React, { useContext } from 'react'
import { Firebase } from '../components/Firebase';
import { AppContext } from '../Context';

function TodoList() {
  const {todos,getTodos}=useContext(AppContext)

  const deleteTodo=(docId)=>{
    Firebase.firestore().collection("todos").doc(docId).delete().then(() => {
      console.log("Document successfully deleted!");
      getTodos();
  }).catch((error) => {
      console.error("Error removing document: ", error);
  });
  }
 
  return (
    <div>
        <div className="d-flex justify-content-end align-items-center mb-4 pt-2 pb-3">
          
              <p className="small mb-0 me-2 text-muted">Filter</p>
              <select className="select">
                <option value="1">All</option>
                <option value="2">Completed</option>
                <option value="3">Active</option>
                <option value="4">Has due date</option>
              </select  >
              <p className="small mb-0 ms-4 me-2 text-muted">Sort</p>
              <select className="select">
                <option value="1">Added date</option>
                <option value="2">Due date</option>
              </select>
              <a href="#!" style={{color: "#23af89", dataMdbToggle:"tooltip", title:"Ascending"}}><i
                  className="fas fa-sort-amount-down-alt ms-2"></i></a>
            </div>

              

              {

                todos.map((obj)=>{
                  
                  const date=(new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(obj.todo.d));
                  console.log("from firebase",obj);
                  return(
                    <div>
                    <ul className="list-group list-group-horizontal rounded-0">
              <li
                className="list-group-item d-flex align-items-center ps-0 pe-3 py-1 rounded-0 border-0 bg-transparent">
                <div className="form-check">
                  <input className="form-check-input me-0" type="checkbox" value="" id="flexCheckChecked2"
                    aria-label="..." />
                </div>
              </li>
              <li
                className="list-group-item px-3 py-1 d-flex align-items-center flex-grow-1 border-0 bg-transparent">
                <p  className="lead fw-normal text-capitalize mb-0">{obj.todo.item}</p>
              </li>
              <li className="list-group-item px-3 py-1 d-flex align-items-center border-0 bg-transparent">
                <div
                  className="py-2 px-3 me-2 border border-warning rounded-3 d-flex align-items-center bg-light">
                  <p className="small mb-0">
                    <a href="#!" data-mdb-toggle="tooltip" title="Due on date">
                      <i className="fas fa-hourglass-half me-2 text-warning"></i>
                    </a>
                      {obj.todo.endDate}
                  </p>
                </div>
              </li>
              <li className="list-group-item ps-3 pe-0 py-1 rounded-0 border-0 bg-transparent">
                <div className="d-flex flex-row justify-content-end mb-1">
                  <a href="#!" className="text-info" data-mdb-toggle="tooltip" title="Edit todo"><i
                      className="fas fa-pencil-alt me-3"></i></a>
                  <button onClick={()=>deleteTodo(obj.id)} className="text-danger" data-mdb-toggle="tooltip" title="Delete todo"><i
                      className="fas fa-trash-alt"></i></button>
                </div>
                <div className="text-end text-muted">
                  <a href="#!" className="text-muted" data-mdb-toggle="tooltip" title="Created date">
                    <p className="small mb-0"><i className="fas fa-info-circle me-2"></i>{date}</p>
                  </a>
                </div>
              </li>
            </ul>

               </div>
               )
              })
            }
        
    </div>
  )
}

export default TodoList