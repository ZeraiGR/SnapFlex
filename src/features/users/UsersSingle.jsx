import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import { selectPostByUser } from '../posts/postsSlice';
import { selectUserById } from './usersSlice';
import { fetchPosts } from '../posts/postsSlice';

export const UsersSingle = () => {
	const { userId } = useParams();
	const dispatch = useDispatch();

	const postsStatus = useSelector(state => state.posts.status);

	useEffect(() => {
		if (postsStatus === 'idle') {
			dispatch(fetchPosts());
		}
	}, [postsStatus, dispatch]);

	const user = useSelector(state => selectUserById(state, userId));

	const postsForUser = useSelector(state => selectPostByUser(state, userId));

	const postTitles = postsForUser.map(p => (
    <li key={p.id}>
      <Link to={`/posts/${p.id}`}>{p.title}</Link>
    </li>
  ));

	return (
		<section>
			<h2>{user?.name || 'loading...'}</h2>
			{postTitles}
		</section>
	)
}