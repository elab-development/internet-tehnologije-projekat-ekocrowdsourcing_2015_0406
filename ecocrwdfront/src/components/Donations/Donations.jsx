import React from 'react';
import OneDonation from './OneDonation';
import axios from 'axios';
import { useState, useEffect } from 'react';
import EditDonationModal from './EditDonationModal';

const Donations = ({projects, userRole, token}) => {

  const [donations, setDonations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [notification, setNotification] = useState({ message: '', visible: false });
  const [selectedProjects, setSelectedProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedDonation, setSelectedDonation] = useState(null);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    console.log(searchTerm);
  };

  const handleProjectChange = (e) => {
    const { value, checked } = e.target;
    setSelectedProjects((prevSelected) =>
      checked ? [...prevSelected, value] : prevSelected.filter((project) => project !== value)
    );
  };



  const fetchDonations = async (page, email = '', projects = []) => {
    try {
      let params = { page };

      if (email) {
        params.email = email;
      }
      if (projects.length > 0) {
        params.project_name = projects.join(',');
      }
      const response = await axios.get(`/api/donations`, { params });
       // await keyword ensures that the function waits for the request to complete before continuing
      console.log('API Donation Response:', response.data); // Log the API response
      setDonations(response.data.Donations);
      setTotalPages(response.data.meta.last_page);
    } catch (error) {
      console.error('Error fetching donations:', error);
    }
  };
    
  useEffect(() => {
    fetchDonations(currentPage, searchTerm, selectedProjects);
  }, [currentPage, searchTerm, selectedProjects]);

  const handlePreviousPage = () => { 
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handleDelete = async (donationId) => {
    try {
      await axios.delete(`api/donations/${donationId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }); // Send DELETE request to /api/projects/:id
      console.log(`Donation with ID ${donationId} deleted successfully.`);
      setNotification({ message: 'Donation deleted successfully.', visible: true });
      setTimeout(() => {
        setNotification({ message: '', visible: false });
      }, 3000);
      fetchDonations();
    } catch (error) {
      console.error('Error deleting donation:', error);
      // Handle error, e.g., show error message to user
      setNotification({ message: 'Error deleting donation.', visible: true });
      setTimeout(() => {
        setNotification({ message: '', visible: false });
      }, 3000);
    }
  };

  const handleShowModal = (donationId) => {
    const donation = donations.find((d) => d.id === donationId);
    setSelectedDonation(donation);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedDonation(null);
  };

  const handleUpdateDonation = async (donationId, updatedData) => {
    try {
      await axios.put(`api/donations/${donationId}`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setNotification({ message: 'Donation updated successfully.', visible: true });
      setTimeout(() => {
        setNotification({ message: '', visible: false });
      }, 3000);
      fetchDonations();
      handleCloseModal();
    } catch (error) {
      console.error('Error updating donation:', error);
      setNotification({ message: 'Error updating donation.', visible: true });
      setTimeout(() => {
        setNotification({ message: '', visible: false });
      }, 3000);
    }
  };


  return (
    <div className="container mt-4">
      {notification.visible && (
            <div className="alert alert-info" role="alert">
              {notification.message}
            </div>
      )}
      <div className="d-flex flex-row justify-content-start mb-2">
        <h2 className="mr-3">Donations</h2>
        <input
          type="text"
          className="form-control w-25 ml-3"
          placeholder="Search by email"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      
      <div className="row">
        <div className="col-md-8">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Email</th>
                <th>Description</th>
                <th>Project name</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {donations === null ? (
                <tr>
                  <td colSpan="4" className="text-center">No donations found</td>
                </tr>
              ) : (
                donations.map((donation) => <OneDonation donation={donation} userRole={userRole} key={donation.id} handleDelete={handleDelete} handleShowModal={handleShowModal} />)
              )}
            </tbody>
          </table>
          
          <div className="d-flex justify-content-between mt-4">
            <button
              className="btn btn-primary"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button
              className="btn btn-primary"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
        
        <div className="col-md-4">
          <div className="mb-4">
            <h5>Filter by Project</h5>
            <div className="form-check">
              {projects.map((project) => (
                <div key={project.id}>
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id={`project-${project.id}`}
                    value={project.name}
                    onChange={handleProjectChange}
                  />
                  <label className="form-check-label" htmlFor={`project-${project.id}`}>
                    {project.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {isModalVisible && (
        <EditDonationModal
          donation={selectedDonation}
          isVisible={isModalVisible}
          handleClose={handleCloseModal}
          handleUpdate={handleUpdateDonation}
        />
      )}
    </div>
  );
};

export default Donations
