import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link, useNavigate } from 'react-router-dom';

import { selectPostById, fetchPosts, deletePost } from './postsSlice';

export const SinglePost = () => {
  const { postId } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const postsStatus = useSelector(state => state.posts.status);

	useEffect(() => {
		if (postsStatus === 'idle') {
			dispatch(fetchPosts());
		}
	}, [postsStatus, dispatch]);

  const post = useSelector(state => selectPostById(state, postId));

	const removePost = () => {
		dispatch(deletePost(+postId));
		navigate('/posts');
	}

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    )
  }

  return (
    <section>
      <article className="post">
        <h2>{post.title}</h2>
        <p className="post-content">{post.content}</p>
				<Link to={`/posts/${post.id}/edit`} className="button">
					Edit post
				</Link>
				<button onClick={removePost} type='button'>Delete post</button>
				<Link className="button muted-button" to={'/'}>To home</Link>
      </article>
    </section>
  )
}