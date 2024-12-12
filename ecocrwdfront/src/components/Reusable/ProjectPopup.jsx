import React, { useEffect } from 'react';
import { FaDonate, FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaWindowClose } from "react-icons/fa";

const ProjectPopup = ({ project, handleClose }) => {

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {   // Cleanup function
      document.removeEventListener('keydown', handleKeyDown);
    };
    }, [handleClose]);

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button className="popup-close pb-3 pt-3" onClick={handleClose} style={{ color: 'red' }}><FaWindowClose /></button>
        <img src="https://picsum.photos/400" alt="Project Image" className="popup-img" style={{ height: '65%', objectFit: 'cover' }}/>
        <h2>{project.name}</h2>
        <p><strong>Type:</strong> {project.type}</p>
        <p><strong>Location:</strong> {project.location}</p>
        <p><strong>Description:</strong> {project.description}</p>
        <p><strong>Created by:</strong> {project.user}</p>
      </div>
    </div>
  )
}

export default ProjectPopup
