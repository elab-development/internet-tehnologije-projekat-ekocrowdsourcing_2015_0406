import React from 'react';
import OneProject from './OneProject';
import axios from 'axios';
import { useState } from 'react';

const Projects = ({projects, userRole }) => {

  const [currentProject, setCurrentProject] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [donationAmount, setDonationAmount] = useState('');
  const [donationEmail, setDonationEmail] = useState('');
  const [donationDescription, setDonationDescription] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleShowModal = (project) => {
    setCurrentProject(project);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
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
  
  return (
    <div className="container">
        <div className="row">
        {projects === null ? "No projects" : projects.map((proj)=>
            <OneProject project={proj} key={proj.id} userRole={userRole} handleShowModal={handleShowModal}/>
        )}
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
