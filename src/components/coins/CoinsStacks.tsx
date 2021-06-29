import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import CoinsScreen from './CoinsScreens';
import CoinsDetailScreen from '../coinDetails/CoinsDetailScreen';
import {colors} from '../../res/colors';
import AppStackNavigator from '../AppStackNavigator';
//import {Colors} from 'react-native/Libraries/NewAppScreen';
colors;
const Stack = createStackNavigator();

const CoinStacks = () => {
  return (
    <AppStackNavigator>
      <Stack.Screen name="Coins" component={CoinsScreen} />
      <Stack.Screen name="CoinDetail" component={CoinsDetailScreen} />
    </AppStackNavigator>
  );
};

export default CoinStacks;
