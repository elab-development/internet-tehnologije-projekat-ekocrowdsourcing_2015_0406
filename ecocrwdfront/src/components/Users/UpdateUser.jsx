import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';


const UpdateUser = ({token}) => {
    //pojasnjenje You use useLocation whenever you need to access the current URL or the state passed via the navigate function.
    const navigate = useNavigate();
    const location = useLocation();
    const userData = location.state?.user || null; //objekat koji sam poslao preko useNavigate na prethodnoj strani ili null

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    useEffect(() => {
        if (userData !== null) {
          setFormData({
            name: userData.name || '',
            email: userData.email || '',
            password: '' // Usually, you don't populate passwords for security reasons
          })
        }else{
            fetchProfile(token);
        }
      }, [token, userData]);




    const fetchProfile = async (token) => {
        try {
            const response = await axios.get('api/profile', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const userData = response.data.User;
            setFormData({
                name: userData.name,
                email: userData.email,
                password: ''
            });
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password } = formData;
        const dataToSend = { name, email }; //pravim niz koji nema password
        if (password) dataToSend.password = password; //ako ima pass dodaj ga u dataToSend 
        try {
            const response = await axios.patch('api/update-user', dataToSend, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response.data);
            navigate("/profile")
        } catch (error) {
            console.error(error);
        }
    };
    const handleSubmitUpdate = async (e) => {
        e.preventDefault();
        const { name, email, password } = formData;
        const dataToSend = { name, email }; //pravim niz koji nema password
        if (password) dataToSend.password = password; //ako ima pass dodaj ga u dataToSend 
        try {
            const response = await axios.patch(`api/update-user/${userData.id}`, dataToSend, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response.data);
            navigate("/users")
        } catch (error) {
            console.error(error);
        }
    };

  return (
    <div className="container mt-5">
        <h2>Update User Information</h2>
        <form onSubmit={userData === null ? handleSubmit : handleSubmitUpdate}>
            <div className="form-group mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange}/>
            </div>
            <div className="form-group mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} />
            </div>
            <div className="form-group mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" name="password" 
                placeholder="Enter new password if you want to change it" value={formData.password} onChange={handleChange} />
            </div>
            <button type="submit" className="btn btn-color">Submit</button>
        </form>
    </div>

  )
}

export default UpdateUser
