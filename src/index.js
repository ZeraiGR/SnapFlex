import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import store from './app/store';
import './primitive.css';
import Layout from './layout/Layout';
import ErrorPage from './layout/ErrorPage/ErrorPage';
import Index from './routes';
import { Combinator }  from './features/combinator/Combinator';
import { PostList } from './features/posts/PostList';
import { SinglePost } from './features/posts/SinglePost';
import { EditPostForm } from './features/posts/EditPostForm';
import { fetchUsers } from './features/users/usersSlice';
import { UsersList } from './features/users/UsersList';
import { UsersSingle } from './features/users/UsersSingle';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
		children: [
			{
				errorElement: <ErrorPage />,
				children: [
					{index: true, element: <Index />},
					{path: "combinator", element: <Combinator />},
					{path: "posts", element: <PostList />},
					{path: "posts/:postId", element: <SinglePost />},
					{path: "posts/:postId/edit", element: <EditPostForm />},
					{path: "users", element: <UsersList/>},
					{path: "users/:userId", element: <UsersSingle />}
				]
			}
		]
  },
]);

store.dispatch(fetchUsers());

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
);

