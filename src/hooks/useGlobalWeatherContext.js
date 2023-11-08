import { useContext } from "react";
import { WeatherContext } from '../context/WeatherContext';

export const useGlobalWeatherContext = () => {
  return useContext(WeatherContext);
};