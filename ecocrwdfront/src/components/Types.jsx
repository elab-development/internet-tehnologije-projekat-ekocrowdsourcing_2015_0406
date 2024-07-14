import axios from 'axios';
import React, { useState } from 'react';

const Types = ({token, types, fetchTypes}) => {
    const [notification, setNotification] = useState({ message: '', visible: false });

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

    const handleSave = async () => { //data
        try {
          console.log("Token: ", token);
          await axios.post(`api/types/`, {//typeData poslati u requestu
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          fetchTypes();
          console.log(`New project type created successfully.`);
/*           setNotification(`${projects.find(proj => proj.id === projectId)?.name || 'Project'} was deleted`);
      
          setTimeout(() => {
            setNotification(null);
          }, 3000); */
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
