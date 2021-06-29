import {useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import storage from '../../libs/storage';
import Storage from '../../libs/storage';
import {colors} from '../../res/colors';
import {Coinsitems} from '../coins/Coinsitems';
import FavoritesEmptyState from './FavoritesEmptyState';

interface Props {
  navigation: any;
}

const Stack = createStackNavigator();
const FavoriteScreen = (props: Props) => {
  const [favorites, setfavorites] = useState<coinT[]>();
  const navigation = useNavigation();
  /*
  useEffect(() => {
    getFavorites();
  }, [props]);
*/
  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      getFavorites();
    });
    return unsubscribe;
  }, [navigation]);
  const getFavorites = async () => {
    try {
      const allkeys = await Storage.instance.getAllKeys();
      const keys = allkeys.filter(key => key.includes('favorite-'));

      const favs = await Storage.instance.multiGet(keys);
      console.log(keys);
      console.log(favs);

      const favorites = favs.map(fav => fav[1] !== null && JSON.parse(fav[1]));
      console.log(favorites);
      setfavorites(favorites);
    } catch (error) {}
  };
  const handlePress = (coin: coinT) => {
    console.log('go to:', coin);
    //props.navigation.navigate('CoinDetail', {coin});
    navigation.navigate('CoinDetail', {coin});

    //navigation.navigate('CoinDetail');
  };
  return (
    <View style={styles.container}>
      {favorites?.length == 0 ? null : (
        <FlatList
          renderItem={({item}) => (
            <Coinsitems onPress={() => handlePress(item)} item={item} />
          )}
          data={favorites}
        />
      )}
    </View>
  );
};

export default FavoriteScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.charade,
  },
});
