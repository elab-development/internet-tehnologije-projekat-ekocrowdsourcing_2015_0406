import React from 'react';
import ProjectCard from '../Reusable/ProjectCard';
import ProjectModal from '../Reusable/ProjectModal';

const Projects = ({types, handleEdit, handleSave, handleCloseModal, handleShowModal,showModal,formData,setFormData, userRole, token, projects, currentPage, setCurrentPage, totalPages, handleDelete, handleOpenDonationCreateModal}) => {

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
      <button type="button" className="btn btn-primary" onClick={handleShowModal}>
      Add new project</button>}

        <ProjectModal show={showModal} handleClose={handleCloseModal} handleSave={handleSave} token={token} types={types} formData={formData} setFormData={setFormData}/>
      <div className="row">

        {projects === null ? "No projects" : projects.map((proj)=>(
            <div className="col-md-4 mb-4" key={proj.id}>
            <ProjectCard project={proj} handleDelete={handleDelete} userRole={userRole} handleEdit={handleEdit} handleOpenDonationCreateModal={handleOpenDonationCreateModal}/>
            </div>
        ))}

      </div>

      <div className="row justify-content-between">
        <div className="col-1">
          <button 
            className="btn btn-primary mb-3" 
            onClick={handlePrevPage} 
            disabled={currentPage === 1}>
            &lt;
          </button> 
        </div>
        <div className="col-1 text-end">
          <button 
            className="btn btn-primary mb-3" 
            onClick={handleNextPage} 
            disabled={currentPage === totalPages}>
            &gt;
          </button>
        </div>
      </div>
    </div>
  )
}

export default Projects
