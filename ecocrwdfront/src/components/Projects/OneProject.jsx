import React, { useState } from 'react';
import { FaDonate } from "react-icons/fa";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import axios from 'axios';

const OneProject = ({ project, userRole, handleShowModal, handleDelete }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    console.log(userRole);
  };

  return (
    <div className="col-lg-3 col-md-6 mb-4 mt-4">
      <div className="card project-card h-100">
        <img src="https://picsum.photos/200" className="card-img-top" alt="Project Image" />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{project.title}</h5>
          <p className="card-text">Tip: {project.type}</p>
          <p className="card-text">Lokacija: {project.location}</p>
          <p className="card-text">Opis projekta: {project.description}</p>
          <p className="card-text">Napravio: {project.user}</p>
          <div className="mt-auto">
            <div className="d-flex justify-content-between">
              <button className="btn" onClick={() => handleShowModal(project)}>
                <FaDonate />
              </button>
              <button className="btn" onClick={toggleFavorite}>
                {isFavorite ? <MdFavorite /> : <MdFavoriteBorder />}
              </button>
              {(userRole === 'admin' || userRole === 'mod') && (
                <>
                  <button className="btn" onClick={() => handleShowModal(project.id)}><MdEdit /></button>
                  <button className="btn" onClick={() => handleDelete(project.id)}><MdDelete /></button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OneProject;
