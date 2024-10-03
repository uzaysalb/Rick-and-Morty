import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, TextInput, TouchableOpacity, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import { addFavorite } from '../redux/favoriteCharactersSlice';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = ({ navigation }) => {
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const dispatch = useDispatch();

  const fetchEpisodes = async (pageNumber) => {
    const response = await fetch(`https://rickandmortyapi.com/api/episode?page=${pageNumber}`);
    const data = await response.json();
    setEpisodes(data.results);
    setTotalPages(data.info.pages);
    setLoading(false);
  };

  useEffect(() => {
    fetchEpisodes(page);
  }, [page]);

  const filteredEpisodes = episodes.filter(episode =>
    episode.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderEpisode = ({ item }) => (
    <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: "grey" }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={{ fontSize: 16, fontWeight: '400', color: 'white' }}>{item.name}</Text>
        <TouchableOpacity
          style={{ backgroundColor: 'green', padding: 8, borderRadius: 5 }}
          onPress={() => navigation.navigate('EpisodeDetail', { episodeId: item.id })}
        >
          <Text style={{ color: 'white', fontSize: 16 }}>Detay</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const handleCharacterPress = async (characterId) => {
    const response = await fetch(`https://rickandmortyapi.com/api/character/${characterId}`);
    const characterData = await response.json();
    dispatch(addFavorite(characterData));
    navigation.navigate('CharacterDetail', { character: characterData });
  };

  if (loading) {
    return <ActivityIndicator size="large" color="white" />;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
      <Text style={{ fontSize: 24, fontWeight: '700', letterSpacing:2, marginLeft: 10, color: 'white', marginBottom:10 }}>BÖLÜMLER</Text>
      <TextInput
        placeholder="Bölümleri Ara"
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={{ borderWidth: 1, margin: 10, padding: 10, borderRadius: 20, borderColor: 'grey', color: 'white', marginBottom:20 }}
        placeholderTextColor="grey"
      />
      <FlatList
        data={filteredEpisodes}
        renderItem={renderEpisode}
        keyExtractor={item => item.id.toString()}
        onEndReached={() => {
          if (page < totalPages) {
            setPage(page + 1);
          }
        }}
        onEndReachedThreshold={0.5}
      />
      <Button title="Öncekİ Sayfa" onPress={() => setPage(page > 1 ? page - 1 : 1)} color="green"  />
      <Button title="Sonrakİ Sayfa" onPress={() => setPage(page < totalPages ? page + 1 : totalPages)} color="darkred" />
    </SafeAreaView>
  );
};

export default HomeScreen;
