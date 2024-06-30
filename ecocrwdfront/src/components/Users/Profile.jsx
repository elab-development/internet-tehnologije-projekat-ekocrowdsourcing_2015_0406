import axios from 'axios';
import React from 'react'
import { useState, useEffect } from 'react';

const Profile = ({token}) => {
    const[userData, setUserData]=useState({
        name: "",
        email: "",
        role:"",
    });

    const fetchProfile = (token) => {
        if(token===null){
          return;
        }
        axios.get('api/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUserData(response.data.User);
          console.log(response.data.User);
        })
        .catch((error) => {
          console.error(error);
        });
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
        </div>
      </div>
    </div>
  )
}

export default Profile
