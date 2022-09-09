import React, {useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { getPost } from '../redux/features/postSlice';

const Post = () => {

  const {id} = useParams();
  const {loading, post} = useSelector((state) => ({ ...state.post }));
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getPost({id}));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (loading) {
    return <h2>Loading</h2>
  }

  return (
    <>
      <h1>{post?.title}</h1>
      <p>{post?.body}</p>
    </>
  )
}

Post.propTypes = {}

export default Post