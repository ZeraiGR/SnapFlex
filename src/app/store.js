import { configureStore } from '@reduxjs/toolkit';
import dictionatyReducer from '../features/dictionary/dictionarySlice';
import combinatorReducer from '../features/combinator/combinatorSlice';
import notebookReducer from '../features/notebook/notebookSlice';
import usersReducer from '../features/users/usersSlice';

export default configureStore({
  reducer: {
    dictionaty: dictionatyReducer,
		combinator: combinatorReducer,
		notebook: notebookReducer,
		users: usersReducer
  }
})