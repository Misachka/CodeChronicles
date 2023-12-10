import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import Editor from "./Editor";
import { useMutation } from "@apollo/client";
import { CREATE_POST } from "../utils/mutations";

export default function CreatePost() {
  const [title, setTitle] = useState('');
  // const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  // const [files, setFiles] = useState('');
  const [redirect, setRedirect] = useState(false);

  const [createPostMutation, { loading, error }] = useMutation(CREATE_POST);

  async function createNewPost(ev) {
    ev.preventDefault();

    try {
      const { data } = await createPostMutation({
        variables: {
          title: title,
          // summary: summary,
          content: content,
          // file: files[0],
        },
      });

      if (data.createPost) {
        setRedirect(true);
      }
    } catch (err) {
      console.error('Error creating post:', err);
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />;
  }

  return (
    // <form onSubmit={createNewPost}>
    //   <input
    //     type="title"
    //     placeholder={'Title'}
    //     value={title}
    //     onChange={(ev) => setTitle(ev.target.value)}
    //   />
    //   {/* <input
    //     type="summary"
    //     placeholder={'Summary'}
    //     value={content}
    //     onChange={(ev) => setSummary(ev.target.value)}
    //   /> */}
    //   {/* <input
    //     type="file"
    //     onChange={(ev) => setFiles(ev.target.files)}
    //   /> */}
    //   <Editor value={content} onChange={setContent} />
    //   <button style={{ marginTop: '5px' }} disabled={loading}>
    //     {loading ? 'Creating post...' : 'Create post'}
    //   </button>
    // </form>

    //Yemny's test
    <form onSubmit={createNewPost}>
      <input type='title' placeholder="Title" value={title}
        onChange={(ev) => setTitle(ev.target.value)}>
      </input>
      <div>
        <textarea value={content}
          onChange={(ev) => setContent(ev.target.value)}>

        </textarea>
      </div>
      <button style={{ marginTop: '5px' }} disabled={loading}>
        {loading ? 'Creating post...' : 'Create post'}
      </button>
    </form>

  );
}

//   async function createNewPost(ev) {
//     const data = new FormData();
//     data.set('title', title);
//     data.set('summary', summary);
//     data.set('content', content);
//     data.set('file', files[0]);
//     ev.preventDefault();
//     const response = await fetch('http://localhost:4000/post', {
//       method: 'POST',
//       body: data,
//       credentials: 'include',
//     });
//     if (response.ok) {
//       setRedirect(true);
//     }
//   }

//   if (redirect) {
//     return <Navigate to={'/'} />
//   }
//   return (
//     <form onSubmit={createNewPost}>
//       <input type="title"
//              placeholder={'Title'}
//              value={title}
//              onChange={ev => setTitle(ev.target.value)} />
//       <input type="summary"
//              placeholder={'Summary'}
//              value={summary}
//              onChange={ev => setSummary(ev.target.value)} />
//       <input type="file"
//              onChange={ev => setFiles(ev.target.files)} />
//       <Editor value={content} onChange={setContent} />
//       <button style={{marginTop:'5px'}}>Create post</button>
//     </form>
//   );
// }