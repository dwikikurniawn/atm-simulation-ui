import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getUser } from "./CommonsItem";

const PrivateRoutes = () => {
  return getUser() ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
