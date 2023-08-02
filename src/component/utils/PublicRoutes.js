import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getUser } from "../general-component/CommonsItem";

// handle the public routes
const PublicRoutes = () => {
  return !getUser() ? <Outlet /> : <Navigate to="/dashboard" />;
};

export default PublicRoutes;
