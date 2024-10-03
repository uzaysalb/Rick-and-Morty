import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  favorites: [],
};

const favoriteCharactersSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite(state, action) {
      const { id, name, image } = action.payload;
      if (state.favorites.length < 10) {
        state.favorites.push({ id, name, image });
      } else {
        alert("Favori karakter ekleme sayısını aştınız.");
      }
    },
    removeFavorite(state, action) {
      const id = action.payload;
      state.favorites = state.favorites.filter(character => character.id !== id);
    },
  },
});

export const { addFavorite, removeFavorite } = favoriteCharactersSlice.actions;
export default favoriteCharactersSlice.reducer;
