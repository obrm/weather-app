import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';

import Spinner from '../components/layout/Spinner';
import ErrorToast from '../components/ErrorToast';
import FavoriteItem from '../components/FavoriteItem';

import { useGlobalFavoritesContext } from '../hooks/useGlobalFavoritesContext';

const FavoritesPage = () => {
  const {
    getFavoritesWeather,
    favoritesWeatherItems,
    loading,
    favoritesItemsWeather,
    error
  } = useGlobalFavoritesContext();

  useEffect(() => {
    getFavoritesWeather();
  }, [getFavoritesWeather]);

  return (
    <>
      <Helmet>
        <title>Hero Weather Favorites</title>
      </Helmet>
      <div>
        <h2 className='text-center mb-5'>Favorites</h2>
        {loading ? (
          <Spinner />
        ) : error ? (
          <ErrorToast />
        ) : favoritesWeatherItems && favoritesWeatherItems.length === 0 ? (
          <h4>There are no favorites yet</h4>
        ) : (
          favoritesWeatherItems &&
          !loading &&
          favoritesItemsWeather && (
            <div className='favorites-grid text-center'>
              {favoritesItemsWeather.map((fav) => (
                <FavoriteItem
                  favoriteCityName={fav.favoriteCityName}
                  weather={fav.weather}
                  key={fav.key}
                  cityKey={fav.key}
                />
              ))}
            </div>
          )
        )}
      </div>
    </>
  );
};

export default FavoritesPage;
