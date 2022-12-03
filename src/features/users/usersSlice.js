import { createAsyncThunk, createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { API } from '../../api/api';

const usersAdapter = createEntityAdapter();

const initialState = usersAdapter.getInitialState();

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
	const response = await API.users.getUsers();
	return response;
});

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
	extraReducers(builder) {
		builder.addCase(fetchUsers.fulfilled, usersAdapter.setAll);
	}
});

// export const {  } = usersSlice.actions;

export default usersSlice.reducer;

export const {selectAll: selectAllUsers, selectById: selectUserById, selectIds: selectUserIds} = usersAdapter.getSelectors(state => state.users);