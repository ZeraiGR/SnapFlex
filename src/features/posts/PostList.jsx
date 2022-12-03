import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { AddPostForm } from './AddPostForm';
import { selectPostById, selectPostIds, fetchPosts } from './postsSlice';
import { selectUserIds, selectUserById } from '../users/usersSlice';
import { Spinner } from '../../layout/Spinner/Spinner';

const PostExcerpt = ({postId, userIds}) => {
	const post = useSelector(state => selectPostById(state, postId));
	const userId = userIds.find(id => id === post.userId);
	const user = useSelector(state => selectUserById(state, userId));

	return (
	<article className="post-excerpt">
		<h3>{post.title}</h3>
		<p>Author: {user?.name || 'Unknown'}</p>
		<p className="post-content">{post.body}</p>
		<Link to={`/posts/${post.id}`}>Detail</Link>
	</article>
	);
}

export const PostList = () => {
	const dispatch = useDispatch();
	const sortedPostIds = useSelector(selectPostIds);
	const userIds = useSelector(selectUserIds);

	const postsStatus = useSelector(state => state.posts.status);
	const error = useSelector(state => state.posts.error);

	useEffect(() => {
		if (postsStatus === 'idle') {
			dispatch(fetchPosts());
		}
	}, [postsStatus, dispatch]);

  return (
    <section className="post-list">
      <h2>Posts</h2>
			<AddPostForm />
      {postsStatus === 'loading' && <Spinner text="Loading..." />}
			{postsStatus === 'succeeded' && sortedPostIds.slice(0, 10).map(postId => <PostExcerpt  key={postId} postId={postId} userIds={userIds} />
			)}
			{postsStatus === 'failed' && <div>{error}</div>}
			<Link className="button muted-button" to={'/'}>To home</Link>
    </section>
  )
}