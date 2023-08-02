import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getUser } from "./CommonsItem";

const PublicRoutes = () => {
  return !getUser() ? <Outlet /> : <Navigate to="/dashboard" />;
};

export default PublicRoutes;
