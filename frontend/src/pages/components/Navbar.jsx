import React from "react";
import { NavLink, Outlet } from "react-router-dom";

export default function Navbar() {
  return (
    <>
      <nav>
        <NavLink to="/">Home</NavLink>
        {"      "}
        <NavLink to="/profile">Profile</NavLink>
        {"      "}
        <NavLink to="/signup">Sign Up</NavLink>
        {"  "}
        <NavLink to="/login">Login</NavLink>
      </nav>
      <Outlet />
    </>
  );
}
