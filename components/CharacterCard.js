import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, saveFavorites } from '../redux/favoritesSlice';
import { SafeAreaView } from 'react-native-safe-area-context';

const CharacterCard = ({ characterUrl }) => {
  const [character, setCharacter] = useState(null);
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);

  const fetchCharacter = async () => {
    const response = await axios.get(characterUrl);
    setCharacter(response.data);
  };

  useEffect(() => {
    fetchCharacter();
  }, []);

  const handleFavorite = () => {
    dispatch(addFavorite(character));
    dispatch(saveFavorites([...favorites, character]));
  };

  return (
    <SafeAreaView>
      {character && (
        <>
          <Text >{character.name}</Text>
          <Text>{character.status}</Text>
          <Button title="Favori Ekle" onPress={handleFavorite} />
        </>
      )}
    </SafeAreaView>
  );
};

export default CharacterCard;
