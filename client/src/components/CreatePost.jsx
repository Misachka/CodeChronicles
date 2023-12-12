import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_POST } from "../utils/mutations";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const [createPostMutation, { loading, error }] = useMutation(CREATE_POST);

  async function createNewPost(ev) {
    ev.preventDefault();

    try {
      const { data } = await createPostMutation({
        variables: {
          title: title,
          content: content,
        },
      });
      alert("Post sucessfully created!");
      navigate("/")

     
    } catch (err) {
      console.error('Error creating post:', err);
      alert("Error creating a post, please try again");
    }
  }


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
      <button
        style={{
          padding: '8px 16px',
          fontSize: '1em',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          width: '20%',
          borderRadius: '10px',
        }}
        disabled={loading}
      >
        {loading ? 'Creating post...' : 'Create post'}
      </button>
    </form>
  );
  }  