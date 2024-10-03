import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import RickveMorty from './RickveMorty';
import { SafeAreaView } from 'react-native-safe-area-context';

const Dizi = () => {
  return (
    <SafeAreaView style={styles.container}>
      <RickveMorty />
    </SafeAreaView>
  );
}

export default Dizi;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black', 
  },
});
