import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_POST } from "../utils/mutations";
import { useNavigate } from "react-router-dom";

//empty fields that accept user's input
export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const [createPostMutation, { loading, error }] = useMutation(CREATE_POST); //mutation to create post

  async function createNewPost(ev) {
    ev.preventDefault();

    //sets the title and content for the new post
    try {
      const { data } = await createPostMutation({
        variables: {
          title: title,
          content: content,
        },
      });
      alert("Post sucessfully created!");

      //redirects to home and refrehses to show new post
      const handleRefresh = () => {
        navigate("/");
        window.location.reload(true);
      }
      
     handleRefresh();

     
    } catch (err) {
      console.error('Error creating post:', err);
      alert("Error creating a post, please try again");
    }
  }

//takes the user's input as values to create the new posts
  return (
    <form onSubmit={createNewPost} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* Title Input */}
      <input
        type='text'
        placeholder="Title"
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
        style={{
          marginBottom: '10px',
          padding: '10px',
          fontSize: '1.5em', // Updated font size to match textarea
          width: '70%',
          textAlign: 'center',
          borderRadius: '10px',
          border: '1px solid #ccc',
          outline: 'none',
        }}
      />
  
      {/* Content Textarea */}
      <textarea
        value={content}
        onChange={(ev) => setContent(ev.target.value)}
        style={{
          border: '1px solid #ccc',
          minHeight: '200px',
          padding: '20px',
          fontSize: '2em', // Updated font size to match input
          width: '70%',
          marginBottom: '10px',
          textAlign: 'center',
          borderRadius: '10px',
          outline: 'none',
        }}
      />
  
      {/* Button for Submission */}
      <button id="create-btn"
        disabled={loading}
      >
        {loading ? 'Creating post...' : 'Create post'}
      </button>
    </form>
  );
  }  