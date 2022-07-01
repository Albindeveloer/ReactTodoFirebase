import React, { useState } from 'react'

function Header({SaveTodo}) {
    const [input,setInput]=useState();

    const handleFormSubmit=(e)=>{
        e.preventDefault();
        SaveTodo(input)
        setInput("")
    }
  return (
    <div className='TForm'>
         <form onSubmit={handleFormSubmit}>
      <label>Enter ToDo
        <input value={input} onChange={(e)=>{setInput(e.target.value)}} type="text" 
        placeholder="What do u need to do today?"/>
      </label><br></br>
      <button style={{backgroundColor:"red"}} type='submit'>Submit</button>
    </form>
    <p>{input}</p>
    <p>https://dev.to/kizmelvin/store-and-retrieve-data-in-firebase-cloud-storage-with-react-js-fff</p>
    </div>
  )
}

export default Header