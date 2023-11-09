import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_MOCKAPI_BASE_URL;

export const useAuth0Service = () => {
  const {
    user,
    isAuthenticated,
    isLoading,
    loginWithRedirect,
    logout,
    getAccessTokenSilently,
    error: auth0Error,
  } = useAuth0();

  const [token, setToken] = useState(null);
  const [error, setError] = useState(auth0Error);

  const getUser = () => isAuthenticated ? user : null;

  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const accessToken = await getAccessTokenSilently();
        setToken(accessToken);
      } catch (error) {
        setError(error);
      }
    };

    if (isAuthenticated && !token) {
      fetchAccessToken();
    }
  }, [getAccessTokenSilently, isAuthenticated, token]);

  const isLoadingUser = isLoading || (isAuthenticated && !token);

  const signIn = () => {
    if (!isLoading && !isAuthenticated) {
      loginWithRedirect();
    }
  };

  const signOut = () => {
    logout({ returnTo: window.location.origin });
  };

  const ensureUserExistsInMockapi = async (user) => {
    const userId = user.sub;

    try {
      let response = await axios.get(`${API_BASE_URL}?auth0_user_id=${userId}`);

      let data = response.data;

      if (data.length === 0) {
        response = await axios.post(API_BASE_URL, {
          userId: userId,
          favorites: []
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        data = response.data;
        console.log('User created in mockapi:', data);
      } else {
        console.log('User already exists in mockapi:', data[0]);
      }

      return data[0];
    } catch (error) {
      console.error('Error ensuring user exists in mockapi:', error);
    }
  };

  useEffect(() => {
    if (isAuthenticated && token) {
      ensureUserExistsInMockapi(user, token);
    }
  }, [user, isAuthenticated, token]);

  return { getUser, isLoadingUser, error, signIn, signOut };
};
