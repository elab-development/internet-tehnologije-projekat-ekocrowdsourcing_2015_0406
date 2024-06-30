import './App.css';
import NavBar from './components/Reusable/NavBar';
import Projects from './components/Projects/Projects';
import ProjectCard from './components/Reusable/ProjectCard';
import Donations from './components/Donations/Donations';
import LoginPage from './components/Users/LoginPage';
import { useState, useEffect } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RegisterPage from './components/Users/RegisterPage';
import Homepage from './components/Homepage';
import Profile from './components/Users/Profile';

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

  useEffect(() => {
    fetchTypes();
    fetchProjects(currentPage).then(() => {
      fetchLatestProjects();
    });
    fetchUserDetails(token);
  }, [currentPage]);

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
      return Promise.resolve(); 
    } catch (error) {
      console.error('Error fetching projects:', error);
      return Promise.reject(error); 
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

  const fetchUserDetails = (token) => {
    if(token===null){
      return;
    }
    axios.get('api/profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      setUserRole(response.data.User.type);
      console.log(response.data.User.type);
    })
    .catch((error) => {
      console.error(error);
    });
  }

  const addToken = (auth_token) => {
    setToken(auth_token);
    fetchUserDetails(auth_token);
  };

  function handleLogout(){
    let config = {
      method: 'post',
      url: 'api/logout/',
      headers: { 
        'Authorization': "Bearer "+window.sessionStorage.getItem("auth_token")
      }
    };

    axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      window.sessionStorage.removeItem("auth_token", null);
      setToken(null);
      setUserRole(null);
    })
    .catch((error) => {
      console.log(error);
    });
    fetchProjects();
    fetchLatestProjects();
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
const [formData, setFormData] = useState({
  id: '',
  name: '',
  type_id: '',
  location: '',
  description: '',
});
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
      // Update existing project
      const { id, ...updateData } = formData;
      const response = await axios.put(`/api/projects/${id}`, updateData, {
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
  } catch (error) {
    console.error('Error saving project:', error);
  }
};

  return (
    <>
    {notification && (
      <div className="alert alert-success" role="alert">
        {notification}
      </div>
    )}
    
    <BrowserRouter className="App">
      <NavBar token={token} handleLogout={handleLogout}/>
      <Routes>
        <Route path="/" element={<Homepage types={types} latestProjects={latestProjects} userRole={userRole} token={token} handleDelete={handleDelete} handleEdit={handleEdit}
        handleSave={handleSave} handleCloseModal={handleCloseModal} handleShowModal={handleShowModal} showModal={showModal} formData={formData} setFormData={setFormData}/>} />

        <Route path="projects" 
        element={<Projects ProjectCard={ProjectCard} projects={projects} fetchProjects={fetchProjects} 
        currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} userRole={userRole} token={token} handleDelete={handleDelete} 
        handleCloseModal={handleCloseModal} handleEdit={handleEdit} handleSave={handleSave} handleShowModal={handleShowModal} formData={formData} setFormData={setFormData}
        showModal={showModal} types={types}/>}/>

        <Route path="donations" element={<Donations userRole={userRole} projects={projects} token={token} fetchUserDetails={fetchUserDetails}/>}/>

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

    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;