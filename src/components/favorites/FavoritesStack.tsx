import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors} from '../../res/colors';
import AppStackNavigator from '../AppStackNavigator';
import FavoriteScreen from './FavoritesScreen';

interface Props {}

const Stack = createStackNavigator();
const FavoritesStack = (props: Props) => {
  return (
    <AppStackNavigator>
      <Stack.Screen name="Favorites" component={FavoriteScreen} />
    </AppStackNavigator>
  );
};

export default FavoritesStack;

const styles = StyleSheet.create({});
