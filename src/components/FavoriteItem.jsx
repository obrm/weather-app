import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import { weatherImageChooser } from './../utils/weatherImageChooser';
import { useGlobalWeatherContext } from '../hooks/useGlobalWeatherContext';
import { useGlobalFavoritesContext } from '../hooks/useGlobalFavoritesContext';

const FavoriteItem = ({
  favoriteCityName,
  cityKey,
  weather: {
    WeatherText,
    WeatherIcon,
    Temperature: {
      Metric: { Value },
    },
  },
}) => {
  const navigate = useNavigate();

  const { getWeather } = useGlobalWeatherContext();

  const { showFavoriteItems } = useGlobalFavoritesContext();

  const roundedTemperature = Math.round(parseFloat(Value));

  const weatherImage = weatherImageChooser(WeatherText);

  const onClickHandler = () => {
    showFavoriteItems(favoriteCityName);
    getWeather({ location: cityKey, cityName: favoriteCityName });
    navigate('/');
  };

  return (
    <Card
      className='img-fluid'
      style={{ width: '15rem', height: '160px', cursor: 'pointer' }}
      onClick={onClickHandler}
    >
      <Card.Img
        src={`/img/weather-images/${weatherImage}.jpg`}
        alt='Weather image'
        style={{ width: '100%' }}
        loading='lazy'
      />
      <Card.ImgOverlay className='text-center'>
        <h3 style={{ fontSize: '1.5rem' }}>
          {favoriteCityName.length > 17
            ? `${favoriteCityName.slice(0, 15)}...`
            : favoriteCityName}
        </h3>
        <img
          src={`/img/weather-icons/${WeatherIcon}-s.png`}
          alt='weather icon'
          className='column'
          loading='lazy'
        />
        <p className='card-text-favorite'>{roundedTemperature} &deg;</p>
      </Card.ImgOverlay>{' '}
    </Card>
  );
};

export default FavoriteItem;
