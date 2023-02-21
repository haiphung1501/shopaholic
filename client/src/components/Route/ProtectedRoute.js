import React from "react";
import { Route, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtectedRoute() {
  const { isAuthenticated } = useSelector((state) => state.user);
  console.log("day ne ", isAuthenticated);
  return isAuthenticated ? <Outlet /> : <Navigate to="/user/login" />;
}
