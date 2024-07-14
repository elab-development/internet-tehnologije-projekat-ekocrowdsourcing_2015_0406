import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaUserEdit } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const UsersTable = ({token}) => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchUsers = async (token) =>{
        try{
            const response = await axios.get(`/api/users`, {
                headers: {
                  'Authorization': `Bearer ${token}`
                }
            });
            setUsers(response.data.Users);
        }catch (error){
            console.error(error);
        }
    }
    useEffect(()=>{
        fetchUsers(token);
    },[token]);

    const handleDelete = async (userId) => {
        try {
          console.log("Token: ", token);
          await axios.delete(`api/users/${userId}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          console.log(`User with ID ${userId} deleted successfully.`);
          /* setNotification(`${projects.find(proj => proj.id === projectId)?.name || 'Project'} was deleted`);
      
          setTimeout(() => {
            setNotification(null);
          }, 3000); */
        
            fetchUsers(token);
        } catch (error) {
          console.error('Error deleting user:', error);
        }
      };

      const navigate = useNavigate();

      const handleUpdateClick = (user) => {
        navigate('/update-user', { state: { user } });
      };

  return (
    <div className="container mt-4">
        <h2 className="mr-3 text-center">List of all users:</h2>
        <div className="row justify-content-center">
        <div className="col-md-8">
          <table className="table table-success table-responsive table-striped">
            <thead>
              <tr>
                <th className="text-center">name</th>
                <th className="text-center">Email</th>
                <th className="text-center">Type</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users === null ? (
                <tr>
                  <td colSpan="4" className="text-center">No users found</td>
                </tr>
                ) : (
                users.map((user) => <tr key={user.id}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.type}</td>
                        <td>
                            <div>
                            <button onClick={() => handleUpdateClick(user)} className="btn btn-color btn-sm text-white">
                                <FaUserEdit /> Update
                            </button>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleDelete(user.id)} 
                                >
                                    Delete
                                </button>
                            </div>
                        </td>
                </tr>)
              )}
            </tbody>
          </table>
          </div>
        </div>
    </div>
  )
}

export default UsersTable
