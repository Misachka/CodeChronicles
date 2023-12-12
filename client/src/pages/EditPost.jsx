import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { GET_USER_POSTS } from '../utils/queries';
import { UPDATE_POST, DELETE_POST } from '../utils/mutations';

const EditPost = () => {
  const { loading, error, data } = useQuery(GET_USER_POSTS);
  const [updatePost] = useMutation(UPDATE_POST);
  const [deletePost] = useMutation(DELETE_POST);

  const [editedPost, setEditedPost] = useState({
    id: '',
    title: '',
    content: '',
  });

  const navigate = useNavigate(); // Initialize useHistory

  const handleEdit = async (postId, title, content) => {
    setEditedPost({ id: postId, title, content });

    // Update the post using the mutation
    try {
      await updatePost({
        variables: {
          id: postId,
          title,
          content,
        },
        refetchQueries: [{ query: GET_USER_POSTS }],
      });
      
    } catch (error) {
      console.error(error);
    }

    // Redirect to the editing post page
    navigate(`/editing/${postId}`);
  };

  const handleDelete = async postId => {
    // Delete the post using the mutation
    try {
      await deletePost({
        variables: { postId },
        refetchQueries: [{ query: GET_USER_POSTS }],
      });
      alert("Post sucessfully deleted");
      navigate("/edit-post")
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const userPosts = data.getUserPosts; // Fix: Use data.getUserPosts

  return (
    <div>
      <h2>User Posts</h2>
      {userPosts.map(post => (
        <div key={post._id}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <p>Username: {post.username.username}</p>
          <button onClick={() => handleEdit(post._id, post.title, post.content)}>
            Edit
          </button>
          <button onClick={() => handleDelete(post._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default EditPost;
