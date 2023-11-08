import { useContext } from "react";
import { AutoCompleteContext } from '../context/AutoCompleteContext';

export const useGlobalAutoCompleteContext = () => {
  return useContext(AutoCompleteContext);
};