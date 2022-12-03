import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import { API } from "../../api/api";

const todosAdapter = createEntityAdapter({
	sortComparer: (a, b) => b.id - a.id
});

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
	const response = await API.todos.getTodos();
	return response;
});

export const addNewTodo = createAsyncThunk('todos/addNewTodo', async (todo) => {
	const response = await API.todos.addTodo(todo);
	return response;
});

export const updateTodo = createAsyncThunk('todos/updateTodo', async (todo) => {
	const response = await API.todos.updateTodo(todo);
	return response;
});

export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (todoId) => {
	await API.todos.deleteTodo(todoId);
	return todoId;
});

const initialState = todosAdapter.getInitialState({
	status: 'idle',
	error: null
});

const todosSlice = createSlice({
	name: 'todos',
	initialState,
  reducers: {},
	extraReducers(builder) {
		builder
		.addCase(fetchTodos.pending, (state, action) => {
			state.status = 'loading';
		})
		.addCase(fetchTodos.fulfilled, (state, action) => {
			state.status = 'succeeded';
			todosAdapter.setAll(state, action.payload);
		})
		.addCase(fetchTodos.rejected, (state, action) => {
			state.status = 'rejected';
			state.error = action.error.message;
		})
		.addCase(addNewTodo.pending, (state, action) => {
			state.status = 'loading';
		})
		.addCase(addNewTodo.fulfilled, (state, action) => {
			state.status = 'succeeded';
			todosAdapter.addOne(state, action.payload);
		})
		.addCase(addNewTodo.rejected, (state, action) => {
			state.status = 'rejected';
			state.error = action.error.message;
		})
		.addCase(updateTodo.pending, (state, action) => {
			state.status = 'loading';
		})
		.addCase(updateTodo.fulfilled, (state, action) => {
			state.status = 'succeeded';
			const { id, completed } = action.payload;
			
			const changes = {
				id,
				changes: {completed}
			}

			todosAdapter.updateOne(state, changes);
		})
		.addCase(updateTodo.rejected, (state, action) => {
			state.status = 'rejected';
			state.error = action.error.message;
		})
		.addCase(deleteTodo.pending, (state, action) => {
			state.status = 'loading';
		})
		.addCase(deleteTodo.fulfilled, (state, action) => {
			state.status = 'succeeded';
			todosAdapter.removeOne(state, action.payload);
		})
		.addCase(deleteTodo.rejected, (state, action) => {
			state.status = 'rejected';
			state.error = action.error.message;
		})
	}
});

export const {selectAll: selectAllTodos, selectById: selectTodoById, selectIds: selectTodoIds} = todosAdapter.getSelectors(state => state.todos);

export default todosSlice.reducer;