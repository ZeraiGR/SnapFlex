import { createSlice } from '@reduxjs/toolkit';

export const dictionarySlice = createSlice({
  name: 'dictionary',
  initialState: {
    definition: '',
		word: '',
		valid: null
  },
  reducers: {
    setWordDescr: (state, action) => {
      state.definition = action.payload.definition;
      state.word = action.payload.word;
      state.valid = action.payload.valid;
    },
  }
})

export const { setWordDescr } = dictionarySlice.actions;

export default dictionarySlice.reducer;

export const fetchWordDescr = word => {
  return async (dispatch) => {
    try {
      // const defenition = await userAPI.fetchById(word)
      // dispatch(setWordDescr(defenition))
    } catch (err) {
      // If something went wrong, handle it here
    }
  }
}