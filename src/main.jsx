import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import AdminView, {
  loader as adminLoader,
  action as adminAction,
} from './routes/AdminView/AdminView';
import ErrorPage from './error-page';
import User, {
  loader as userLoader,
  action as userAction,
} from './routes/AdminView/user';
import EditUser, {
  action as editAction,
} from './routes/AdminView/edit';
import { action as destroyAction } from './routes/AdminView/destroy';
import IndexAdmin from './routes/AdminView/index';
import Root from './routes/Root/Root'; // Importar la vista de inicio de sesión
import './index.css';
import './global.css';

// Configurar el enrutador
const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      // Los hijos de la ruta '/' siempre se renderizarán
      {
        path: '/',
        element: <AdminView />,
        errorElement: <ErrorPage />,
        loader: adminLoader,
        action: adminAction,
        children: [
          {
            errorElement: <ErrorPage />,
            children: [
              {
                index: true,
                element: <IndexAdmin />,
              },
              {
                path: 'users/:userId',
                element: <User />,
                loader: userLoader,
                action: userAction,
              },
              {
                path: 'users/:userId/edit',
                element: <EditUser />,
                loader: userLoader,
                action: editAction,
              },
              {
                path: 'users/:userId/destroy',
                action: destroyAction,
                errorElement: <div>Oops! There was an error.</div>,
              },
            ],
          },
        ],
      },
    ],
  },
]);

// Renderizar la aplicación
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
