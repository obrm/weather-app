import React, { useState, useEffect } from 'react';
import { Button, Badge } from 'react-bootstrap';

import { useGlobalWeatherContext } from './../hooks/useGlobalWeatherContext';
import { useGlobalFavoritesContext } from './../hooks/useGlobalFavoritesContext';

const AddFavoriteButton = () => {
  const [isFavorite, setIsFavorite] = useState(false);

  const { currentWeatherCityName } = useGlobalWeatherContext();

  const { favoritesWeatherItems, removeFromFavorites, addToFavorites } = useGlobalFavoritesContext();

  useEffect(() => {
    let check = false;

    if (favoritesWeatherItems && favoritesWeatherItems.length > 0) {
      check = favoritesWeatherItems.find(
        (fav) => fav.favoriteCityName === currentWeatherCityName
      );
    }
    if (check) {
      setIsFavorite(true);
    }
  }, [currentWeatherCityName, favoritesWeatherItems]);

  const favoritesButtonHandler = () => {
    if (isFavorite) {
      removeFromFavorites(currentWeatherCityName);
      setIsFavorite(false);
    } else {
      addToFavorites(currentWeatherCityName);
    }
  };

  return (
    <Button variant='outline' onClick={favoritesButtonHandler}>
      <Badge variant='light'>
        {isFavorite ? (
          <i className='far fa-heart fa-2x' style={{ color: '#fff' }}></i>
        ) : (
          <i className='fas fa-heart fa-2x' style={{ color: '#f52f19' }}></i>
        )}
      </Badge>
      <span className='fav-text'>
        {isFavorite ? `Remove from favorites` : `Add to favorites`}
      </span>
    </Button>
  );
};

export default AddFavoriteButton;
