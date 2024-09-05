import axios from 'axios';
import React from 'react'
import { useState, useEffect } from 'react';
import { FaUserEdit } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Profile = ({token}) => {
    const[userData, setUserData]=useState({
        name: "",
        email: "",
        role:"",
    });

    const fetchProfile = async (token) => {
        if(token===null){
          return;
        }
        try {
          const response = await axios.get('api/profile', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUserData(response.data.User);
          console.log(response.data.User);
        } catch (error) {
          console.error(error);
        }
    }

    useEffect(() => {
        fetchProfile(token)
      }, [token]);

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card" style={{ width: '18rem' }}>
        <div className="card-body">
          <h5 className="card-title">User Information</h5>
          <p className="card-text"><strong>Name:</strong> {userData.name} </p>
          <p className="card-text"><strong>Email:</strong> {userData.email}</p>
          <p className="card-text"><strong>Role:</strong> {userData.type}</p>
            <div className="d-flex justify-content-center">
            <Link to="/update-user" className="btn btn-color text-white ms-3 me-3 mb-2">
                  <FaUserEdit /> Update
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
