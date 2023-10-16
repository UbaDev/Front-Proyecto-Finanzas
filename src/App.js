import React from 'react';
import styled from 'styled-components';
import Sidebar from './components/Sidebar'
import RighSidebar from './components/RightSidebar'
import Dashboard from './components/Dashboard'
import {LoginForm} from './components/LoginForm'
import {RegisterForm} from './components/RegisterForm'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <Div>
      <Router>  
        <Routes>
          <Route path="/" element={DashboardLayout()} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
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

export default App;
const Div = styled.div `
position: relative;
`;
