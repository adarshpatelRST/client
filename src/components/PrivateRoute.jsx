import React from 'react';
import { Route, Navigate, Routes } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = !!localStorage.getItem('token');
  console.log("PrivateRoute ==> " + localStorage.getItem('token'));
  console.log("isAuthenticated : " + isAuthenticated);
  return (
    <Routes>
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Navigate to="/home" /> : <Navigate to="/login" />
      }
    />
    </Routes>
  );
};

export default PrivateRoute;
