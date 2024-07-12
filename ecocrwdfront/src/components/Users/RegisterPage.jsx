import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {

    const[userData, setUserData]=useState({
        name: "",
        email: "",
        password:"",
        type: ""
      });
    
      const navigate = useNavigate();

      const handleInput = async (e) =>{
        const newUserData = userData;
        newUserData[e.target.name]=e.target.value;
        setUserData(newUserData);
        //console.log(userData);
      }
    
      const handleRegister = async (e) =>{
        e.preventDefault();
        try {
          const response = await axios.post("api/register", userData);
          console.log(response.data);
          navigate("/login");
        } catch (error) {
          console.error(error);
        }
      }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title text-center">Register</h3>
              <form onSubmit={handleRegister}>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input type="text" className="form-control" id="name" name="name" onInput={handleInput} required />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email address</label>
                  <input type="email" className="form-control" id="email" name="email" onInput={handleInput} required />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input type="password" className="form-control" id="password" name="password" onInput={handleInput} required />
                </div>
                <button type="submit" className="btn btn-color text-white btn-block mt-2">Register</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage
