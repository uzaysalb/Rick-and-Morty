import React from 'react';
import { View, Button } from 'react-native';

const Pagination = ({ page, setPage }) => {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <Button title="Önceki" onPress={() => setPage(page - 1)} disabled={page === 1} />
      <Button title="Sonraki" onPress={() => setPage(page + 1)} />
    </View>
  );
};

export default Pagination;
