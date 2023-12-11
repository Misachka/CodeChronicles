import { Link } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { UserContext } from './UserContext';
import { useQuery } from '@apollo/client';
import { GET_ALL_POSTS } from '../utils/queries';

function Home(props) {
  const { setUserInfo, userInfo } = useContext(UserContext);

  useEffect(() => {
    fetch('http://localhost:3001/profile', {
      credentials: 'include',
    }).then(response => {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  function logout() {
    fetch('http://localhost:3000/logout', {
      credentials: 'include',
      method: 'POST',
    });
    setUserInfo(null);
  }

  const username = userInfo?.username;

  return (
    <>
      <header>
        <Link to="/" className="logo">
          Code Chronicles
        </Link>
        <nav>
          {username && (
            <>
              <Link to="/create">Create new post</Link>
              <a onClick={logout}>Logout ({username})</a>
            </>
          )}
          {!username && (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </nav>
      </header>

      <div>
        <h2>All Posts</h2>
        {/* PostList component here */}
        <PostList />
      </div>
    </>
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

