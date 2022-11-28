import { createSlice } from '@reduxjs/toolkit';
import { sub } from 'date-fns';
import { nanoid } from '@reduxjs/toolkit';

const initialState = [
	{id: '1', title: 'First Notice!', content: 'Hello!', user: '0', date: sub(new Date(), { minutes: 10 }).toISOString(), reactions: {
      thumbsUp: 0,
      hooray: 0,
      heart: 0,
      rocket: 0,
      eyes: 0,
    }},
	{id: '2', title: 'Second Notice!', content: 'Hi there!', user: '2', date: sub(new Date(), { minutes: 5 }).toISOString(), reactions: {
      thumbsUp: 0,
      hooray: 0,
      heart: 0,
      rocket: 0,
      eyes: 0,
    }}
];

const notebookSlice = createSlice({
  name: 'notebook',
  initialState,
  reducers: {
		reactionAdded: (state, action) => {
			const { noteId, reaction } = action.payload;
			const existingNote = state.find(note => note.id === noteId);
			if (existingNote) {
        existingNote.reactions[reaction]++
      }
		},
    noteAdded: {
      reducer(state, action) {
				state.push(action.payload);
			},
			prepare(title, content, userId) {
				return {
					payload: {
						id: nanoid(),
						date: new Date().toISOString(),
						title,
						content,
						user: userId,
						reactions: {
              thumbsUp: 0,
              hooray: 0,
              heart: 0,
              rocket: 0,
              eyes: 0,
            },
					}
				}
			}
    },
		noteUpdated: (state, action) => {
			const {id, title, content} = action.payload;
			const existingNote = state.find(note => note.id === id);
			if (existingNote) {
				existingNote.title = title;
				existingNote.content = content;
			}
		}
  }
});

export const { noteAdded, noteUpdated, reactionAdded } = notebookSlice.actions;

export default notebookSlice.reducer;