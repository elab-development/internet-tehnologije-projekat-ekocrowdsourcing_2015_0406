import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from './components/Reusable/NavBar';
import Projects from './components/Projects/Projects';
import Donations from './components/Donations/Donations';
import LoginPage from './components/Users/LoginPage';
import RegisterPage from './components/Users/RegisterPage'; 
import Homepage from './components/Homepage';
import Profile from './components/Users/Profile';
import DonationModal from './components/Reusable/DonationModal';
import UpdateUser from './components/Users/UpdateUser';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import UsersTable from './components/Users/UsersTable';
import Types from './components/Types';


function App() {

  const [token, setToken] = useState(sessionStorage.getItem('auth_token')); 
  const [userRole, setUserRole] = useState('');
  const [projects, setProjects] = useState([]);
  const [latestProjects, setLatestProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [notification, setNotification] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [types, setTypes] = useState([]);
  const [showDonationModal, setShowDonationModal] = useState(false);
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    type_id: '',
    location: '',
    description: '',
  });

  const [donationFormData, setDonationFormData] = useState({
    id: '',
    email: '',
    amount: '',
    description: '',
    project_id: '',
  });

  const handleOpenDonationCreateModal = (project) => {
    setSelectedProject(project);
    setSelectedDonation(null);
    setShowDonationModal(true);
  };


  const handleOpenDonationEditModal = (donation) => {
    setSelectedDonation(donation);
    setSelectedProject(donation.project);
    setDonationFormData({
      id:donation.id,
      email: donation.email,
      amount: donation.amount,
      description: donation.description,
      project_id: donation.project.id,
    });
    console.log(donation.project);
    setShowDonationModal(true);
    };


  const handleCloseDonationModal = () => {
    setSelectedProject(null);
    setSelectedDonation(null);
    setShowDonationModal(false);
    setDonationFormData({
      email: '',
      amount: 0,
      description: '',
    });
  };

  useEffect(() => {
    fetchTypes();
  }, [showModal]);

  useEffect(() => {
    fetchLatestProjects();
  }, []);

  useEffect(() => {
    fetchProjects(currentPage);
    fetchUserDetails(token);
  }, [currentPage, token]);

  const fetchTypes = async () => {
    if(token===null){
      return;
    }
    try {
      const response = await axios.get('/api/types', {
        headers: {
          Authorization: `Bearer ${token}`, // Use token from props or context
        },
      });
  
      if (response.data && response.data.Types) {
        const typesWithIds = response.data.Types.map((type) => ({
          id: type.id,
          name: type.name,
        }));
        setTypes(typesWithIds);
      } else {
        console.error('Invalid API response:', response.data);
      }
    } catch (error) {
      console.error('Error fetching types:', error);
    }
  };
  
  const fetchProjects = async (page) => {
    try {
      const response = await axios.get(`/api/projects?page=${page}`);
      setProjects(response.data.Projects);

      console.log("meta last page: ", response.data.meta.last_page);
      setTotalPages(response.data.meta.last_page);
      console.log("Total pages: ", totalPages);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };
  
  const fetchLatestProjects = async () => {
    try {
      const response = await axios.get(`/api/latest-projects`);
      setLatestProjects(response.data['3 latest projects:']);
    } catch (error) {
      console.error('Error fetching latest projects:', error);
    }
  };

  const fetchUserDetails = async (token) => {
    if(token===null){
      return;
    }
    try{
      const response = await axios.get('api/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserRole(response.data.User.type);
      console.log(response.data.User.type);

    } catch(error){
      console.error(error);
    }
  }

  const addToken = (auth_token) => {
    setToken(auth_token);
    fetchUserDetails(auth_token);
  };

  const navigate = useNavigate();
  
  const  handleLogout = async () => {
    const config = { 
      method: 'post',
      url: 'api/logout/',
      headers: { 
        'Authorization': "Bearer "+window.sessionStorage.getItem("auth_token")
      }
    };
    try {
      await axios.request(config);
      window.sessionStorage.removeItem("auth_token");
      setToken(null);
      setUserRole(null);
      navigate("/");
    } catch (error) {
      console.log(error);
    } finally {
      fetchProjects();
      fetchLatestProjects();
    }
}

const handleDelete = async (projectId) => {
  try {
    console.log("Token: ", token);
    await axios.delete(`api/delete-project/${projectId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    console.log(`Project with ID ${projectId} deleted successfully.`);
    setNotification(`${projects.find(proj => proj.id === projectId)?.name || 'Project'} was deleted`);

    setTimeout(() => {
      setNotification(null);
    }, 3000);

    const response = await axios.get(`/api/projects?page=${currentPage}`);
    setProjects(response.data.Projects);

    const latestResponse = await axios.get(`/api/projects?page=${totalPages}`);
    setLatestProjects(latestResponse.data.Projects.slice(-3));

  } catch (error) {
    console.error('Error deleting project:', error);
  }
};

const handleShowModal = () => {
  setShowModal(true);
};

const handleCloseModal = () => {
  setShowModal(false);
  setFormData({
    id: '',
    name: '',
    type_id: '',
    location: '',
    description: '',
  });
};
const handleEdit = (project) => {
  setFormData(project);
  handleShowModal();
};

const handleSave = async (formData) => {
  try {
    if (formData.id) {
      const { id, ...updateData } = formData; //nova const koja se pravi tako sto se uzima id iz formData. ... uzima ostatak formData od cega pravi updateData
      const response = await axios.patch(`/api/projects/${id}`, updateData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log('Project updated:', response.data);
    } else {
      const createData = { ...formData };
      delete createData.id; //brisem id da ga ne bih poslao post zahtevu
      const response = await axios.post('/api/projects', createData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log('Project saved:', response.data);
    }
    fetchProjects(currentPage);
    fetchLatestProjects();
    handleCloseModal();
    setNotification(`${formData.name} was created successfully`);

    setTimeout(() => {
      setNotification(null);
    }, 3000);
  } catch (error) {
    console.error('Error saving project:', error);
  }
};
const handleSaveDonation = async (formData) => {
  try {
    if (selectedDonation) {
      await axios.patch(`/api/donations/${selectedDonation.id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('Donation updated');
      setNotification(`Donation for "${selectedDonation.project}" was updated successfully. Page will refresh shortly to update.`);
    } else{
      await axios.post('/api/donations', formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setNotification(`Donation for "${selectedProject.name}" was created successfully`);
      
    }
      handleCloseDonationModal();
      setTimeout(() => {
          setNotification(null);
          window.location.reload();
      }, 3000);

      
  } catch (error) {
      console.error('Error saving donation:', error);
  }
};



  return (
    <> {/* useNavigate iz handleLogout je pravio problem. Kada imam BrowserRouter ovde ne radi, kada stavim u index.js a obrisem ovde - radi  */}
        <NavBar token={token} handleLogout={handleLogout} userRole={userRole}/>
        {notification && (
        <div className="alert alert-success" role="alert">
          {notification}
        </div>
      )}
        <Routes>
          <Route path="/" element={<Homepage types={types} latestProjects={latestProjects} userRole={userRole} token={token} handleDelete={handleDelete} handleEdit={handleEdit}
          handleSave={handleSave} handleCloseModal={handleCloseModal} handleShowModal={handleShowModal} showModal={showModal} formData={formData} setFormData={setFormData}
          handleOpenDonationCreateModal={handleOpenDonationCreateModal}/>} />

          <Route path="projects" 
          element={<Projects projects={projects} fetchProjects={fetchProjects} 
          currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} userRole={userRole} token={token} handleDelete={handleDelete} 
          handleCloseModal={handleCloseModal} handleEdit={handleEdit} handleSave={handleSave} handleShowModal={handleShowModal} formData={formData} setFormData={setFormData}
          showModal={showModal} types={types} handleOpenDonationCreateModal={handleOpenDonationCreateModal}/>}/>

          <Route path="donations" element={<Donations userRole={userRole} projects={projects} 
          token={token} fetchUserDetails={fetchUserDetails} setShowDonationModal={setShowDonationModal}  showDonationModal={showDonationModal}
          handleOpenDonationEditModal={handleOpenDonationEditModal} selectedProject={selectedProject}/>}/>

          <Route
            path="profile" 
            element={<Profile token={token}/>}
          /> 
          <Route
            path="login" 
            element={<LoginPage fetchUserDetails={fetchUserDetails} addToken={addToken}/>}
          /> 
          <Route
            path="register" 
            element={<RegisterPage/>}
          />
          <Route
            path="update-user" 
            element={<UpdateUser token={token}/>}
          />
          <Route
            path="users" 
            element={<UsersTable token={token}/>}
          />
          <Route
            path="types" 
            element={<Types token={token} types={types} fetchTypes={fetchTypes}/>}
          />

      </Routes>
      {showDonationModal && selectedProject  && (
            <DonationModal
                selectedProject={selectedProject}
                show={showDonationModal}
                handleCloseDonationModal={handleCloseDonationModal}
                handleSaveDonation={handleSaveDonation}
                donationFormData={donationFormData}
                setDonationFormData={setDonationFormData}
                selectedDonation={selectedDonation}
                />
        )}
    </>
  );
}

export default App;