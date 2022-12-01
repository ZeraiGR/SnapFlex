import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { AddNoteForm } from './AddNoteForm';
import { selectAllNotes } from './notebookSlice';
import { fetchPosts } from './notebookSlice';
import { Spinner } from '../../layout/Spinner/Spinner';

const Post = ({post, user}) => {
	return (
	<article className="note-excerpt" key={post.id}>
		<h3>{post.title}</h3>
		<p>Author: {user.name}</p>
		<p className="note-content">{post.body}</p>
		<Link to={`/notebook/${post.id}`}>Detail</Link>
	</article>
	);
}

export const NoteList = () => {
	const dispatch = useDispatch();
	const users = useSelector(state => state.users);
  const notes = useSelector(selectAllNotes);
	const sortedNotes = notes.slice().sort((a, b) => b.id - a.id);

	const noteStatus = useSelector(state => state.notebook.status);
	const error = useSelector(state => state.notebook.error);

	useEffect(() => {
		if (noteStatus === 'idle') {
			dispatch(fetchPosts());
		}
	}, [noteStatus, dispatch]);

  return (
    <section className="note-list">
      <h2>Posts</h2>
			<AddNoteForm />
      {noteStatus === 'loading' && <Spinner text="Loading..." />}
			{noteStatus === 'succeeded' && sortedNotes.map(post => {
				const user = users.find(u => u.id === post.userId);
				return <Post key={post.id} post={post} user={user} />
			})}
			{noteStatus === 'failed' && <div>{error}</div>}
			<Link className="button muted-button" to={'/'}>To home</Link>
    </section>
  )
}