import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Helmet } from 'react-helmet';

import { useGlobalWeatherContext } from '../hooks/useGlobalWeatherContext';
import { useGlobalAutoCompleteContext } from '../hooks/useGlobalAutoCompleteContext';
import { useGlobalFavoritesContext } from '../hooks/useGlobalFavoritesContext';
import useGeolocation from './../hooks/useGeolocation';

import { weatherImageChooser } from './../utils/weatherImageChooser';

import Spinner from '../components/layout/Spinner';
import AddFavoriteButton from '../components/AddFavoriteButton';
import SearchBox from '../components/SearchBox';
import ErrorToast from '../components/ErrorToast';
import FiveDaysForecast from '../components/FiveDaysForecast';

const HomePage = () => {
  const [apiWeatherFields, setApiWeatherFields] = useState({
    WeatherText: null,
    WeatherIcon: null,
    Value: null,
  });

  const [cityNameField, setCityNameField] = useState('');

  const geolocationPosition = useGeolocation();

  const { getWeather, loading, error, currentWeather, currentWeatherCityName } = useGlobalWeatherContext();

  const { isSearch } = useGlobalAutoCompleteContext();

  const { showCityFromFavorites, favoriteCityName: cityFromFavorites } =
    useGlobalFavoritesContext();

  useEffect(() => {
    const defaultLocation = !isSearch && !showCityFromFavorites;
    const geolocationEnabled = geolocationPosition.coords && defaultLocation;

    if (geolocationEnabled) {
      const { latitude, longitude } = geolocationPosition.coords;
      getWeather({ latitude, longitude });
    } else if (defaultLocation) {
      getWeather({ latitude: null, longitude: null });
    }
  }, [geolocationPosition.coords, getWeather, isSearch, showCityFromFavorites]);

  useEffect(() => {
    if (cityFromFavorites) {
      setCityNameField(cityFromFavorites);
    } else if (currentWeatherCityName) {
      setCityNameField(currentWeatherCityName);
    }
  }, [cityFromFavorites, currentWeatherCityName]);

  useEffect(() => {
    if (currentWeather) {
      setApiWeatherFields({
        WeatherText: currentWeather.WeatherText,
        WeatherIcon: currentWeather.WeatherIcon,
        Value: currentWeather.Temperature.Metric.Value,
      });
    }
  }, [currentWeather]);

  const { WeatherText, WeatherIcon, Value } = apiWeatherFields;

  const roundedTemperature = Math.round(parseFloat(Value));

  const weatherImage = !loading
    ? weatherImageChooser(WeatherText)
    : 'cloudy-day';

  return (
    <>
      <Helmet>
        <title>Hero Weather ({cityNameField})</title>
      </Helmet>
      <Row className='justify-content-md-center mb-5'>
        <Col md='auto'>
          <SearchBox />
        </Col>
      </Row>
      {loading ? (
        <Spinner />
      ) : error ? (
        <ErrorToast />
      ) : (
        <div className='jumbotron'>
          <img
            src={`/img/weather-images/${weatherImage}.jpg`}
            alt=''
            className='weather-img'
            loading='lazy'
          />
          <div className='weather-icon'>
            <img
              src={`/img/weather-icons/${WeatherIcon}-s.png`}
              alt='weather icon'
              className='column'
              loading='lazy'
            />
            <div className='column'>
              <h4>{cityNameField} </h4>
              <p className='ml-2'>{roundedTemperature} &deg;</p>
            </div>
          </div>
          <div className='favorite-button'>
            <AddFavoriteButton />
          </div>
          <div className='weather-text'>
            <h1 className='l-heading'>{WeatherText}</h1>
          </div>
          <FiveDaysForecast />
        </div>
      )}
    </>
  );
};

export default HomePage;
