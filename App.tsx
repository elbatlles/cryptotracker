/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';

import {StyleSheet, Text, useColorScheme, View, Image} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {NavigationContainer} from '@react-navigation/native';
import CoinStacks from './src/components/coins/CoinsStacks';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {colors} from './src/res/colors';
import FavoritesStack from './src/components/favorites/FavoritesStack';

const Section: React.FC<{
  title: string;
}> = ({children, title}) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};
const Tabs = createBottomTabNavigator();
const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <NavigationContainer>
      <Tabs.Navigator
        tabBarOptions={{
          activeTintColor: '#0077b6',
          inactiveTintColor: colors.white,
          style: {
            backgroundColor: colors.blackPearl,
          },
        }}>
        <Tabs.Screen
          component={CoinStacks}
          name="Coins"
          options={{
            tabBarIcon: ({size, color}) => {
              return (
                <Image
                  style={{tintColor: color, width: size, height: size}}
                  source={require('./src/assets/bank.png')}
                />
              );
            },
          }}
        />
        <Tabs.Screen
          component={FavoritesStack}
          name="Favorites"
          options={{
            tabBarIcon: ({size, color}) => {
              return (
                <Image
                  style={{tintColor: color, width: size, height: size}}
                  source={require('./src/assets/star.png')}
                />
              );
            },
          }}
        />
      </Tabs.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
