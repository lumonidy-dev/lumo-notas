// index.js
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import Root, {
  loader as rootLoader,
  action as rootAction,
} from './routes/root';
import ErrorPage from './error-page';
import User, {
  loader as contactLoader,
  action as contactAction,
} from './routes/user';
import EditUser, {
  action as editAction,
} from './routes/edit';
import { action as destroyAction } from './routes/destroy';
import Index from './routes/index';
import './index.css';



// Configurar el enrutador
const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <Index />,
          },
          {
            path: "users/:contactId",
            element: <User />,
            loader: contactLoader,
            action: contactAction,
          },
          {
            path: "users/:contactId/edit",
            element: <EditUser />,
            loader: contactLoader,
            action: editAction,
          },
          {
            path: "users/:contactId/destroy",
            action: destroyAction,
            errorElement: <div> Oops! There was an error. </div>,
          },
        ]
      }

    ]
  },
]);

// Renderizar la aplicación
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
