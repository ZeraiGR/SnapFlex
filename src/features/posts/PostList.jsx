import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { AddPostForm } from './AddPostForm';
import { selectAllPosts } from './postsSlice';
import { fetchPosts } from './postsSlice';
import { Spinner } from '../../layout/Spinner/Spinner';

const Post = ({post, user}) => {
	return (
	<article className="post-excerpt" key={post.id}>
		<h3>{post.title}</h3>
		<p>Author: {user.name}</p>
		<p className="post-content">{post.body}</p>
		<Link to={`/posts/${post.id}`}>Detail</Link>
	</article>
	);
}

export const PostList = () => {
	const dispatch = useDispatch();
	const users = useSelector(state => state.users);
  const posts = useSelector(selectAllPosts);
	const sortedPosts = posts.slice().sort((a, b) => b.id - a.id);

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
			{postsStatus === 'succeeded' && sortedPosts.slice(0, 10).map(post => {
				const user = users.find(u => u.id === post.userId);
				return <Post key={post.id} post={post} user={user} />
			})}
			{postsStatus === 'failed' && <div>{error}</div>}
			<Link className="button muted-button" to={'/'}>To home</Link>
    </section>
  )
}