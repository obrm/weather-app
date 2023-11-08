import React, { createContext, useReducer, useCallback } from 'react';
import axios from 'axios';

import { errorHandler } from '../helper/errorHandler';
import { getCityByCoords } from '../helper/getCityByCoords';
import {
  CURRENT_WEATHER_URL,
  DEFAULT_CITY_NAME,
  DEFAULT_LOCATION,
  FIVE_DAYS_URL,
  WEATHER_FAIL,
  WEATHER_REQUEST,
  WEATHER_SUCCESS,
} from '../constants/weatherConstants';
import { weatherReducer } from '../reducers/weatherReducer';
import { GENERAL_RESET } from '../constants/generalConstants';

export const WeatherContext = createContext();

const initialState = {
  currentWeather: null,
  currentWeatherCityName: null,
  fiveDaysForecast: null,
  loading: false,
  error: null,
};

export const WeatherProvider = ({ children }) => {
  const [state, dispatch] = useReducer(weatherReducer, initialState);

  const getWeather = useCallback(async (weatherParams) => {
    try {
      dispatch({ type: WEATHER_REQUEST });

      let { latitude, longitude, location, cityName } = weatherParams;
      let cityNameFromGeolocation = '';

      if (latitude && longitude) {
        const data = await getCityByCoords(latitude, longitude);
        location = data.Key;
        cityNameFromGeolocation = data.EnglishName;
      }

      if (!location) {
        location = DEFAULT_LOCATION;
      }

      if (!cityName) {
        cityName = DEFAULT_CITY_NAME;
      }

      const getCurrentWeather = axios.get(
        `${CURRENT_WEATHER_URL}${location}?apikey=${import.meta.env.VITE_ACCUWEATHER_KEY}`
      );

      const getFiveDaysForecast = axios.get(
        `${FIVE_DAYS_URL}${location}?apikey=${import.meta.env.VITE_ACCUWEATHER_KEY}&metric=true`
      );

      const [currentWeather, fiveDaysForecast] = await Promise.all([
        getCurrentWeather,
        getFiveDaysForecast,
      ]);

      dispatch({
        type: WEATHER_SUCCESS,
        payload: {
          currentWeather: currentWeather.data[0],
          currentWeatherCityName: cityNameFromGeolocation ? cityNameFromGeolocation : cityName,
          fiveDaysForecast: fiveDaysForecast.data.DailyForecasts,
        },
      });
    } catch (error) {
      dispatch({
        type: WEATHER_FAIL,
        payload: errorHandler(error),
      });
    }
  }, []);

  const generalReset = () => {
    dispatch({ type: GENERAL_RESET });
  }

  const value = {
    ...state,    
    getWeather,
    generalReset
  };

  return (
    <WeatherContext.Provider value={value}>
      {children}
    </WeatherContext.Provider>
  );
};
