import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { selectAllUsers } from './usersSlice';
import { selectPostByUser } from '../posts/postsSlice';
import { fetchPosts } from '../posts/postsSlice';

export const UserFlow = ({user}) => {
	const postCounter = useSelector(state => selectPostByUser(state, user.id));

	return (
		<li>
      <Link to={`/users/${user.id}`}>{user.name} {postCounter.length}</Link>
    </li>
	)
}

export const UsersList = () => {
  const users = useSelector(selectAllUsers);
	const dispatch = useDispatch();

	const postsStatus = useSelector(state => state.posts.status);

	useEffect(() => {
		if (postsStatus === 'idle') {
			dispatch(fetchPosts());
		}
	}, [postsStatus, dispatch]);
	
  const renderedUsers = users.map(user => <UserFlow key={user.id} user={user} />
  );

  return (
    <section>
      <h2>Users</h2>
      <ul>{renderedUsers}</ul>
			<Link className="button muted-button" to={'/'}>To home</Link>
    </section>
  )
}