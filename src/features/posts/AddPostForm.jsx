import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addNewPost } from './postsSlice';
import { selectAllUsers } from '../users/usersSlice';

export const AddPostForm = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
	const [userId, setUserId] = useState(null);

	const dispatch = useDispatch();

	const users = useSelector(selectAllUsers);

  const onTitleChanged = e => setTitle(e.target.value);
  const onContentChanged = e => setBody(e.target.value);
	const onAuthorChanged = e => setUserId(e.target.value);

	const canSave = [title, body, userId].every(Boolean);

	const onSavePostClicked = async () => {
		await dispatch(addNewPost({title, body, userId: +userId})).unwrap();
		setTitle('');
		setBody('');
		setUserId('');
	}

	const usersOptions = users.map(user => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  return (
    <section>
      <h2>Add a New Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChanged}
        />
				<label htmlFor="postAuthor">Author:</label>
        <select id="postAuthor" value={userId || ''} onChange={onAuthorChanged}>
          <option value=""></option>
          {usersOptions}
        </select>
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={body}
          onChange={onContentChanged}
        />
        <button type="button" onClick={onSavePostClicked} disabled={!canSave}>
					Save Post
				</button>
      </form>
    </section>
  )
}