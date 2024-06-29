import React from 'react';
import ProjectCard from '../Reusable/ProjectCard';
import axios from 'axios';
import { useState, useEffect } from 'react';

const Projects = ({userRole, token, projects, fetchProjects, currentPage, setCurrentPage, totalPages}) => {


  const [currentProject, setCurrentProject] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [donationAmount, setDonationAmount] = useState('');
  const [donationEmail, setDonationEmail] = useState('');
  const [donationDescription, setDonationDescription] = useState('');
  const [successMessage, setSuccessMessage] = useState('');




  const handleDelete = async (projectId) => {
    try {
      await axios.delete(`api/projects/${projectId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }); // Send DELETE request to /api/projects/:id
      console.log(`Project with ID ${projectId} deleted successfully.`);
      fetchProjects();
    } catch (error) {
      console.error('Error deleting project:', error);
      // Handle error, e.g., show error message to user
    }
  };

  const handleShowModal = (project) => {
    setCurrentProject(project);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentProject(null);
  };

  const handleDonationChange = (e) => {
    setDonationAmount(e.target.value);
  };
  const handleDonationEmailChange = (e) => {
    setDonationEmail(e.target.value);
  };
  const handleDonationDescriptionChange = (e) => {
    setDonationDescription(e.target.value);
  };

  const handleSave = (projectData) => {
    if (currentProject) {
      // Update the existing project logic
    } else {
      // Add new project logic
    }
    setShowModal(false);
    setCurrentProject(null);
  };

  const handleDonate = () => {
    axios.post('api/create-donation/', {
      email: donationEmail,
      amount: donationAmount,
      description: donationDescription,
      project_id: currentProject.id,
    })
      .then((response) => {
        console.log(response.data);
        setSuccessMessage('Donation successful! Thank you for your support.');
        console.log(successMessage);
        setShowModal(false);
        // Clear the success message after 5 seconds
        setTimeout(() => {
          setSuccessMessage('');
        }, 5000);
      })
      .catch((error) => {
        console.error('Donation failed:', error);
      });
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
      <div className="row">
        {projects === null ? "No projects" : projects.map((proj)=>(
            <div className="col-md-4 mb-4" key={proj.id}>
            <ProjectCard project={proj} />
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


        {currentProject && (
        <div className={`modal fade ${showModal ? 'show d-block' : ''}`} tabIndex="-1" style={{ display: showModal ? 'block' : 'none' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Donate to {currentProject.title}</h5>
                <button type="button" className="close" onClick={handleCloseModal}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="donationEmail">Email</label>
                  <input
                    type="string"
                    className="form-control"
                    id="donationEmail"
                    value={donationEmail}
                    onChange={handleDonationEmailChange}
                  />
                  <label htmlFor="donationAmount">Donation Amount</label>
                  <input
                    type="number"
                    className="form-control"
                    id="donationAmount"
                    value={donationAmount}
                    onChange={handleDonationChange}
                  />
                  <label htmlFor="donationDescription">Description</label>
                  <input
                    type="string"
                    className="form-control"
                    id="donationDescription"
                    value={donationDescription}
                    onChange={handleDonationDescriptionChange}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Close</button>
                <button type="button" className="btn btn-primary" onClick={handleDonate}>Donate</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Projects
