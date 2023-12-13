import { useQuery } from "@apollo/client";
import { GET_ALL_POSTS } from "../utils/queries";

//retrieves all posts using Query
function PostList() {
  const { loading, data } = useQuery(GET_ALL_POSTS);

  if (loading) {
    return <p>Loading Posts...</p>;
  }

  if (!data || !data.getAllPosts) {
    return <p>No posts at this moment...</p>;
  }

  //loops through posts to show them in cards
  return (
    <div className="post-list"> 
      {data.getAllPosts.map((post) => (
        <div key={post._id} className="homePost"> 
          <h3 className="post-title">{post.title}</h3>
          <div className="post-content">
            <p>{post.content}</p>
          </div>
          <p className="post-author">Author: {post.username.username}</p>
        </div>
      ))}
    </div>
  );
}

export default PostList;
