import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { selectPostById } from './postsSlice';
import { fetchPosts } from './postsSlice';

export const SinglePost = () => {
  const { postId } = useParams();
	const dispatch = useDispatch();

	const postsStatus = useSelector(state => state.posts.status);

	useEffect(() => {
		if (postsStatus === 'idle') {
			dispatch(fetchPosts());
		}
	}, [postsStatus, dispatch]);

  const post = useSelector(state => selectPostById(state, postId));

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
				<Link className="button muted-button" to={'/'}>To home</Link>
      </article>
    </section>
  )
}