import React, { useState } from 'react';
import { FaDonate } from "react-icons/fa";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import axios from 'axios';

const OneProject = ({ project, userRole, handleShowModal }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="col-lg-4 col-md-6 mb-4 mt-4">
      <div className="card project-card">
        <img src="https://picsum.photos/200" className="card-img-top" alt="Project Image" />
        <div className="card-body">
          <h5 className="card-title">{project.title}</h5>
          <p className="card-text">Tip: {project.type}</p>
          <p className="card-text">Lokacija: {project.location}</p>
          <p className="card-text">Opis projekta: {project.description}</p>
          <p className="card-text">Napravio: {project.user}</p>
          <div className="d-flex justify-content-center">
            <button className="btn mr-2" onClick={() => handleShowModal(project)}>
              <FaDonate />
            </button>
            <button className="btn ml-2" onClick={toggleFavorite}>
              {isFavorite ? <MdFavorite /> : <MdFavoriteBorder />}
            </button>
            {userRole === 'admin' && (
              <>
                <button className="btn ml-2">Update</button>
                <button className="btn ml-2">Delete</button>
              </>
            )}
          </div>
        </div>
      </div>

    </div>
  );
};

export default OneProject;
