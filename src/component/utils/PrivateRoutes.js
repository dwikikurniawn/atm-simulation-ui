import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getUser } from "../general-component/CommonsItem";

// handle the private routes
const PrivateRoutes = () => {
  return getUser() ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
