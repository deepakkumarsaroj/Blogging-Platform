// redux/postSlice.js
import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "posts",
  initialState: {
    allPosts: [],
    isLoading: false,
  },
  reducers: {
    setPosts: (state, action) => {
      state.allPosts = action.payload;
    },
    addPost: (state, action) => {
      state.allPosts.unshift(action.payload);
    },
    deletePost: (state, action) => {
      state.allPosts = state.allPosts.filter(
        (post) => post._id !== action.payload
      );
    },
  },
});

export const { setPosts, addPost, deletePost } = postSlice.actions;
export default postSlice.reducer;
