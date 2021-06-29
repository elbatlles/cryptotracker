import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, Pressable} from 'react-native';
import {colors} from '../../res/colors';

interface Props {
  item: coinT;
  onPress?: any;
}

export const Coinsitems: React.FC<Props> = props => {
  const {item} = props;
  const {onPress} = props;
  const getImgArrow = () => {
    if (item.percent_change_1h > 0) {
      return require('../../assets/arrow_up.png');
    } else {
      return require('../../assets/arrow_down.png');
    }
  };

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.symbolText}>{item.symbol}</Text>
        <Text style={styles.nameText}>{item.name}</Text>
        <Text style={styles.priceText}>{`${item.price_usd} $`}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.percentText}>{item.percent_change_1h}</Text>
        <Image style={styles.imgIcon} source={getImgArrow()} />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomColor: colors.zircon,
    borderBottomWidth: 1,
    justifyContent: 'space-between',
    paddingLeft: 16,
    marginLeft: 0,
  },
  row: {
    flexDirection: 'row',
    marginTop: 5,
    marginBottom: 5,
  },
  symbolText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 12,
  },
  nameText: {
    color: colors.white,
    fontSize: 14,
    marginRight: 12,
  },
  percentText: {
    color: colors.white,
    fontSize: 14,
  },
  priceText: {
    color: colors.white,
    fontSize: 14,
  },
  imgIcon: {
    width: 22,
    height: 22,
    marginLeft: 12,
  },
});
