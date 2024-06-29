import './App.css';
import NavBar from './components/NavBar';
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

function App() {

  const [token, setToken] = useState(sessionStorage.getItem('auth_token'));
  const [userRole, setUserRole] = useState('');
  const [projects, setProjects] = useState([]);
  const [latestProjects, setLatestProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchProjects(currentPage).then(() => {
      fetchLatestProjects();
    });
  }, [currentPage]);
  
  const fetchProjects = async (page) => {
    try {
      const response = await axios.get(`/api/projects?page=${page}`);
      setProjects(response.data.Projects);
      setTotalPages(response.data.meta.last_page);
      console.log("Total pages: ", totalPages);
      return Promise.resolve(); // Add this line
    } catch (error) {
      console.error('Error fetching projects:', error);
      return Promise.reject(error); // Add this line
    }
  };
  
  const fetchLatestProjects = async () => {
    try {
      const response = await axios.get(`/api/projects?page=${totalPages}`);
      const projects = response.data.Projects;
      setLatestProjects(projects.slice(-3));
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
      window.sessionStorage.setItem("auth_token", null);
      setToken(null);
    })
    .catch((error) => {
      console.log(error);
    });
}
  

  return (
    <BrowserRouter className="App">
      <NavBar token={token} handleLogout={handleLogout}/>
      <Routes>
        <Route path="/" element={<Homepage latestProjects={latestProjects} />} />
        
        <Route path="projects" 
        element={<Projects ProjectCard={ProjectCard} projects={projects} fetchProjects={fetchProjects} 
        currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} userRole={userRole} /*  token={token}  */ />}/>

        <Route path="donations" element={<Donations userRole={userRole} projects={projects} token={token}/>}/>

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
  );
}

export default App;