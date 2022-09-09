import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import http from "../../APIs/config";

export const getPosts = createAsyncThunk(
    "post/getAll",
    async (_, { rejectWithValue }) => {
        try {
          const response = await http.get('/posts');
          return response.data;
        } catch (err) {
          return rejectWithValue({message: err.response.status});
        }
      }
);

export const getPost = createAsyncThunk(
  "post/getPost",
  async ({id}, { rejectWithValue }) => {
      try {
        const response = await http.get(`/posts/${id}`);
        return response.data;
      } catch (err) {
        return rejectWithValue({message: err.response.status});
      }
    }
);

export const deletePost = createAsyncThunk(
  "post/deletePost",
  async ({id}, { rejectWithValue }) => {
      try {
        const response = await http.delete(`/posts/${id}`);
        return response.data;
      } catch (err) {
        return rejectWithValue({message: err.response.status});
      }
    }
);

export const createPost = createAsyncThunk(
  "post/createPost",
  async( {postModel, navigate}, {rejectWithValue}) => {
    try {
      const response = await http.post(`/posts/`, {postModel});
      navigate("/posts");
      return response.data;
    } catch (err) {
      return rejectWithValue({message: err.response.status});
    }
  }
)

const postSlice = createSlice({
    name: "post",
    initialState: {
      posts: [],
      post: {},
      loading: false,
      error: null,
    },
    extraReducers: {

      // Get all posts
      [getPosts.pending]: (state) => {
        state.loading = true;
      },
      [getPosts.fulfilled]: (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      },
      [getPosts.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      },

      // Get a post
      [getPost.pending]: (state) => {
        state.loading = true;
      },
      [getPost.fulfilled]: (state, action) => {
        state.loading = false;
        state.post = action.payload;
      },
      [getPost.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      },

      // Delete Post
      [deletePost.pending]: (state) => {
        state.loading = true;
      },
      [deletePost.fulfilled]: (state, action) => {
        state.loading = false;
        const {postId} = action.meta.arg;
        state.posts = state.posts.filter( 
          post => post.id !== postId
        );
      },
      [deletePost.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      },

      // Create Post
      [createPost.pending]: (state) => {
        state.loading = true;
      },
      [createPost.fulfilled]: (state, action) => {
        state.loading = false;
        console.log(action);
        state.posts = [action.payload];
      },
      [createPost.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      },
    },
  });
  
  
  export default postSlice.reducer;