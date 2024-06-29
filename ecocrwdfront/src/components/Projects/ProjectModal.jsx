import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProjectModal = ({ showModal, handleCloseModal, handleSave, initialData = {} }) => {
    
    const [name, setName] = useState('');
    const [typeId, setTypeId] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (initialData) {
          setName(initialData.name || '');
          setTypeId(initialData.type_id || '');
          setLocation(initialData.location || '');
          setDescription(initialData.description || '');
        }
      }, [initialData]);

    const handleSaveClick = () => {
        const projectData = {
          name,
          type_id,
          location,
          description,
        };
        handleSave(projectData);
      };

  return (
    <div className={`modal fade ${showModal ? 'show d-block' : ''}`} tabIndex="-1" style={{ display: showModal ? 'block' : 'none' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{initialData.name ? 'Edit Project' : 'Add New Project'}</h5>
            <button type="button" className="close" onClick={handleCloseModal}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="form-group">
              <label htmlFor="projectName">Name</label>
              <input
                type="text"
                className="form-control"
                id="projectName"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="projectTypeId">Type ID</label>
              <input
                type="text"
                className="form-control"
                id="projectTypeId"
                value={typeId}
                onChange={(e) => setTypeId(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="projectLocation">Location</label>
              <input
                type="text"
                className="form-control"
                id="projectLocation"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="projectDescription">Description</label>
              <input
                type="text"
                className="form-control"
                id="projectDescription"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Close</button>
            <button type="button" className="btn btn-primary" onClick={handleSaveClick}>Save</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectModal
