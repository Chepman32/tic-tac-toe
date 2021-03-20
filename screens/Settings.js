import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {
  SafeAreaView,
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Vibration,
} from 'react-native';

// import AsyncStorage
import AsyncStorage from '@react-native-community/async-storage';
import { constants } from '../constants/Constants';
import { IMLocalized } from '../localization';

export const App = ({navigation}) => {
  // To get the value from the TextInput
  const [textInputValue, setTextInputValue] = useState('');
  // To set the value on Text
  const saveValueFunction = (text) => {
    AsyncStorage.setItem('any_key_here', text);
    text === "On" && Vibration.vibrate(50)
  };
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
      <Icon
            style={styles.menuIcon}
            name="menuunfold"
            size={constants.MAX_WIDTH * 0.1}
            color="lightgrey"
            onPress={() => {
              navigation.openDrawer();
            }}
          />
        <TouchableOpacity
          onPress={() => saveValueFunction("On")}
          style={styles.buttonStyle}>
          <Text style={styles.buttonTextStyle}>{IMLocalized("VIBRATION ON")} </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => saveValueFunction("Off")}
          style={styles.buttonStyle}>
          <Text style={styles.buttonTextStyle}>{IMLocalized("VIBRATION OFF")} </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
    backgroundColor: '#000',
  },
  menuIcon: {
    position: 'absolute',
    top: constants.MAX_HEIGHT * 0.04,
    left: constants.MAX_HEIGHT * 0.03,
    // backgroundColor: '#000',
    // color: '#fff',
    zIndex: 999,
  },
  textStyle: {
    padding: 10,
    textAlign: 'center',
  },
  buttonStyle: {
    width: constants.MAX_WIDTH * 0.9,
    marginVertical: constants.MAX_HEIGHT * 0.15,
    padding: 10,
    overflow: "hidden",
    borderWidth: 4,
    borderColor: "#fff",
    borderRadius: 10
  },
  buttonTextStyle: {
    fontSize: constants.MAX_HEIGHT * 0.05,
    fontWeight: "600",
    textAlign: "center",
    color: "#fff"
  },
  textInputStyle: {
    textAlign: 'center',
    height: 40,
    width: '100%',
    borderWidth: 1,
    borderColor: 'green',
  },
});

export default App;
