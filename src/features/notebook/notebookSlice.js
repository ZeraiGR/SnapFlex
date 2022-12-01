import { createSlice, createAsyncThunk  } from '@reduxjs/toolkit';
import { API } from '../../api/api';

const initialState = {
  notes: [],
  status: 'idle',
  error: null
};

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
	const response = await API.posts.getPosts();
	return response;
});

export const addNewPost = createAsyncThunk('posts/addNewPost', async (post) => {
	const response = await API.posts.addPost(post);
	return response;
});

const notebookSlice = createSlice({
  name: 'notebook',
  initialState,
  reducers: {
		noteUpdated: (state, action) => {
			const {id, title, content} = action.payload;
			const existingNote = state.notes.find(note => note.id === id);
			if (existingNote) {
				existingNote.title = title;
				existingNote.content = content;
			}
		}
  },
	extraReducers(builder) {
		builder
			.addCase(fetchPosts.pending, (state, action) => {
				state.status = 'loading';
			})
			.addCase(fetchPosts.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.notes = state.notes.concat(action.payload);
			})
			.addCase(fetchPosts.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			})
			.addCase(addNewPost.fulfilled, (state, action) => {
				state.notes.push(action.payload);
			})
	}
});

export const { noteAdded, noteUpdated } = notebookSlice.actions;

export default notebookSlice.reducer;

export const selectAllNotes = state => state.notebook.notes;

export const selectNoteById = (state, noteId) =>
  state.notebook.notes.find(note => note.id === noteId);