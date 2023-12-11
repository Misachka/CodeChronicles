import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "../store/UserContext";
import { useQuery } from "@apollo/client";
import { GET_ALL_POSTS } from "../utils/queries";
import backgroundImage from "../assets/backgroundImage.jpg";

function Home(props) {
  const { setUserInfo, userInfo } = useContext(UserContext);

  const result = useQuery(GET_ALL_POSTS);
  const { data, fetching, error } = result;

  if (fetching) return "Loading...";
  if (error) return <pre>{error.message}</pre>;

  console.log(data)

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
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        color: "white", // Text color for visibility on the image
      }}
    >
      <div>
        <h2>All Posts</h2>
        {/* PostList component here */}
        <PostList />
      </div>
    </div>
  );
}

// Define PostList component outside of the Home component
function PostList() {
  const { loading, data } = useQuery(GET_ALL_POSTS);

  if (loading) {
    return <p>Loading Posts...</p>;
  }

  if (!data || !data.getAllPosts) {
    return <p>No posts at this moment...</p>;
  }

  return (
    <ul>
      {data.getAllPosts.map((post) => (
        <li key={post._id}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <p>Author: {post.username.username}</p>
        </li>
      ))}
    </ul>
  );
}

export default Home; // Export the Home component as the default export
