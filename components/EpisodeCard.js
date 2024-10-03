import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';

const EpisodeCard = ({ episode, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View>
        <Text>{episode.name}</Text>
        <Text>{episode.air_date}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default EpisodeCard;
