import { Col } from 'react-bootstrap';

import { GENERAL_RESET } from '../redux/general/generalConstants';
import { useGlobalWeatherContext } from '../hooks/useGlobalWeatherContext';

const SearchResult = ({ result, setText }) => {
  const { getWeather, generalReset } = useGlobalWeatherContext();

  const onClickHandler = () => {
    generalReset();
    getWeather({ location: result.Key, cityName: result.LocalizedName });
    setText('');
  };

  return (
    <Col className='suggestion' onClick={onClickHandler}>
      {result.LocalizedName}
    </Col>
  );
};

export default SearchResult;
