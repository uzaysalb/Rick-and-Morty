import { configureStore } from '@reduxjs/toolkit';
import favoriteCharactersReducer from './favoriteCharactersSlice';

const store = configureStore({
  reducer: {
    favorites: favoriteCharactersReducer,
  },
});

export default store;
