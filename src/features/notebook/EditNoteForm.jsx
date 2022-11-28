import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { noteUpdated } from "./notebookSlice";
import { useParams, useNavigate } from 'react-router-dom';

export const EditNoteForm = () => {
	const { noteId } = useParams();

  const note = useSelector(state =>
    state.notebook.find(note => note.id === noteId)
  );

  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onTitleChanged = e => setTitle(e.target.value);
  const onContentChanged = e => setContent(e.target.value);

  const onSavePostClicked = () => {
    if (title && content) {
      dispatch(noteUpdated({ id: noteId, title, content }));
      navigate(`/notebook/${noteId}`);
    }
  }

  return (
    <section>
      <h2>Edit Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          placeholder="What's on your mind?"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
      </form>
      <button type="button" onClick={onSavePostClicked}>
        Save Post
      </button>
    </section>
  )
}