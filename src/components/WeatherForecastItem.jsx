import { Card } from 'react-bootstrap';

import Spinner from './layout/Spinner';
import { weatherImageChooser } from './helper/weatherImageChooser';
import { useGlobalWeatherContext } from '../hooks/useGlobalWeatherContext';

const WeatherForecastItem = ({
  forecast: {
    Date: date,
    Temperature: {
      Maximum: { Value },
    },
    Day: { Icon, IconPhrase },
  },
}) => {
  const weekday = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  let day = new Date(date).getDay();

  day = weekday[day];

  const { loading, error } = useGlobalWeatherContext();

  const roundedTemperature = Math.round(parseFloat(Value));

  const weatherImage = !loading ? weatherImageChooser(IconPhrase) : 'cloudy-day';

  return (
    <>
      {loading ? (
        <Spinner margin='0 1rem 2rem' width='130px' />
      ) : error ? (
        <></>
      ) : (
        <Card className='img-fluid card-forecast'>
          <Card.Img
            src={`/img/weather-images/${weatherImage}.jpg`}
            alt='Card image'
            style={{ width: '100%' }}
            loading='lazy'
          />
          <Card.ImgOverlay className='text-center'>
            <h5 className='card-title'>{day}</h5>
            <p className='card-text'>{roundedTemperature} &deg;</p>
            <img
              src={`/img/weather-icons/${Icon}-s.png`}
              alt='weather icon'
              loading='lazy'
            />
          </Card.ImgOverlay>
        </Card>
      )}
    </>
  );
};

export default WeatherForecastItem;
