// import React, { useState, useEffect } from 'react';
// import { useQuery, useMutation } from '@apollo/client';
// import { useParams, useNavigate } from 'react-router-dom';
// import { GET_POST } from '../utils/queries';
// import { UPDATE_POST } from '../utils/mutations';

// const Editing = () => {
//   const { postId } = useParams(); // Get the postId from the URL parameters
//   const navigate = useNavigate();
//   const { loading, error, data } = useQuery(GET_POST, {
//     variables: { postId },
//   });

//   const [updatePost] = useMutation(UPDATE_POST);

//   const [editedPost, setEditedPost] = useState({
//     title: 'null',
//     content: 'null',
//   });

//   // Populate the form fields with post details once they are loaded
//   useEffect(() => {
//     if (data && data.getPost) {
//       const { title, content } = data.getPost;
//       setEditedPost({
//         title: title !== null ? title : editedPost.title,
//         content: content !== null ? content : editedPost.content,
//       });
//     }
// }, [data, editedPost.title, editedPost.content]);

//   const handleUpdatePost = async () => {
//     try {
//       await updatePost({
//         variables: {
//           id: postId,
//           title: editedPost.title,
//           content: editedPost.content,
//         },
//       });
      
//       navigate(`/edit-post`);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error.message}</p>;

//   return (
//     <div>
//     <h2>Edit Post</h2>
//     <form>
//       <label htmlFor="title">Title:</label>
//       <input
//         type="text"
//         id="title"
//         value={editedPost.title !== null ? editedPost.title : ''}
//         onChange={(e) => setEditedPost({ ...editedPost, title: e.target.value })}
//       />

//       <label htmlFor="content">Content:</label>
//       <textarea
//         id="content"
//         value={editedPost.content !== null ? editedPost.content : ''}
//         onChange={(e) => setEditedPost({ ...editedPost, content: e.target.value })}
//       />

//       <button type="button" onClick={handleUpdatePost}>
//         Update Post
//       </button>
//     </form>
//   </div>
//   );
// };

// export default Editing;

// import React, { useState, useEffect } from 'react';
// import { useQuery, useMutation } from '@apollo/client';
// import { useParams, useNavigate } from 'react-router-dom';
// import { GET_POST } from '../utils/queries';
// import { UPDATE_POST } from '../utils/mutations';

// const Editing = () => {
//   const { postId } = useParams();
//   const navigate = useNavigate();
//   const { loading, error, data } = useQuery(GET_POST, {
//     variables: { postId },
//   });

//   const [updatePost] = useMutation(UPDATE_POST);

//   const [editedPost, setEditedPost] = useState({
//     title: '',
//     content: '',
//   });

//   useEffect(() => {
//     if (data && data.getPost) {
//       const { title, content } = data.getPost;
//       setEditedPost({
//         title: title || '',
//         content: content || '',
//       });
//     }
//   }, [data]);

//   const handleUpdatePost = async () => {
//     try {
//       await updatePost({
//         variables: {
//           id: postId,
//           title: editedPost.title,
//           content: editedPost.content,
//         },
//       });

//       navigate(`/edit-post`);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error.message}</p>;

//   return (
//     <div>
//       <h2>Edit Post</h2>
//       <form>
//         <label htmlFor="title">Title:</label>
//         <input
//           type="text"
//           id="title"
//           value={editedPost.title}
//           onChange={(e) => setEditedPost({ ...editedPost, title: e.target.value })}
//         />

//         <label htmlFor="content">Content:</label>
//         <textarea
//           id="content"
//           value={editedPost.content}
//           onChange={(e) => setEditedPost({ ...editedPost, content: e.target.value })}
//         />

//         <button type="button" onClick={handleUpdatePost}>
//           Update Post
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Editing;
import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useParams, useNavigate } from 'react-router-dom';
import { GET_POST } from '../utils/queries';
import { UPDATE_POST } from '../utils/mutations';

const Editing = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(GET_POST, {
    variables: { postId },
  });

  const [updatePost] = useMutation(UPDATE_POST);

  const [editedPost, setEditedPost] = useState({
    title: '',
    content: '',
  });

  useEffect(() => {
    if (data && data.getPostById) {
        console.log('Post data:', data.getPostById);
      const { title, content } = data.getPostById;
      setEditedPost({
        title: title || '', // Set default to an empty string if title is null or undefined
        content: content || '', // Set default to an empty string if content is null or undefined
      });
    }
  }, [data]);

  const handleUpdatePost = async () => {
    try {
      await updatePost({
        variables: {
          id: postId,
          title: editedPost.title,
          content: editedPost.content,
        },
      });

      navigate(`/edit-post`);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Edit Post</h2>
      <form>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={editedPost.title}
          onChange={(e) => setEditedPost({ ...editedPost, title: e.target.value })}
        />

        <label htmlFor="content">Content:</label>
        <textarea
          id="content"
          value={editedPost.content}
          onChange={(e) => setEditedPost({ ...editedPost, content: e.target.value })}
        />

        <button type="button" onClick={handleUpdatePost}>
          Update Post
        </button>
      </form>
    </div>
  );
};

export default Editing;
