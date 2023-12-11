import {Link} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "./UserContext";
import {  useQuery } from '@apollo/client';
import { GET_ALL_POSTS } from "../utils/queries";

// export default function Home(props) {
//   const {setUserInfo,userInfo} = useContext(UserContext);
  
  // useEffect(() => {
  //   fetch('http://localhost:3001/profile', {
  //     credentials: 'include',
  //   }).then(response => {
  //     response.json().then(userInfo => {
  //       setUserInfo(userInfo);
  //     });
  //   });
  // }, []);

  // function logout() {
  //   fetch('http://localhost:3000/logout', {
  //     credentials: 'include',
  //     method: 'POST',
  //   });
  //   setUserInfo(null);
  // }

  // const username = userInfo?.username;

export default function postList () {
  const { loading, data } = useQuery(GET_ALL_POSTS);

  if (loading) {
    return <p>Loading Posts...</p>;
  }

  if (!data || !data.getAllPosts) {
    return <p>No posts at this moment...</p>
  }

  
  

  return (
    <>
    {/* <header>
      <Link to="/" className="logo">Code Chronicles</Link>
      <nav>
        {username && (
          <>
            <Link to="/create">Create new post</Link>
            <a onClick={logout}>Logout ({username})</a>
          </>
        )}
        {true &&  (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header> */}

<div>
<h2>All Posts</h2>
<ul>
  {data.getAllPosts.map((post) => (
    <li key={post._id}>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
      <p>Author: {post.username.username}</p>
    </li>
  ))}
</ul>
</div>
</>

    
  );
};
