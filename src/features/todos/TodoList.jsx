import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { selectTodoIds, selectTodoById, fetchTodos } from './todosSlice';
import { selectUserIds, selectUserById } from '../users/usersSlice';
import { updateTodo, deleteTodo } from './todosSlice';

const Todo = ({todoId, userIds}) => {
	const dispatch = useDispatch();

	const todoStatus = useSelector(state => state.todos.status);

	const todoIds = useSelector(selectTodoIds);

	const todo = useSelector(state => selectTodoById(state, todoId));
	const userId = userIds.find(id => id === todo.userId);
	const user = useSelector(state => selectUserById(state, userId));

	const switchTodo = (e) => {
		const updatedStatus = e.target.checked;
		dispatch(updateTodo({userId, id: todo.id, title: todo.title, completed: updatedStatus}));
	};

	const removeTodo = () => {
		dispatch(deleteTodo(+todoId));
	};

	return (
	<article className={classNames('todo')}>
		<h3>{todo.title}</h3>
		<p>Author: {user?.name || 'Unknown'}</p>
		<input checked={todo.completed} type="checkbox" onChange={switchTodo} />
		<button onClick={removeTodo}>
			delete
		</button>
	</article>
	);
}

export const TodoList = () => {
	const dispatch = useDispatch();
	const sortedTodoIds = useSelector(selectTodoIds);
	const userIds = useSelector(selectUserIds);

	const todoStatus = useSelector(state => state.todos.status);
	const error = useSelector(state => state.todos.error);

	useEffect(() => {
		if (todoStatus === 'idle') {
			dispatch(fetchTodos());
		}
	}, [todoStatus, dispatch]);

  return (
    <section className="todo-list">
      <h2>Todos</h2>
			{sortedTodoIds.map(todoId => <Todo  key={todoId} todoId={todoId} userIds={userIds} />
			)}
			{/* {todoStatus === 'loading' && <Spinner text="Loading..." />} */}
			{/* {todoStatus === 'failed' && <div>{error}</div>} */}
			<Link className="button muted-button" to={'/'}>To home</Link>
    </section>
  )
}