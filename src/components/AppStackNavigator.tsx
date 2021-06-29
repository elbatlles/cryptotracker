import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors} from '../res/colors';

interface Props {
  children: any;
}
const Stack = createStackNavigator();
const AppStackNavigator = (props: Props) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.blackPearl,
          shadowOpacity: 0,
          shadowColor: colors.blackPearl,
        },
        headerTintColor: colors.white,
      }}>
      {props.children}
    </Stack.Navigator>
  );
};

export default AppStackNavigator;

const styles = StyleSheet.create({});
