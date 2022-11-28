import { useSelector } from 'react-redux';

export const NoteAuthor = ({ userId }) => {
  const author = useSelector(state =>
    state.users.find(user => user.id === userId)
  );

  return <span>by {author ? author.name : 'Unknown author'}</span>
}