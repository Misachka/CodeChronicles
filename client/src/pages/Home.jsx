import React, { useState } from "react";
import { useContext, useEffect } from "react";
import { UserContext } from "../store/UserContext";
import backgroundImage from "../assets/backgroundImage.jpg";
import PostList from "../components/PostsHome";


function Home(props) {
  const { setUserInfo, userInfo } = useContext(UserContext);

  function logout() {
    setUserInfo(null);
  }

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
        {/* <h2>All Posts</h2> */}
        {/* PostList component here */}
        <PostList />
      </div>
    </div>
  );
}


export default Home; // Export the Home component as the default export