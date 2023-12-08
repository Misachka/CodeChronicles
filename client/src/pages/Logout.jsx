import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "./UserContext";

export default function Logout() {
  const { setUserInfo } = useContext(UserContext);

  const logout = () => {
    setUserInfo(null);

    return <Navigate to="/Home" />;
  };

  return (
    <div>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
