import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AddNoteForm } from './AddNoteForm';

export const NoteList = () => {
  const notes = useSelector(state => state.notebook);
	const orderedNotes = notes.slice().sort((a, b) => b.date.localeCompare(a.date));

  const renderedNotes = orderedNotes.map(note => (
    <article className="note-excerpt" key={note.id}>
      <h3>{note.title}</h3>
      <p className="note-content">{note.content.substring(0, 100)}</p>
			<Link to={`/notebook/${note.id}`}>Detail</Link>
    </article>
  ))

  return (
    <section className="note-list">
      <h2>Posts</h2>
			<AddNoteForm />
      {renderedNotes || <div>No notes!</div>}
			<Link className="button muted-button" to={'/'}>To home</Link>
    </section>
  )
}