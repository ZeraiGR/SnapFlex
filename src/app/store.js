import { configureStore } from '@reduxjs/toolkit';
import dictionatyReducer from '../features/dictionary/dictionarySlice';
import combinatorReducer from '../features/combinator/combinatorSlice';

export default configureStore({
  reducer: {
    dictionaty: dictionatyReducer,
		combinator: combinatorReducer
  }
})