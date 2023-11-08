
import { useGlobalWeatherContext } from '../hooks/useGlobalWeatherContext';
import WeatherForecastItem from './WeatherForecastItem';

const FiveDaysForecast = () => {
  const { fiveDaysForecast, loading } = useGlobalWeatherContext();

  return (
    <div className='weather-forecast'>
      {!loading &&
        fiveDaysForecast &&
        fiveDaysForecast.map((forecast) => (
          <WeatherForecastItem key={forecast.EpochDate} forecast={forecast} />
        ))}
    </div>
  );
};

export default FiveDaysForecast;
