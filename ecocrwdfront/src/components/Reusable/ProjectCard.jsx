import React from 'react';


const ProjectCard = ({show, project, handleDelete, userRole, handleEdit, handleOpenDonationModal}) => {
  const handleDonateClick = () => {
    handleOpenDonationModal(project);
  };

  return (
    <div className="container mt-1">
    <div className="card w-100">

      <img src="https://picsum.photos/400" className="card-img-top" alt="Project Image" style={{ height: '50%', objectFit: 'cover' }} />

      <div className="card-body">
        <h5 className="card-title"><strong>{project.name} </strong></h5>
        <p className="card-text"><strong>Type:</strong> {project.type}</p>
        <p className="card-text"><strong>Location:</strong> {project.location}</p>
        <p className="card-text"><strong>Description:</strong> {project.description}</p>
        <p className="card-text"><strong>Created by:</strong> {project.user}</p>

        <button className="btn btn-primary" onClick={handleDonateClick}>Donate Button</button>
        {userRole === 'admin' ? (
          <div>
            <button className="btn btn-warning" onClick={() => handleEdit(project)}>Edit Button</button>
            <button className="btn btn-danger" onClick={() => handleDelete(project.id)}>Delete Button</button>
          </div>
        ) : null}
      </div>
    </div>
  </div>
  )
}

export default ProjectCard
