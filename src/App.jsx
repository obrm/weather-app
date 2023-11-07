import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

import Header from './components/Header';
import HomePage from './pages/HomePage';
import FavoritesPage from './pages/FavoritesPage';
import PageNotFound from './pages/PageNotFound';

// Create a router instance
const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/favorites',
    element: <FavoritesPage />,
  },
  {
    path: '*',
    element: <PageNotFound />,
  },
]);

function App() {
  return (
    <>
      <Header />
      <Container>
        <Row className='justify-content-md-center mt-5'>
          <Col md='auto'>
            <RouterProvider router={router} />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
