import { createSlice } from '@reduxjs/toolkit';
import { API } from '../../api/api';

export const dictionarySlice = createSlice({
  name: 'dictionary',
  initialState: {
    definition: '',
		word: '',
		valid: true,
		isFetching: null
  },
  reducers: {
    setWordDescr: (state, action) => {
      state.definition = action.payload.definition;
      state.word = action.payload.word;
      state.valid = action.payload.valid;
    },
		startFetching: (state) => {
			state.isFetching = true;
		},
		finishFetching: (state) => {
			state.isFetching = false;
		}
  }
})

export const { setWordDescr, startFetching, finishFetching } = dictionarySlice.actions;

export default dictionarySlice.reducer;

export const fetchWordDescr = word => {
  return async (dispatch) => {
    try {
			dispatch(startFetching());
      const defenition = await API.dictionary.getDescr(word); 
      dispatch(finishFetching());
			dispatch(setWordDescr(defenition));
    } catch (err) {
			// dispatch(setWordDescr(defenition))
    }
  }
}

export const selectDefinition = (state) => state.dictionaty.definition;
export const selectWord = (state) => state.dictionaty.word;
export const selectValid = (state) => state.dictionaty.valid;
export const selectIsFetching = (state) => state.dictionaty.isFetching;
