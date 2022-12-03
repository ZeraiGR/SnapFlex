import { createSlice, createAsyncThunk, createEntityAdapter, createSelector } from '@reduxjs/toolkit';
import { API } from '../../api/api';

const postsAdapter = createEntityAdapter({
	sortComparer: (a, b) => b.id - a.id
});

const initialState = postsAdapter.getInitialState({
  status: 'idle',
  error: null
});

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
	const response = await API.posts.getPosts();
	return response;
});

export const addNewPost = createAsyncThunk('posts/addNewPost', async (post) => {
	const response = await API.posts.addPost(post);
	return response;
});

export const updatePost = createAsyncThunk('posts/updatePost', async (post, {dispatch}) => {
	const response = await API.posts.updatePost(post);
	dispatch(postUpdated(response));
	return response;
});

export const deletePost = createAsyncThunk('posts/deletePost', async (postId) => {
	await API.posts.deletePost(postId);
	return postId;
});

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
		postUpdated: (state, action) => {
			const {id, title, body} = action.payload;
			const existingPost = state.entities[id];
			if (existingPost) {
				existingPost.title = title;
				existingPost.body = body;
			}
		},
  },
	extraReducers(builder) {
		builder
			.addCase(fetchPosts.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(fetchPosts.fulfilled, (state, action) => {
				state.status = 'succeeded';
				postsAdapter.upsertMany(state, action.payload);
			})
			.addCase(fetchPosts.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			})
			.addCase(addNewPost.fulfilled, postsAdapter.addOne)
			.addCase(deletePost.fulfilled, postsAdapter.removeOne)
	}
});

export const { postAdded, postUpdated, postDeleted } = postsSlice.actions;

export default postsSlice.reducer;

export const {selectAll: selectAllPosts, selectById: selectPostById, selectIds: selectPostIds} = postsAdapter.getSelectors(state => state.posts);

export const selectPostByUser = createSelector(
	[selectAllPosts, (_, userId) => userId],
	(posts, userId) => posts.filter(post => post.userId === +userId)
);