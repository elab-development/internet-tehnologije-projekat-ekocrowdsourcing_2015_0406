import React from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Outlet } from 'react-router-dom';

function NavBar({token}) {

  function handleLogout(){
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'api/logout/',
      headers: { 
        'Authorization': 'Bearer '+window.sessionStorage.getItem("auth_token")
      }
    };
  
    axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      window.sessionStorage.setItem("auth_token", null);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  return (
    <div> 
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">Navbar</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse show" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <a className="nav-link active" aria-current="page" href="/">Home</a>
            <a className="nav-link" href="/projects">Projects</a>
            <a className="nav-link" href="/donations">Donations</a>
            {token == null ? 
              (<a className="nav-link" href="/login">Log in/Register</a>) :
              (<a className="nav-link" href="/" onClick={handleLogout}>Log out</a>)
            }
            
          </div>
        </div>
      </div>
    </nav>
    <Outlet />
    </div>
  )
}

export default NavBar
