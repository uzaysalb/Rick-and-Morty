import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { removeFavorite } from '../redux/favoriteCharactersSlice'; 
import { SafeAreaView } from 'react-native-safe-area-context';

const FavoriteCharactersScreen = () => {
  const favorites = useSelector((state) => state.favorites.favorites); 
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    Alert.alert(
      "Sil",
      "Bu karakteri favorilerden silmek istediğinize emin misiniz?",
      [
        { text: "Hayır", style: "cancel" },
        { 
          text: "Evet", 
          onPress: () => dispatch(removeFavorite(id)) 
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Favori Karakterler</Text>
      {favorites.length === 0 ? (
        <Text style={styles.emptyMessage}>Henüz favorilediğiniz karakter yok.</Text>
      ) : (
        <FlatList
          data={favorites}
          renderItem={({ item }) => (
            <View style={styles.characterItem}>
              <Image source={{ uri: item.image }} style={styles.characterImage} />
              <Text style={styles.characterName}>{item.name}</Text>
              <TouchableOpacity 
                style={styles.deleteButton} 
                onPress={() => handleDelete(item.id)}
              >
                <Text style={styles.deleteButtonText}>Sil</Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
        />
      )}
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
  deleteButton: {
    backgroundColor: 'red',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: '#ffffff',
    fontSize: 16,
  },
  list: {
    paddingBottom: 20,
  },
  emptyMessage: {
    fontSize: 18,
    color: 'green',
    fontWeight:"500",
    marginTop: 20,
  },
});

export default FavoriteCharactersScreen;
