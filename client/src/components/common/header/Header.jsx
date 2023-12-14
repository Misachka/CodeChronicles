import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Auth from "../../../utils/auth";
import { useNavigate } from "react-router-dom";
import { Button } from "@material-tailwind/react";

function Header() {
  const navigate = useNavigate();

  const handleLogOut = () => {
    Auth.logout();
    navigate("/");
  };

  //links to pages. More links options once user is logged in
  return (
    <header>
       <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Open+Sans&family=Preahvihear&family=VT323&display=swap');
          .logo {
            font-family: 'VT323', sans-serif; /* Change 'Open Sans' to the desired font */
            /* Add other logo styling here */
          }
        `}

        
      </style>
      <Link to="/" className="logo">
        Code Chronicles
      </Link>

      <nav>
        {Auth.loggedIn() ? (
          <>
            <Link to="/" className="rounded-full">
              <Button color="blue" size="sm">
                Home
              </Button>
            </Link>
            <Link to="/create-post" className="rounded-full">
              <Button color="blue" size="sm">
                CreatePost
              </Button>
            </Link>

            <Link to="/edit-post" className="rounded-full">
              <Button color="blue" size="sm">
                EditPost
              </Button>
            </Link>
            <a onClick={handleLogOut} className="rounded-full">
              <Button color="blue" size="sm">
                Logout ({Auth.getProfile().data.username.display})
              </Button>
            </a>
          </>
        ) : (
          <>
            <Link to="/">
              <Button className="rounded-full" color="blue" size="sm">
                Home
              </Button>
            </Link>
            <Link to="/login" className="rounded-full">
              <Button color="blue" size="sm">
                Login
              </Button>
            </Link>
            <Link to="/register" className="rounded-full">
              <Button color="blue" size="sm">
                Register
              </Button>
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;