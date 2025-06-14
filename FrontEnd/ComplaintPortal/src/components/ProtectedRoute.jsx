// src/components/ProtectedRoute.js
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles }) => {
  const userState = useSelector((state) => state.user);
  const { user, isLoggedIn } = userState;

  if (!isLoggedIn) {
    // If not logged in, redirect to login page
    return <Navigate to="/login" replace />;
  }

  // Check if user role is among the allowed roles
  // Note: user.RoleId might be a number, ensure type consistency if comparing with strings
  if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(user?.RoleId)) {
    // If user role is not allowed, redirect to home or an unauthorized page
    return <Navigate to="/" replace />; // Or a specific /unauthorized page
  }

  // If logged in and role is allowed, render the child routes
  return <Outlet />;
};

export default ProtectedRoute;