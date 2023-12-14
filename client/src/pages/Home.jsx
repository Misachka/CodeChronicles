import React, { useState } from "react";
import { useContext, useEffect } from "react";
import { UserContext } from "../store/UserContext";
import PostList from "../components/PostsHome";


function Home(props) {
  const { setUserInfo, userInfo } = useContext(UserContext); //login user

  //logs out user
  function logout() {
    setUserInfo(null);
  }

  //shows all posts
  return (
    <div
      style={{
        width: "100%",
        paddingLeft: "20px",
        paddingRight: "20px",

        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        color: "white", 
      }}
    >
      <div className="postMain">
        <PostList /> 
      </div>
    </div>
  );
}


export default Home; // Export the Home component as the default export