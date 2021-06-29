import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SectionList,
  FlatList,
} from 'react-native';
import {Http} from '../../libs/https';
import {colors} from '../../res/colors';

interface Props {
  coin: coinT;
}

export const CoinMarketItems: React.FC<Props> = props => {
  const {coin} = props;
  return (
    <View style={styles.container}>
      <Text style={styles.nameText}>{coin.name} </Text>
      <Text style={styles.priceText}>{coin.price_usd}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderColor: colors.zircon,
    borderWidth: 1,
    padding: 16,
    margin: 8,
    alignItems: 'center',
    maxHeight: 100,
  },
  nameText: {
    color: colors.white,
    fontWeight: 'bold',
  },
  priceText: {
    color: colors.white,
  },
});
