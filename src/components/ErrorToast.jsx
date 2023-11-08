import { useState, useEffect } from 'react';
import { Toast } from 'react-bootstrap';
import { useGlobalWeatherContext } from '../hooks/useGlobalWeatherContext';
import { useGlobalFavoritesContext } from '../hooks/useGlobalFavoritesContext';

const ErrorToast = () => {
  const [show, setShow] = useState(false);

  const { error } = useGlobalWeatherContext();

  const { error: favoritesWeatherError } = useGlobalFavoritesContext();

  useEffect(() => {
    if (error || favoritesWeatherError) {
      setShow(true);
    }
  }, [error, favoritesWeatherError]);

  const hideToast = () => setShow(false);

  console.log(error);

  return (
    <Toast show={show} onClose={hideToast}>
      <Toast.Header>
        <img src='holder.js/20x20?text=%20' className='rounded mr-2' alt='' />
        <strong className='mr-auto'>Error</strong>
      </Toast.Header>
      <Toast.Body>
        <p>
          Ouch! We are sorry, but it seems that there is a {error.message} on our side.
        </p>
        <p>We are working on it and hope that it will be solved soon.</p>
        <p>Please try again later.</p>
      </Toast.Body>
    </Toast>
  );
};

export default ErrorToast;
