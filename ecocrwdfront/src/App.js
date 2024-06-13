import './App.css';
import NavBar from './components/NavBar';
import Projects from './components/Projects/Projects';
import Donations from './components/Donations/Donations';
import LoginPage from './components/Users/LoginPage';
import { useState, useEffect } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RegisterPage from './components/Users/RegisterPage';

const donations = [
  {
    id: 1,
    email: "Chocolate",
    amount: "Chocolate",  
    description:
      "Chocolate is a food made from cacao beans. It is used in many desserts like pudding, cakes and candy",
    project_id: "User 1",
  },
  {
    id: 2,
    email: "Lollypop",
    amount: "Lollypop",
    description:
    "Lollipops are available in a number of colors and flavors, particularly fruit flavors.",
    project_id: "User 1",
  },
  {
    id: 3,
    email: "Ice Cream",
    amount: "Ice Cream",
    description:
      "Ice cream is a sweetened frozen food typically eaten as a snack or dessert.",
    project_id: "User 2",
  },
  {
    id: 4,
    email: "Chocolate",
    amount: "Chocolate",
    description:
      "Chocolate is a food made from cacao beans. It is used in many desserts like pudding, cakes and candy",
    project_id: "User 1",
  },
  {
    id: 5,
    email: "Lollypop",
    amount: "Lollypop",
    description:
    "Lollipops are available in a number of colors and flavors, particularly fruit flavors.",
    project_id: "User 1",
  },
  {
    id: 6,
    email: "Ice Cream",
    amount: "Ice Cream",
    description:
      "Ice cream is a sweetened frozen food typically eaten as a snack or dessert.",
    project_id: "User 2",
  },
];
const projects = [
  {
    id: 1,
    title: "Chocolate",
    type: "Chocolate",
    location: "Chocolate",
    description:
      "Chocolate is a food made from cacao beans. It is used in many desserts like pudding, cakes and candy",
    user: "User 1",
  },
  {
    id: 2,
    title: "Lollypop",
    type: "Lollypop",
    location: "Lollypop",
    description:
    "Lollipops are available in a number of colors and flavors, particularly fruit flavors.",
    user: "User 1",
  },
  {
    id: 3,
    title: "Ice Cream",
    type: "Ice Cream",
    location: "Ice Cream",
    description:
      "Ice cream is a sweetened frozen food typically eaten as a snack or dessert.",
    user: "User 2",
  },
  {
    id: 4,
    title: "Chocolate",
    type: "Chocolate",
    location: "Chocolate",
    description:
      "Chocolate is a food made from cacao beans. It is used in many desserts like pudding, cakes and candy",
    user: "User 1",
  },
  {
    id: 5,
    title: "Lollypop",
    type: "Lollypop",
    location: "Lollypop",
    description:
    "Lollipops are available in a number of colors and flavors, particularly fruit flavors.",
    user: "User 1",
  },
  {
    id: 6,
    title: "Ice Cream",
    type: "Ice Cream",
    location: "Ice Cream",
    description:
      "Ice cream is a sweetened frozen food typically eaten as a snack or dessert.",
    user: "User 2",
  },
];



function App() {

  const [token, setToken] = useState(sessionStorage.getItem('auth_token'));
  const [userRole, setUserRole] = useState('');
  useEffect(() => {
    if (token) {
      fetchUserDetails(token);
    }
  }, [token]);

  function handleLogout(){
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
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
  const addToken = (auth_token) => {
    setToken(auth_token);
    fetchUserDetails(auth_token);
  };

  const fetchUserDetails = (token) => {
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
  };

  return (
    <BrowserRouter className="App">
      <Routes>
        <Route path="/" element={<NavBar token={token} handleLogout={handleLogout}/>}>
          <Route path="projects" element={<Projects projects={projects} userRole={userRole}/>}/>
          <Route path="donations" element={<Donations donations={donations}/>}/>
          <Route
          path="login" 
          element={<LoginPage addToken={addToken}/>}
        /> 
        <Route
          path="register" 
          element={<RegisterPage/>}
        /> 
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
