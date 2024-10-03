import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, FlatList, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';
import { addFavorite, removeFavorite } from '../redux/favoriteCharactersSlice';

const EpisodeDetailScreen = ({ route, navigation }) => {
  const { episodeId } = route.params;
  const [episode, setEpisode] = useState(null);
  const [loading, setLoading] = useState(true);
  const [characters, setCharacters] = useState([]);
  
  const favorites = useSelector((state) => state.favorites.favorites);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchEpisodeDetails = async () => {
      const response = await fetch(`https://rickandmortyapi.com/api/episode/${episodeId}`);
      const data = await response.json();
      setEpisode(data);
      setLoading(false);

      const characterPromises = data.characters.map(async (url) => {
        const characterResponse = await fetch(url);
        return characterResponse.json();
      });
      const characterData = await Promise.all(characterPromises);
      setCharacters(characterData);
    };

    fetchEpisodeDetails();
  }, [episodeId]);

  const handleCharacterPress = (characterId) => {
    navigation.navigate('CharacterDetail', { characterId });
  };

  const handleFavoritePress = (character) => {
    if (favorites.some(fav => fav.id === character.id)) {
      dispatch(removeFavorite(character.id));
      Alert.alert("Removed!", `${character.name} has been removed from your favorites.`);
    } else {
      if (favorites.length < 10) {
        dispatch(addFavorite(character));
        Alert.alert("Favorited!", `${character.name} has been added to your favorites.`);
      } else {
        Alert.alert("Limit Reached", "You can only favorite up to 10 characters.");
      }
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#00ff00" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{episode.name}</Text>
      <Text style={styles.details}>Air Date: {episode.air_date}</Text>
      <Text style={styles.details}>Episode: {episode.episode}</Text>

      <Text style={styles.characterTitle}>Characters:</Text>
      <FlatList
        data={characters}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleCharacterPress(item.id)}>
            <View style={styles.characterItem}>
              <Image source={{ uri: item.image }} style={styles.characterImage} />
              <Text style={styles.characterName}>{item.name}</Text>
              <TouchableOpacity onPress={() => handleFavoritePress(item)} style={styles.favoriteButton}>
                <Text style={styles.favoriteButtonText}>
                  {favorites.some(fav => fav.id === item.id) ? 'Favorileme' : 'Favorile'}
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1c1c',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
  },
  details: {
    fontSize: 18,
    color: '#dddddd',
    marginBottom: 5,
  },
  characterTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 20,
    marginBottom: 10,
  },
  characterItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    justifyContent: 'space-between',
  },
  characterImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  characterName: {
    fontSize: 18,
    color: '#fff',
    flex: 1,
  },
  favoriteButton: {
    backgroundColor: '#00ff00',
    borderRadius: 5,
    padding: 5,
    alignItems: 'center',
    marginLeft: 10,
  },
  favoriteButtonText: {
    color: '#000',
  },
  list: {
    paddingBottom: 20,
  },
});

export default EpisodeDetailScreen;
