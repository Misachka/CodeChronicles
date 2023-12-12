import { useQuery } from "@apollo/client";
import { GET_ALL_POSTS } from "../utils/queries";

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

export default PostList;
