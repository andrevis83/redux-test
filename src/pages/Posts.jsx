import React, {useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { getPosts, deletePost } from '../redux/features/postSlice';

import './posts.scss';

const Posts = () => {

    const {loading, posts} = useSelector((state) => ({ ...state.post }));
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getPosts());

         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const deleteItem = (postId) => {
        const confirm = window.confirm('Are you sure to delete this item?');
        if (confirm) {
            dispatch(deletePost({postId}))
        }
    }

    if (loading) {
        return <h2>Loading</h2>
    }
   
    return (
        <section>
            <header className='c-posts__header'>
                <h1>List of Posts</h1>
                <Link to={`add`}>Add new</Link>
            </header>    
            {posts.length > 0 && (
                <ul>
                    {posts.map( post => {
                        return (
                            <li key={post.id}>
                                <Link to={`${post.id}`}>{post.title}</Link>
                                <button 
                                    onClick={() => deleteItem(post.id)}
                                    style={{marginLeft: 16}}
                                >
                                    Cancella
                                </button>
                            </li>
                        )
                    })}
                </ul>
            )}
        </section>
    )
}

export default Posts