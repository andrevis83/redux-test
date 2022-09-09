import React, {useState} from 'react';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { createPost } from '../redux/features/postSlice';

const initialState = {
  title: "",
  body: "",
  userId: 1234,
}
const PostAdd = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [postData, setPostData] = useState(initialState);

  const handlePostData = (evt) => {
    const {name, value} = evt.target;
    setPostData({...postData, [name]: value})
  }
  
  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (postData.title.length > 0 && postData.body.length > 0) {
      dispatch(createPost({postData, navigate}));
    }
  }

  return (
    <section>
      <h1>Add a new post</h1>
      <form 
        onSubmit={handleSubmit}
        style={{display: 'flex', flexDirection: 'column', maxWidth: 300}}
      >
        <input 
          type="text" 
          name='title' 
          value={postData.title}
          placeholder="Insert a title"
          onChange={(e) => handlePostData(e)}
          style={{width: '100%', marginBottom: 16}}
        />
        <textarea 
          name="body" 
          rows="5"
          value={postData.body}
          placeholder="Insert content"
          onChange={(e) => handlePostData(e)}
          style={{width: '100%', marginBottom: 20}}
        />
        <button type="submit">Crea</button>
      </form>
    </section>
  )
}

export default PostAdd;