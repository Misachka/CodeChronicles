import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../store/UserContext";

export default function Logout() {
  const { setUserInfo } = useContext(UserContext); //takes the user info, uses context for auth

  const logout = () => {
    setUserInfo(null);

    return <Navigate to="/Home" />; //redirects to home after logging out
  };

  return (
    <div>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
