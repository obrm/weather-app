import { createContext, useReducer } from 'react';
import axios from 'axios';

import autoCompleteReducer from './../reducers/autoCompleteReducer';

import {
  AUTO_COMPLETE_FAIL,
  AUTO_COMPLETE_REQUEST,
  AUTO_COMPLETE_RESET,
  AUTO_COMPLETE_SUCCESS
} from '../constants/autoCompleteConstants';

export const AutoCompleteContext = createContext();

export const AutoCompleteProvider = ({ children }) => {
  const initialState = {
    results: [],
    isSearch: false,
    loading: false,
    error: null,
  };

  const [state, dispatch] = useReducer(autoCompleteReducer, initialState);

  const getAutoCompleteResults = async (query) => {
    dispatch({ type: AUTO_COMPLETE_REQUEST });
    try {
      const { data } = await axios.get(
        `https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${import.meta.env.VITE_ACCUWEATHER_KEY}&q=${query}`
      );

      dispatch({ type: AUTO_COMPLETE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: AUTO_COMPLETE_FAIL, payload: error.message });
    }
  };

  const autoCompleteReset = () => {
    dispatch({ type: AUTO_COMPLETE_RESET });
  }

  return (
    <AutoCompleteContext.Provider value={{ ...state, getAutoCompleteResults, autoCompleteReset }}>
      {children}
    </AutoCompleteContext.Provider>
  );
};
