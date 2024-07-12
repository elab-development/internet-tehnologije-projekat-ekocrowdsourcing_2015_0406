import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({addToken, fetchUserDetails}) => {
    const[userData, setUserData]=useState({
      email: "",
      password:"",
    });

    const navigate = useNavigate();


    const handleInput = (e) => {
      const newUserData = userData;
      newUserData[e.target.name] = e.target.value; //e.target.name (ovim dobijamo name atribut html elementa) moze biti  username ili pass 
      //sto se poklapa sa atributima userData objekta
      setUserData(newUserData);
    }

    const handleLogin = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post("api/login", userData);
        console.log(response.data);
        if(response.data.sucess == true){
          window.sessionStorage.setItem("auth_token", response.data.access_token); //upisuje kljuc
          fetchUserDetails(response.data.access_token);
          addToken(response.data.access_token);
          navigate("/");
        }
      } catch (error) {
        console.error(error);
      }
    }
  return (
     <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title text-center">Login</h3>
              <form onSubmit={handleLogin}>
                <div className="form-group">
                  <label htmlFor="email">Email address</label>
                  <input type="email" 
                  className="form-control" 
                  id="email" 
                  placeholder="Enter email" 
                  name="email"
                  onInput={handleInput}/>
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input type="password" 
                  className="form-control" 
                  id="password" 
                  placeholder="Enter your password" 
                  name="password"
                  onInput={handleInput}/>
                </div>
                <button type="submit" className="btn btn-color text-white btn-block mt-2">Login</button>
{/*                 <div className="text-center mt-3">
                  <a href="#" className="text-muted">Forgot password?</a>
                </div> */}
                <div className="text-center mt-3">
                  <a href="/register" className="text-muted">Register?</a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
