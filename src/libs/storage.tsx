import AsyncStorage from '@react-native-async-storage/async-storage';

class Storage {
  static instance = new Storage();

  store = async (key: any, value: any) => {
    console.log('dins store:::');
    try {
      console.log('dins tryy:::');
      await AsyncStorage.setItem(key, value);

      return true;
    } catch (error) {
      console.log('error:::');
      console.log('error', error);
    }
  };
  get = async (key: any) => {
    try {
      return await AsyncStorage.getItem(key);
    } catch (error) {
      console.log('error', error);
      throw Error(error);
    }
  };
  multiGet = async (keys: any) => {
    try {
      const keysM = await AsyncStorage.multiGet(keys);
      return keysM;
    } catch (error) {
      console.log('storage multi get', error);
      throw Error(error);
    }
  };
  getAllKeys = async () => {
    try {
      return await AsyncStorage.getAllKeys();
    } catch (error) {
      console.log('storage Get allkeys', error);
      throw Error(error);
    }
  };
  remove = async (key: any) => {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (error) {
      console.log('error', error);
      return false;
    }
  };

  clean = async (key: any) => {
    try {
      await AsyncStorage.clear();
      return true;
    } catch (error) {
      console.log('error', error);
      return false;
    }
  };
}

export default Storage;
