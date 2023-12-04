import React, { useEffect } from 'react';
import styled from 'styled-components';
import Sidebar from './components/Sidebar'
import RighSidebar from './components/RightSidebar'
import Dashboard from './components/Dashboard'
import {LoginForm} from './components/LoginForm'
import {RegisterForm} from './components/RegisterForm'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddCard from './components/AddCard';
import AddMov from './components/AddMov';


function App() {

  const ProtectedRoute = ({ element }) => {
    const token = localStorage.getItem('token');

    if (!token) {
      window.location.href = '/login';
      return null;
    }

    return element;
  };

  const ProtectedRoute2 = ({ element }) => {
    const token = localStorage.getItem('token');

    if (token) {
      window.location.href = '/';
      return null;
    }

    return element;
  };


  return (
    <Div>
      <Router>  
        <Routes>
          <Route
            path="/add-card"
            element={<ProtectedRoute element={<AddCardLayout />} />}
          />

           <Route
            path="/add-mov"
            element={<ProtectedRoute element={<AddMovLayout />} />}
          />
          <Route
            path="/"
            element={<ProtectedRoute element={<DashboardLayout />} />}
          />
          <Route path="/login" element={<ProtectedRoute2 element={<LoginForm />} />} 
          />
          <Route path="/register" element={<ProtectedRoute2 element={<RegisterForm />} />}
          />
        </Routes>
      </Router>
    </Div>
  );
}

function DashboardLayout() {
  return (
    <>
      <Sidebar />
      <Dashboard />
      <RighSidebar />
    </>
  );
}
function AddCardLayout() {
  return (
    <>
      <Sidebar />
      <AddCard />
      <RighSidebar />
    </>
  );
}

function AddMovLayout() {
  return (
    <>
      <Sidebar />
      <AddMov />
      <RighSidebar />
    </>
  );
}


export default App;
const Div = styled.div `
position: relative;
`;
