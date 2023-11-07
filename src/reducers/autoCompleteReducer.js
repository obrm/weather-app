import { GENERAL_RESET } from './../constants/generalConstants';
import {
  AUTO_COMPLETE_FAIL,
  AUTO_COMPLETE_REQUEST,
  AUTO_COMPLETE_RESET,
  AUTO_COMPLETE_SUCCESS
} from '../constants/autoCompleteConstants';

const autoCompleteReducer = (state, action) => {
  switch (action.type) {
    case AUTO_COMPLETE_REQUEST:
      return { ...state, loading: true };
    case AUTO_COMPLETE_SUCCESS:
      return { ...state, loading: false, results: action.payload, isSearch: true };
    case AUTO_COMPLETE_FAIL:
      return { ...state, loading: false, error: action.payload };
    case GENERAL_RESET:
    case AUTO_COMPLETE_RESET:
      return { ...state, results: [], loading: false, error: null };
    default:
      return state;
  }
};

export default autoCompleteReducer;