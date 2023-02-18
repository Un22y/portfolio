import { configureStore } from '@reduxjs/toolkit';
import charactersSlice from '../features/characters/charactersSlice';
import dataSlice from '../features/data/dataSlice';
import favoritesSlice from '../features/favorites/favoritesSlice';

export const store = configureStore({
  reducer: {
    data: dataSlice,
    characters: charactersSlice,
    favorites: favoritesSlice,
  },
});
