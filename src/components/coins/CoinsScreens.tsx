import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  Pressable,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  FlatListProps,
} from 'react-native';
import {Http} from '../../libs/https';
import {colors} from '../../res/colors';
import {Coinsitems} from './Coinsitems';
import CoinsSearch from './CoinsSearch';

/*
const CoinsScreen: React.FC<{
  title: string;
}> = ({children, title}) => {*/
const CoinsScreen = (props: any) => {
  const navigation = useNavigation();
  let flatListRef = useRef(null);
  const [coins, setcoins] = useState<coinT[]>([]);
  const [allcoins, setallcoins] = useState<coinT[]>([]);
  const [loading, setloading] = useState(false);

  const getData = async () => {
    const coinsRes = await Http.instance.get(
      'https://api.coinlore.net/api/tickers/',
    );
    //let res = await gethttps('tickers');
    //setcoins(coinsRes.data);
    setallcoins(coinsRes.data);
    setcoins(coinsRes.data);
    console.log(coinsRes.data);
  };

  useEffect(() => {
    setloading(false);
    getData();
    setloading(true);
  }, []);
  //event: GestureResponderEvent
  const handlePress = (coin: coinT) => {
    console.log('go to:', coin);
    //props.navigation.navigate('CoinDetail', {coin});
    navigation.navigate('CoinDetail', {coin});

    //navigation.navigate('CoinDetail');
  };
  const handleSearch = (query: string) => {
    const coinsFilter = allcoins.filter(coin => {
      return (
        coin.name.toLowerCase().includes(query.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(query.toLowerCase())
      );
    });
    setcoins(coinsFilter);
    //navigation.navigate('CoinDetail');
  };
  return (
    <View style={styles.container}>
      <CoinsSearch onCharge={handleSearch} />
      {loading === false && <ActivityIndicator color="#fff" size="large" />}

      <FlatList
        renderItem={({item}) => (
          <Coinsitems onPress={() => handlePress(item)} item={item} />
        )}
        data={coins}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.charade,

    padding: 15,
  },
  titleText: {
    color: 'black',
    alignItems: 'center',
    fontSize: 20,
    marginTop: 15,
  },
  btn: {
    padding: 8,
    backgroundColor: 'blue',
    borderRadius: 8,
    margin: 16,
  },
  btnText: {
    color: colors.white,
    textAlign: 'center',
  },
});
export default CoinsScreen;
