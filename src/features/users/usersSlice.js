import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API } from '../../api/api';

const initialState = [];

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
	const response = await API.users.getUsers();
	return response;
});

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
	extraReducers(builder) {
		builder.addCase(fetchUsers.fulfilled, (state, action) => {
			return action.payload;
		});
	}
});

// export const {  } = usersSlice.actions;

export default usersSlice.reducer;

export const selectAllUsers = (state) => state.users;
export const selectUserById = (state, userId) => state.users.find(u => {
	
	return u.id === +userId;
});