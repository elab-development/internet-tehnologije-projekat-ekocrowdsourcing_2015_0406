import React from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Outlet } from 'react-router-dom';

function NavBar({token, handleLogout}) {

  return (
    <div> 
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" href="#">Navbar</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse show" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
            <Link className="nav-link" to="/projects">Projects</Link>
            <Link className="nav-link" to="/donations">Donations</Link>
            {token == null ? 
              (<Link className="nav-link" to="/login">Log in/Register</Link>) :
              (<Link className="nav-link" to="/" onClick={(e) => { e.preventDefault(); handleLogout(); }}>Log out</Link>) 
              //prevent default sprecava da ne prebaci usera na default putanju, to regulisem u handlelogout
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
