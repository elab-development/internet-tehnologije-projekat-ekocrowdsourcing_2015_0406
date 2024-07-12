import React from 'react'
import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { CgProfile, CgLogOut, CgHome  } from "react-icons/cg";
import { FaRegListAlt } from "react-icons/fa";
import logo from '../../pics/logo.png'

const NavBar = ({token, handleLogout, userRole}) => {

  return (
    <div> 
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid justify-content-start">
        <Link className="navbar-brand" to="/">
          <img src={logo} className="logo" style={{ width: '30px', height: '30px' }}/>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse show flex-grow-0" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link className="nav-link" aria-current="page" to="/"><CgHome /> Home</Link>
            <Link className="nav-link" to="/projects">Projects</Link>
            <Link className="nav-link" to="/donations"><FaRegListAlt /> Donations</Link>
            {token == null ? 
              (<Link className="nav-link" to="/login">Log in/Register</Link>) :
              (<Link className="nav-link" to="/profile"><CgProfile /> Profile</Link>
              )
            }
            {userRole === 'admin' && (
              <Link className="nav-link" to="/users"><CgProfile /> Users list</Link>
              )}
            {token != null && (
              <ul className="navbar-nav"> {/*ml-auto bio ovde */}
                <li className="nav-item">
                  <Link className="nav-link" to="/" onClick={(e) => { e.preventDefault(); handleLogout(); }}> <CgLogOut /> Log out</Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </nav>
    <Outlet />
    </div>
  )
}

export default NavBar
