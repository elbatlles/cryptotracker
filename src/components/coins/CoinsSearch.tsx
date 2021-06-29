import React, {useState} from 'react';
import {View, Text, TextInput, Platform, StyleSheet} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

interface Props {
  onCharge: Function;
}

const CoinsSearch = (props: Props) => {
  const [text, settext] = useState();
  const {onCharge} = props;
  const handleText = (query: any) => {
    console.log(query);
    settext(query);
    onCharge(query);
  };
  return (
    <View>
      <TextInput
        style={[
          styles.textInput,
          Platform.OS === 'ios' ? styles.textInputIOS : styles.textInputAndroid,
        ]}
        onChangeText={handleText}
        value={text}
        placeholder="Search coin"
        placeholderTextColor="#fff"></TextInput>
    </View>
  );
};
const styles = StyleSheet.create({
  textInput: {
    height: 46,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    paddingLeft: 16,
    color: '#fff',
  },
  textInputAndroid: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.zircon,
  },
  textInputIOS: {
    margin: 8,
    borderRadius: 8,
  },
});
export default CoinsSearch;
