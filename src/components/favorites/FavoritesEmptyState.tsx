import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface Props {}

const FavoritesEmptyState = (props: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>You don't have any favorite yet</Text>
    </View>
  );
};

export default FavoritesEmptyState;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    alignItems: 'center',
  },
});
