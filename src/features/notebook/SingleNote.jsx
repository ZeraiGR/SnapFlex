import { useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { NoteAuthor } from './NoteAuthor';
import { TimeAgo } from './TimeAgo';
import { selectNoteById } from './notebookSlice';

export const SingleNote = () => {
  const { noteId } = useParams();

  const note = useSelector(state => selectNoteById(state, noteId));

  if (!note) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    )
  }

  return (
    <section>
      <article className="post">
        <h2>{note.title}</h2>
				<div>
          <NoteAuthor userId={note.user} />
          <TimeAgo timestamp={note.date} />
        </div>
        <p className="post-content">{note.content}</p>
				<Link to={`/notebook/${note.id}/edit`} className="button">
					Edit post
				</Link>
				<Link className="button muted-button" to={'/'}>To home</Link>
      </article>
    </section>
  )
}