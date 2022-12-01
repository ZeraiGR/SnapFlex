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
import { NoteList } from './features/notebook/NoteList';
import { SingleNote } from './features/notebook/SingleNote';
import { EditNoteForm } from './features/notebook/EditNoteForm';
import { fetchUsers } from './features/users/usersSlice';

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
					{path: "notebook", element: <NoteList />},
					{path: "notebook/:noteId", element: <SingleNote />},
					{path: "notebook/:noteId/edit", element: <EditNoteForm />}
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

