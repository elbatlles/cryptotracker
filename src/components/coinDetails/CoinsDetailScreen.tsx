import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';

import {
  View,
  Text,
  Image,
  StyleSheet,
  SectionList,
  FlatList,
  Pressable,
  Alert,
} from 'react-native';
import {color} from 'react-native-reanimated';
import {Http} from '../../libs/https';
import Storage from '../../libs/storage';
import {colors} from '../../res/colors';
import {CoinMarketItems} from './CoinMarketItems';

interface Props {
  onPress: any;
  route: any;
}

export const CoinsDetailScreen: React.FC<Props> = props => {
  // const {coin} = props.route.params;
  const [coin, setcoin] = useState<coinT>(props.route.params.coin);
  const [markets, setmarkets] = useState();
  const [isfavorite, setisfavorite] = useState<any>();
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({title: coin.symbol});
    getMarket(coin);
  }, [coin]);

  useEffect(() => {
    getFavorite();
  }, []);
  const getMarket = async (coin: coinT) => {
    const url = `https://api.coinlore.net/api/coin/markets/?id=${coin.id}`;
    const markets = await Http.instance.get(url);
    console.log('!!');
    console.log(markets);

    setmarkets(markets);
  };
  const toogleFavorite = () => {
    if (isfavorite) {
      removeFavorite();
    } else {
      addFavorite();
    }
  };
  const addFavorite = async () => {
    const coinJson = JSON.stringify(coin);
    const key = `favorite-${coin.id}`;

    const stored = await Storage.instance.store(key, coinJson);
    console.log('entrem a add');
    console.log(stored);
    if (stored) {
      console.log(stored);
      setisfavorite(true);
    }
  };

  const removeFavorite = async () => {
    Alert.alert('Remove favorite', 'Are you sure?', [
      {text: 'cancel', onPress: () => {}, style: 'cancel'},
      {
        text: 'remove',
        onPress: async () => {
          const coinJson = JSON.stringify(coin);
          const key = `favorite-${coin.id}`;
          const stored = await Storage.instance.remove(key);
          console.log(stored);
          console.log('elminat');
          setisfavorite(null);
        },
        style: 'destructive',
      },
    ]);
  };
  const getFavorite = async () => {
    try {
      const key = `favorite-${coin.id}`;
      const favorite = await Storage.instance.get(key);
      console.log('get favorite fun');
      console.log(favorite);
      setisfavorite(favorite);
    } catch (error) {
      console.log(error);
    }
  };
  const sections = (coin: coinT) => {
    const data = [
      {
        title: 'Market cap',
        data: [coin.market_cap_usd],
      },
      {
        title: 'Volumne 24h',
        data: [coin.volume24],
      },
      {
        title: 'Change 24h',
        data: [coin.percent_change_24h],
      },
    ];

    return data;
  };
  const getSymbolIcon = (coin: coinT) => {
    if (coin) {
      return `https://c1.coinlore.com/img/16x16/${coin.nameid}.png`;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.subheader}>
        <View style={styles.row}>
          <Image style={styles.iconImg} source={{uri: getSymbolIcon(coin)}} />
          <Text style={styles.text}>{coin.name}</Text>
        </View>

        <Pressable
          onPress={toogleFavorite}
          style={[
            styles.btnFavorite,
            isfavorite ? styles.btnFavoriteRemove : styles.btnFavoriteAdd,
          ]}>
          <Text style={styles.btnFavoriteText}>
            {isfavorite ? 'Remove Favorite' : 'Add to Favorite'}{' '}
          </Text>
        </Pressable>
      </View>
      <SectionList
        style={styles.section}
        sections={sections(coin)}
        renderItem={({item}) => (
          <View style={styles.sectionItem}>
            <Text style={styles.itemText}>{item}</Text>
          </View>
        )}
        renderSectionHeader={({section}) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionText}>{section.title} </Text>
          </View>
        )}
        keyExtractor={(item: any) => item.data}
      />
      <Text style={styles.titleMarket}>Markets</Text>
      <FlatList
        style={styles.list}
        horizontal={true}
        renderItem={({item}) => <CoinMarketItems coin={item} />}
        data={markets}
        keyExtractor={item => `${item.base}-${item.name}-${item.quote}`}
      />
    </View>
  );
};

/*
  <View style={styles.sectionItem}>
            <Text style={styles.itemText}>{item.name}</Text>
          </View>
*/
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.charade,
    color: colors.white,
  },
  list: {
    maxHeight: 200,
  },
  row: {
    flexDirection: 'row',
  },
  subheader: {
    padding: 16,
    flexDirection: 'row',
    color: colors.white,
    backgroundColor: 'rgba(0,0,0,0.1)',
    justifyContent: 'space-between',
  },
  text: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  iconImg: {
    width: 25,
    height: 25,
  },
  sectionHeader: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    padding: 8,
  },
  sectionItem: {
    padding: 9,
  },
  itemText: {
    color: colors.white,
    fontSize: 14,
  },
  sectionText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  section: {
    maxHeight: 220,
  },
  titleMarket: {
    color: colors.white,
    fontSize: 16,
    marginBottom: 16,
    marginLeft: 12,
    fontWeight: 'bold',
  },
  btnFavorite: {
    padding: 8,
    borderRadius: 8,
  },
  btnFavoriteAdd: {
    backgroundColor: colors.picton,
  },
  btnFavoriteRemove: {
    backgroundColor: colors.carmine,
  },
  btnFavoriteText: {
    color: colors.white,
  },
});
export default CoinsDetailScreen;
