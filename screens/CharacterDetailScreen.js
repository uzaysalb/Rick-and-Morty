import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const CharacterDetailScreen = ({ route }) => {
  const { characterId } = route.params;
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCharacterDetails = async () => {
      const response = await fetch(`https://rickandmortyapi.com/api/character/${characterId}`);
      const data = await response.json();
      setCharacter(data);
      setLoading(false);
    };

    fetchCharacterDetails();
  }, [characterId]);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#00ff00" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{character.name}</Text>
      <View style={styles.imageContainer}>
        <Image source={{ uri: character.image }} style={styles.image} />
      </View>
      <Text style={styles.details}>Status: {character.status}</Text>
      <Text style={styles.details}>Species: {character.species}</Text>
      <Text style={styles.details}>Gender: {character.gender}</Text>
      <Text style={styles.details}>Origin: {character.origin.name}</Text>
      <Text style={styles.details}>Location: {character.location.name}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', 
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
    textAlign: "center",
    textTransform: "uppercase",
    letterSpacing: 3,
    borderBottomWidth: 1, 
    borderBottomColor: 'grey',
    paddingBottom: 10, 
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: 20, 
    width: '100%', 
    overflow: 'hidden', 
  },
  image: {
    width: '80%', 
    height: undefined, 
    aspectRatio: 1, 
    borderRadius: 10,
    borderWidth: 5, 
    borderColor:  '#00ff00', 
  },
  details: {
    marginTop:10,
    fontSize: 22,
    color: '#dddddd',
    fontWeight:"400",
  },
});

export default CharacterDetailScreen;
