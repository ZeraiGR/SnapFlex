import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';

import { updatePost } from "./postsSlice";
import { selectPostById } from './postsSlice';
import { fetchPosts } from './postsSlice';

export const EditPostForm = () => {
	const { postId } = useParams();
	
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const postsStatus = useSelector(state => state.posts.status);
	const post = useSelector(state => selectPostById(state, postId));

	const [title, setTitle] = useState(post?.title ?? '');
  const [body, setBody] = useState(post?.body ?? '');

	useEffect(() => {
		if (postsStatus === 'idle') {
			dispatch(fetchPosts());
		}
	}, [postsStatus, dispatch]);

	useEffect(() => {
		if (post) {
			setTitle(post.title);
			setBody(post.body);
		}
	}, [post]);

  const onTitleChanged = e => setTitle(e.target.value);
  const onContentChanged = e => setBody(e.target.value);

  const onSavePostClicked = () => {
    if (title && body) {
      dispatch(updatePost({ id: +postId, title, body, userId: post.userId}));
      navigate(`/posts/${postId}`);
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
          value={body}
          onChange={onContentChanged}
        />
      </form>
      <button type="button" onClick={onSavePostClicked}>
        Save Post
      </button>
    </section>
  )
}