import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import ProjectCard from '../Reusable/ProjectCard';
import ProjectModal from '../Reusable/ProjectModal';
import ProjectPopup from '../Reusable/ProjectPopup';
import { IoMdAddCircle } from "react-icons/io";

const Projects = ({projects, fetchProjects, types, handleEdit, handleSave, handleCloseModal, handleShowModal,showModal,formData,setFormData, userRole, token, currentPage, setCurrentPage, totalPages, handleDelete, handleOpenDonationCreateModal}) => {
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

  useEffect(()=>{
    fetchProjects(currentPage);
  },[currentPage]);

  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedProject(null);
  };
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  
  
  return (
    <div className="container mt-3">
      <h2>Projects on our platform:</h2>
      {token === null? "Log in to create a project!" : 
      <button type="button" className="btn btn-color text-white ms-3 mb-3 mt-2" onClick={handleShowModal}>
      <IoMdAddCircle /> Add new project</button>}

        <ProjectModal show={showModal} handleClose={handleCloseModal} handleSave={handleSave} token={token} types={types} formData={formData} setFormData={setFormData}/>
      <div className="row">

        {(!projects  || projects.length === 0) ? "No projects" : projects.map((proj)=>(
            <div className="col-md-4 mb-4" key={proj.id}>
            <ProjectCard project={proj} handleDelete={handleDelete} userRole={userRole} handleEdit={handleEdit} handleOpenDonationCreateModal={handleOpenDonationCreateModal} 
            handleCardClick={handleCardClick}/>
            </div>
        ))}

      </div>

      <div className="row justify-content-between">
        <div className="col-1">
          <button 
            className="btn btn-color mb-3 text-white" 
            onClick={handlePrevPage} 
            disabled={currentPage === 1}>
            &lt;
          </button> 
        </div>
        
        <div className="col-1 text-end">
          <button 
            className="btn btn-color mb-3 text-white" 
            onClick={handleNextPage} 
            disabled={currentPage === totalPages}>
            &gt;
          </button>
        </div>
      </div>
      {selectedProject && showPopup && (
        <ProjectPopup project={selectedProject} handleClose={handleClosePopup}/>
      )}
    </div>
  )
}

export default Projects
