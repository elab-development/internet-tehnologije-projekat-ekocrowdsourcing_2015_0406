import React, { useState } from 'react';
import ProjectCard from './Reusable/ProjectCard';
import ProjectModal from './Reusable/ProjectModal';
import ProjectPopup from './Reusable/ProjectPopup';
import axios from 'axios';

const Homepage = ({handleOpenDonationCreateModal, latestProjects, handleDelete, userRole, handleEdit, handleSave, handleCloseModal, showModal, formData, setFormData, types}) => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const handleCardClick = async (projectId) => {
    try {
      const response = await axios.get(`/api/projects/${projectId}`);
      setSelectedProject(response.data.Project);
      setShowPopup(true);
      console.log(response.data.Project);
    } catch (error) {
      console.error('Error fetching project data:', error);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedProject(null);
  };
  return (
    <div className="container mt-5">
      <h2>Check all available projects our projects page!</h2>
      <h2>Here's a preview of our latest projects: </h2>

      <div className="row">
        {latestProjects.map((proj) => (
          <div className="col-md-4" key={proj.id}>
            <ProjectCard project={proj} handleDelete={handleDelete} userRole={userRole} handleEdit={handleEdit} types={types} handleOpenDonationCreateModal={handleOpenDonationCreateModal}
            handleCardClick={handleCardClick}/>
          </div>
        ))}
      </div>
      <ProjectModal
        show={showModal}
        handleClose={handleCloseModal}
        handleSave={handleSave}
        formData={formData}
        setFormData={setFormData}
        types={types}
      />
            {selectedProject && showPopup && (
        <ProjectPopup project={selectedProject} handleClose={handleClosePopup}/>
      )}
    </div>
  )
}

export default Homepage
