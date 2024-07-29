import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import ManageUsers from './components/AdminManager/ManageUsers';
import ManageAgreements from './components/AdminManager/ManageAgreements';
import ManageAgreementCategories from './components/AdminManager/ManageAgreementCategories';
import ManageCoverages from './components/AdminManager/ManageCoverages';
import ManageTariffs from './components/AdminManager/ManageTariffs';
import ManageTariffCoverageMappers from './components/AdminManager/ManageTariffCoverageMappers';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home/*" element={<PrivateRoute component={Home} />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path='/manage-users' element={<ManageUsers />} />
        <Route path="/manage-agreements" element={<ManageAgreements />} />
        <Route path="/manage-agreement-categories" element={<ManageAgreementCategories />} />
        <Route path="/manage-coverages" element={<ManageCoverages />} />
        <Route path="/manage-tariffs" element={<ManageTariffs />} />
        <Route path="/manage-tariff-coverage-mappers" element={<ManageTariffCoverageMappers />} />  
      </Routes>
    </Router>
  );
}

export default App;
