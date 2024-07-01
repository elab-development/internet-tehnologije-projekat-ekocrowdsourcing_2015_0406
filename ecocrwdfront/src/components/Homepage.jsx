import React from 'react';
import ProjectCard from './Reusable/ProjectCard';
import ProjectModal from './Reusable/ProjectModal';

const Homepage = ({handleOpenDonationModal, latestProjects, handleDelete, userRole, token, handleEdit, handleSave, handleCloseModal, handleShowModal, showModal, formData, setFormData, types}) => {

  return (
    <div className="container mt-5">
      <h2>3 latest projects on our platform:</h2>
      <div className="row">
        {latestProjects.map((proj) => (
          <div className="col-md-4" key={proj.id}>
            <ProjectCard project={proj} handleDelete={handleDelete} userRole={userRole} handleEdit={handleEdit} types={types} handleOpenDonationModal={handleOpenDonationModal}/>
          </div>
        ))}
      </div>
      <ProjectModal
        show={showModal}
        handleClose={handleCloseModal}
        handleSave={handleSave}
        formData={formData}
        setFormData={setFormData}
        types={[]}
      />
    </div>
  )
}

export default Homepage
