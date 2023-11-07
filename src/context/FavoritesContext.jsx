import React, { createContext, useReducer, useCallback } from 'react';
import axios from 'axios';

import { getCityByName } from '../helper/getCityByName';
import { favoritesReducer } from '../reducers/favoritesReducer';
import { FAVORITE_ADD_ITEM, FAVORITE_ITEMS_WEATHER_FAIL, FAVORITE_ITEMS_WEATHER_REQUEST, FAVORITE_ITEMS_WEATHER_RESET, FAVORITE_ITEMS_WEATHER_SUCCESS, FAVORITE_REMOVE_ITEM } from '../constants/favoritesConstants';
import { CURRENT_WEATHER_URL } from '../constants/weatherConstants';

export const FavoritesContext = createContext();

const initialState = {
  favoritesWeatherItems: JSON.parse(localStorage.getItem('favorites')) || [],
  showCityFromFavorites: false,
  favoriteCityName: null,
  favoritesItemsWeather: [],
  loading: false,
  error: null,
};

export const FavoritesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(favoritesReducer, initialState);

  const addToFavorites = useCallback(async (favoriteCityName) => {
    dispatch({
      type: FAVORITE_ADD_ITEM,
      payload: { favoriteCityName },
    });
  }, []);

  const removeFromFavorites = useCallback((favoriteCityName) => {
    dispatch({
      type: FAVORITE_REMOVE_ITEM,
      payload: favoriteCityName,
    });
  }, []);

  const getFavoritesWeather = useCallback(async () => {
    dispatch({ type: FAVORITE_ITEMS_WEATHER_RESET });
    const favorites = state.favoritesWeatherItems;

    for (const favorite of favorites) {
      try {
        dispatch({ type: FAVORITE_ITEMS_WEATHER_REQUEST });
        const key = await getCityByName(favorite.favoriteCityName);
        const { data } = await axios.get(`${CURRENT_WEATHER_URL}${key}?apikey=${import.meta.env.VITE_ACCUWEATHER_KEY}`);
        dispatch({
          type: FAVORITE_ITEMS_WEATHER_SUCCESS,
          payload: {
            favoriteCityName: favorite.favoriteCityName,
            weather: data[0],
            key,
          },
        });
      } catch (error) {
        dispatch({
          type: FAVORITE_ITEMS_WEATHER_FAIL,
          payload: error,
        });
      }
    }
  }, [state.favoritesWeatherItems]);

  const value = {
    ...state,
    addToFavorites,
    removeFromFavorites,
    getFavoritesWeather,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};
