import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import HomePage from './pages/HomePage';
import FavoritesPage from './pages/FavoritesPage';
import PageNotFound from './pages/PageNotFound';
import SharedLayout from './components/layout/SharedLayout';

const routes = [
  {
    path: '/',
    element: <SharedLayout />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: 'favorites',
        element: <FavoritesPage />,
      },
      {
        path: '*',
        element: <PageNotFound />,
      },
    ]
  },
];

function App() {
  const router = createBrowserRouter(routes);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
