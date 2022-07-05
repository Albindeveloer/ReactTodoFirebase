import React, { useContext, useState } from 'react'
import "./SignUp.css"
import { AppContext } from '../../Context';
import { useNavigate } from 'react-router-dom';
function SignUpPage() {
  const [sinput,setSinput]= useState({
    firstName:"",
    phone:"",
    email:"",
    pwd:""

  })
  const {Signup}=useContext(AppContext)
  const Navigate=useNavigate()

  function handleChange(evt) {
    const value = evt.target.value;
    setSinput({
      ...sinput,
      [evt.target.name]: value
    });
  }
  const handleFormSubmit=(e)=>{
    e.preventDefault();
    console.log("submitted")
    Signup(sinput);
    console.log("uploded")
  }
  return (
    <div>
        <section className="vh-100 bg-image"
  >
  <div className="mask d-flex align-items-center h-100 gradient-custom-3">
    <div className="container h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-12 col-md-9 col-lg-7 col-xl-6">
          <div className="card" style={{borderRadius: "15px"}}>
            <div className="card-body p-5">
              <h2 className="text-uppercase text-center mb-5">Create an account</h2>

              <form onSubmit={handleFormSubmit}>

                <div className="form-outline mb-4">
                  <input type="text" name='firstName' value={sinput.firstName} onChange={handleChange} className="form-control form-control-lg" />
                  <label className="form-label" >Your Name</label>
                </div>

                <div className="form-outline mb-4">
                  <input type="text" name='phone' value={sinput.phone} onChange={handleChange}  className="form-control form-control-lg" />
                  <label className="form-label" >Phone</label>
                </div>

                <div className="form-outline mb-4">
                  <input type="email" name='email' value={sinput.email} onChange={handleChange}  className="form-control form-control-lg" />
                  <label className="form-label" >Your Email</label>
                </div>

                <div className="form-outline mb-4">
                  <input type="password" name='pwd' value={sinput.pwd} onChange={handleChange}  className="form-control form-control-lg" />
                  <label className="form-label">Password</label>
                </div>


                <div className="d-flex justify-content-center">
                  <button type="submit"
                    className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Register</button>
                </div>

                <p className="text-center text-muted mt-5 mb-0">Have already an account? <a href="#!"
                    className="fw-bold text-body"><u onClick={()=>Navigate("/Login")}>Login here</u></a></p>

              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
    </div>
  )
}

export default SignUpPage