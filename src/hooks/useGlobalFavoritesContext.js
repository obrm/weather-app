import { useContext } from "react";
import { FavoritesContext } from '../context/FavoritesContext';

export const useGlobalFavoritesContext = () => {
  return useContext(FavoritesContext);
};