import { useDispatch } from 'react-redux';
import { reactionAdded } from './notebookSlice';

const reactionEmoji = {
  thumbsUp: '👍',
  hooray: '🎉',
  heart: '❤️',
  rocket: '🚀',
  eyes: '👀'
};

export const ReactionButtons = ({ note }) => {
	const dispatch = useDispatch();
	
  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <button key={name} type="button" className="muted-button reaction-button" onClick={() =>
          dispatch(reactionAdded({ noteId: note.id, reaction: name }))
        }>
        {emoji} {note.reactions[name]}
      </button>
    )
  })

  return <div>{reactionButtons}</div>
}
