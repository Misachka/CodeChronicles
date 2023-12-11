import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Home from "../../../pages/Home";
import Auth from "../../../utils/auth";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const handleLogOut = () => {
    Auth.logout();
    navigate("/");
  };

  return (
    <header>
      <Link to="/" className="logo">
        Code Chronicles
      </Link>
      <nav>
        {Auth.loggedIn() ? (
          <>
            <Link to="/">Home</Link>
            <Link to="/create-post">Create new post</Link>
            <Link to="/edit-post">EditPost</Link>
            <a onClick={handleLogOut}>
              Logout ({Auth.getProfile().data.username})
            </a>
          </>
        ) : (
          <>
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
