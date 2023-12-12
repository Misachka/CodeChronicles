import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import Editor from "../components/Editor";
import { useQuery } from "@apollo/client";
import { GET_USER_POSTS, GET_POST } from "../utils/queries";
import { UPDATE_POST } from "../utils/mutations";

export default function EditPost() {
  const {id} = useParams();
  const navigate = useNavigate();
  const [title,setTitle] = useState('');
  const [content,setContent] = useState('');
  const [redirect,setRedirect] = useState(false);

  const { loading: userPostsLoading, error: userPostsError, data: userPostsData } = useQuery(GET_USER_POSTS);

  // Fetch details of the specific post to be edited
  const { loading: postLoading, error: postError, data: postData } = useQuery(GET_POST, {
    variables: { postId: id },
    fetchPolicy: 'cache-and-network',
  });

  const [updatePost] = useMutation(UPDATE_POST, {
    onCompleted: () => setRedirect(true),
  });

  useEffect(() => {
    if (!userPostsLoading && !userPostsError && userPostsData) {
      // Handle user posts data
    }
  }, [userPostsLoading, userPostsError, userPostsData]);

  useEffect(() => {
    if (!postLoading && !postError && postData && postData.getPostById) {
      const postInfo = postData.getPostById;
      setTitle(postInfo.title);
      setContent(postInfo.content);
  
    }
  }, [postLoading, postError, postData]);
  

  async function updatePost(ev) {
    ev.preventDefault();
    const data = new FormData();
    data.set('title', title);
    data.set('content', content);
    data.set('id', id);
    
    const response = await fetch('http://localhost:4000/post', {
      method: 'PUT',
      body: data,
      credentials: 'include',
    });
    if (response.ok) {
      setRedirect(true);
    }
  }
// code for deletion of posts
  async function deletePost() {
    const response = await fetch(`http://localhost:4000/post/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (response.ok) {
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={'/post/'+id} />
  }

  return (
    <form onSubmit={updatePost}>
      <input type="title"
             placeholder={'Title'}
             value={title}
             onChange={ev => setTitle(ev.target.value)} />
      <input type="summary"
             placeholder={'Summary'}
             value={summary}
             onChange={ev => setSummary(ev.target.value)} />
      <input type="file"
             onChange={ev => setFiles(ev.target.files)} />
      <Editor onChange={setContent} value={content} />
      <button style={{marginTop:'5px'}}>Update post</button>
      <button type="button" onClick={deletePost} style={{ marginTop: "5px", marginLeft: "5px" }}>
        Delete post
      </button>
    </form>
  );
}