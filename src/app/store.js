import { configureStore } from '@reduxjs/toolkit';
import dictionatyReducer from '../features/dictionary/dictionarySlice';
import combinatorReducer from '../features/combinator/combinatorSlice';
import postsReducer from '../features/posts/postsSlice';
import usersReducer from '../features/users/usersSlice';
import todosReducer from '../features/todos/todosSlice';

export default configureStore({
  reducer: {
    dictionaty: dictionatyReducer,
		combinator: combinatorReducer,
		posts: postsReducer,
		users: usersReducer,
		todos: todosReducer
  }
})