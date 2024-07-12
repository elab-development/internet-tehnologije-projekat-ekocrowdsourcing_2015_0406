import React from 'react';
import OneDonation from './OneDonation';
import axios from 'axios';
import { useState, useEffect } from 'react';
import DonationModal from '../Reusable/DonationModal';

const Donations = ({projects, userRole, token, setShowDonationModal, showDonationModal, handleSaveDonation, handleOpenDonationEditModal, selectedProject, selectedDonation, setSelectedDonation, donationFormData, setDonationFormData }) => {

  const [donations, setDonations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [notification, setNotification] = useState({ message: '', visible: false });
  const [selectedProjects, setSelectedProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    console.log(searchTerm);
  };

  const handleProjectChange = (e) => { //parametar e - event checkbox
    const { value, checked } = e.target; // value - project name iz liste; checked je boolean
    setSelectedProjects((prevSelected) => //prevSelected je placeholder koji predstavlja prethodno stanje selectedProjects varijable
      checked ? [...prevSelected, value] : prevSelected.filter((project) => project !== value) //ako je checked, pravi novi niz sa svim prethodno oznacenim i value (ime projekta)
    );          //na taj nacin dodajem novi oznacen projekat na prethodno oznacene | prevSelected.filter pravi novi niz koji sadrzi projekte koji nisu jednaki "value" (value od "odznacenog")
  };


  const fetchDonations = async (page, email = '', projects = []) => { //async omogucava simultano izvrsavanje vise operacija
    try {
      const params = { page };

      if (email) {
        params.email = email; //ako postoji, dodaje email u params
      }
      if (projects.length > 0) { //ako projects niz ima bar jedan element dodaj project_name u params
        params.project_name = projects.join(','); //konvertuje u string razdvojen zarezom
      }
      const response = await axios.get(`/api/donations`, { params }); //await pauzira izvrsavanje dok se ne zavrsi request
       // await keyword ensures that the function waits for the request to complete before continuing
      console.log('API Donation Response:', response.data);
      setDonations(response.data.Donations);
      setTotalPages(response.data.meta.last_page);
    } catch (error) {
      console.error('Error fetching donations:', error);
    }
  };
    
  useEffect(() => {
    fetchDonations(currentPage, searchTerm, selectedProjects);
  }, [currentPage, searchTerm, selectedProjects, handleSaveDonation]);

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
      setCurrentPage(1);
    } catch (error) {
      console.error('Error deleting donation:', error);
      // Handle error, e.g., show error message to user
      setNotification({ message: 'Error deleting donation.', visible: true });
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
      <div className="justify-content-start mb-2">
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
          <table className="table table-success table-responsive table-striped">
            <thead>
              <tr>
                <th className="text-center">Email</th>
                <th className="text-center">Description</th>
                <th className="text-center">Project name</th>
                <th className="text-center">Amount</th>
                {userRole === 'admin' && (<th>Actions</th>)}
              </tr>
            </thead>
            <tbody>
              {donations === null ? (
                <tr>
                  <td colSpan="4" className="text-center">No donations found</td>
                </tr>
              ) : (
                donations.map((donation) => <OneDonation donation={donation} userRole={userRole} key={donation.id} handleDelete={handleDelete} handleOpenDonationEditModal={handleOpenDonationEditModal} />)
              )}
            </tbody>
          </table>
          
          <div className="d-flex justify-content-between mt-4">
            <button
              className="btn btn-color mb-3 text-white"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className='fw-bold text-white'>Page {currentPage} of {totalPages}</span>
            <button
              className="btn btn-color mb-3 text-white"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
        
        <div className="col-md-4">
          <div className="mb-4 text-white">
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
      {selectedDonation && (
        <DonationModal
        selectedProject={selectedDonation ? selectedDonation.project : selectedProject}
        show={showDonationModal}
        handleCloseDonationModal={setShowDonationModal}
        handleSaveDonation={handleSaveDonation}
        donationFormData={selectedDonation || donationFormData}
        setDonationFormData={selectedDonation ? setSelectedDonation : setDonationFormData}
      />
      )}
    </div>
  );
};

export default Donations