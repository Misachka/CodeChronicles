import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { GET_USER_POSTS, GET_POST } from '../utils/queries';
import { UPDATE_POST, DELETE_POST } from '../utils/mutations';

export default function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [posts, setPosts] = useState([]); // Add this line

  const { loading: userPostsLoading, error: userPostsError, data: userPostsData } = useQuery(GET_USER_POSTS);
  const { loading: postLoading, error: postError, data: postData } = useQuery(GET_POST, {
    variables: { postId: id },
    fetchPolicy: 'cache-and-network',
  });

  const [updatePost] = useMutation(UPDATE_POST, {
    onCompleted: () => setRedirect(true),
  });

  const [deletePost] = useMutation(DELETE_POST, {
    onCompleted: () => setRedirect(true),
  });

  useEffect(() => {
    if (!userPostsLoading && !userPostsError && userPostsData) {
      const posts = userPostsData.getPostsByUser;
      console.log(posts);
      setPosts(posts);
    }
  }, [userPostsLoading, userPostsError, userPostsData]);

  useEffect(() => {
    if (!postLoading && !postError && postData && postData.getPostById) {
      const postInfo = postData.getPostById;
      setTitle(postInfo.title);
      setContent(postInfo.content);
    }
  }, [postLoading, postError, postData]);

  const handleUpdatePost = async (ev) => {
    ev.preventDefault();

    await updatePost({
      variables: {
        id,
        title,
        content,
      },
    });
  };

  const handleDeletePost = async () => {
    await deletePost({
      variables: {
        id,
      },
    });
  };

  if (redirect) {
    return <navigate to={`/post/${id}`} />;
  }

  return (
    <form onSubmit={handleUpdatePost}>
      {/* Input fields and Editor component */}

      <div>
        <h2>All User Posts</h2>
        <ul>
          {posts.map(post => (
            <li key={post._id}>
              <h3>{post.title}</h3>
              <p>{post.content}</p>
            </li>
          ))}
        </ul>
        {/* Rest of your component */}
      </div>
      <button type="submit" style={{ marginTop: '5px' }}>
        Update post
      </button>
      <button type="button" onClick={handleDeletePost} style={{ marginTop: '5px', marginLeft: '5px' }}>
        Delete post
      </button>
    </form>
  );
}

