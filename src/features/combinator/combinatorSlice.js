import { createSlice } from '@reduxjs/toolkit';

export const combinatorSlice = createSlice({
  name: 'combinator',
  initialState: {
    verb: '',
		bundle: ''
  },
  reducers: {
    generateTask: (state, action) => {
      state.verb = action.payload;
			state.bundle = action.payload;
    },
  }
})

export const { updateVerb, updateBundle } = combinatorSlice.actions;

export default combinatorSlice.reducer;