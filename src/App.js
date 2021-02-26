import React from 'react';
import Routes from "./routes";
import { BrowserRouter as Router } from "react-router-dom";
// import useToken from './components/token'; 
import './App.css';

// function setToken(userToken) {
//   sessionStorage.setItem('token', JSON.stringify(userToken));
// }

// function getToken() {
//   const tokenString = sessionStorage.getItem('token');
//   const userToken = JSON.parse(tokenString);
//   return userToken?.token
// }

function App() {
//   const { token, setToken } = useToken();
// console.log(token);
  return (
    <Router>
      <Routes />
    </Router>
  );
}

export default App;
