import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import store from './redux/store';
import HomeScreen from './screens/HomeScreen';
import FavoriteCharactersScreen from './screens/FavoriteCharactersScreen';
import EpisodeDetailScreen from './screens/EpisodeDetailScreen';
import CharacterDetailScreen from './screens/CharacterDetailScreen'; 
import Dizi from './screens/Dizi';
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="Home" 
      component={HomeScreen} 
      options={{ headerShown: false }} 
    />
    <Stack.Screen 
      name="EpisodeDetail" 
      component={EpisodeDetailScreen} 
      options={{ headerShown: false }} 
    />
    <Stack.Screen 
      name="CharacterDetail" 
      component={CharacterDetailScreen} 
      options={{ headerShown: false }} 
    />
  </Stack.Navigator>
);

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: 'green',
            tabBarInactiveTintColor: 'gray',
            tabBarStyle: { backgroundColor: '#000000' },
          }}
        >
          <Tab.Screen 
            name="Dizi" 
            component={Dizi} 
            options={{
              tabBarIcon: ({ color, size }) => (
                <Icon name="film" color={color} size={size} />
              ),
            }} 
          />
          <Tab.Screen 
            name="Bölümler" 
            component={HomeStack} 
            options={{
              tabBarIcon: ({ color, size }) => (
                <Icon name="home" color={color} size={size} />
              ),
            }} 
          />
          <Tab.Screen 
            name="Favorilerim" 
            component={FavoriteCharactersScreen} 
            options={{
              tabBarIcon: ({ color, size }) => (
                <Icon name="heart" color={color} size={size} />
              ),
            }} 
          />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
