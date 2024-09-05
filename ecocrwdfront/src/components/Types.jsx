import axios from 'axios';
import React, { useState } from 'react';
import { IoMdAddCircle } from "react-icons/io";

const Types = ({token, types, fetchTypes, userRole}) => {
    const [notification, setNotification] = useState({ message: '', visible: false });
    const [inputField, setInputField] = useState('');
    const handleDelete = async (typeId) => {
        try {
          console.log("Token: ", token);
          await axios.delete(`api/types/${typeId}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          console.log(`Type with ID ${typeId} deleted successfully.`);
          setNotification({ message: 'Prroject type deleted successfully.', visible: true });
          setTimeout(() => {
            setNotification({ message: '', visible: false });
          }, 3000);
          fetchTypes();
         /* setNotification(`${projects.find(proj => proj.id === projectId)?.name || 'Project'} was deleted`);
      
          setTimeout(() => {
            setNotification(null);
          }, 3000); */
        } catch (error) {
          console.error('Error deleting project type:', error);
        }
    };

    const handleInputChange = (event) => {
      setInputField(event.target.value); // Update the state with the current input value
      console.log('Current value:', event.target.value);
    };

    const handleSave = async () => {
        try {
          console.log("Token: ", token);
          console.log("Input field: ", inputField);
          const requestData = {
            name: inputField,
          };
          await axios.post(`api/types/`, requestData,{//typeData poslati u requestu
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          fetchTypes();
          console.log(`New project type created successfully.`);
        } catch (error) {
          console.error('Error creating project type:', error);
        }
      };

  return (
    <div className="container mt-4">
        {notification.visible && (
            <div className="alert alert-info" role="alert">
              {notification.message}
            </div>
        )}

        <h2 className="mr-3 text-center">Project types:</h2>
        <div className="row justify-content-center">

          <div className="container d-flex justify-content-center align-items-center mb-3 mt-2">
            <input type="text" id="typeInput" placeholder="Enter type name to add" onChange={handleInputChange} value={inputField}/>
            <button id="saveButton" className="btn btn-color text-white ms-1" onClick={handleSave}><IoMdAddCircle/>ADD</button>
          </div>

        <div className="col-md-6">
          <table className="table table-success table-responsive table-striped text-center">
            <thead>
              <tr>
                <th className="text-center">Name</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {types === null ? (
                <tr>
                  <td colSpan="4" className="text-center">No project types found</td>
                </tr>
                ) : (
                    types.map((type) => <tr key={type.id}>
                        <td>{type.name}</td>
                        <td>
                            <div>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleDelete(type.id)} 
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

export default Types
