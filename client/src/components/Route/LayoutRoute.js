import { Container } from "@mui/material";
import React from "react";
import { Route, Navigate, Outlet } from "react-router-dom";

export default function LayoutRoute() {
  return (
    <Container maxWidth="lg">
      <Outlet />
    </Container>
  );
}
