import React from 'react';
import { FaDonate, FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const ProjectCard = ({ project, handleDelete, userRole, handleEdit, handleOpenDonationCreateModal, handleCardClick }) => {

  const handleDonateClick = (e) => {
    e.stopPropagation(); // Prevent triggering the card click event
    handleOpenDonationCreateModal(project);
  };

  return (
    <div className="container mt-1">
      <div className="card w-100" onClick={() => handleCardClick(project.id)}>
        <img src="https://picsum.photos/200" className="card-img-top" alt="Project Image" style={{ height: '50%', objectFit: 'cover' }} />
        <div className="card-body">
          <h5 className="card-title"><strong>{project.name} </strong></h5>
          <p className="card-text"><strong>Type:</strong> {project.type}</p>
          <p className="card-text"><strong>Location:</strong> <span className="clamped-text-location">{project.location}</span></p>
          <p className="card-text"><strong>Description:</strong> <span className="clamped-text">{project.description}</span></p>
          <p className="card-text"><strong>Created by:</strong> {project.user}</p>
          <div className="row">
            <div className="col d-flex justify-content-center">
              <button className="btn btn-color text-white" onClick={handleDonateClick}><FaDonate /> Donate</button>
              {userRole === 'admin' ? (
                <div>
                  <button className="btn btn-warning ms-3" onClick={(e) => { e.stopPropagation(); handleEdit(project); }}><FaEdit /> Edit</button>
                  <button className="btn btn-danger ms-3" onClick={(e) => { e.stopPropagation(); handleDelete(project.id); }}><MdDelete /> Delete</button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectCard;
