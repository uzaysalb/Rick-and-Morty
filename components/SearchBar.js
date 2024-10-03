import React from 'react';
import { TextInput, View } from 'react-native';

const SearchBar = ({ search, setSearch }) => {
  return (
    <View>
      <TextInput
        placeholder="Bölümleri ara..."
        value={search}
        onChangeText={setSearch}
        style={{ height: 40, borderColor: 'lightgrey', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 }}
      />
    </View>
  );
};

export default SearchBar;
