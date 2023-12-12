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
        backgroundImage: `url(${backgroundImage})`, // Set the image as background
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100vw",
    
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        color: "white", // Text color for visibility on the image
      }}
    >
      <div className="postMain">
        <h2>All Posts</h2>
        {/* PostList component here */}
        <PostList />
      </div>
    </div>
  );
}


export default Home; // Export the Home component as the default export