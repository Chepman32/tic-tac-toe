import AsyncStorage from '@react-native-community/async-storage';
import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  BackHandler,
  Platform,
} from 'react-native';

import Icon from 'react-native-vector-icons/AntDesign';
import { constants } from '../constants/Constants';
import { IMLocalized, init } from '../localization';

export function DrawerContent(props) {
  const [vibro, setVibro] = useState("")
  init()
  return (
    <View style={styles.drawer}>


      <TouchableOpacity
        style={styles.links}
        onPress={() => {
          props.navigation.navigate('Home', {
            vibro
          });
        }}>
        <Text style={styles.text}>{IMLocalized("Home")} </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.links}
        onPress={() => {
          props.navigation.navigate('About');
        }}>
        <Text style={styles.text}>{IMLocalized("About")} </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.links}
        onPress={() => {
          props.navigation.navigate('Settings');
        }}>
        <Text style={styles.text}>{IMLocalized("Settings")} </Text>
      </TouchableOpacity>
      {
        Platform.OS === "android" && <TouchableOpacity
        style={styles.links}
        onPress={() => {
          BackHandler.exitApp();
        }}>
        <Text style={styles.text}>{IMLocalized("Exit")} </Text>
      </TouchableOpacity>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  drawer: {
    flex: 1,
    width: constants.MAX_WIDTH * 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  links: {
    // backgroundColor: 'grey',
    marginVertical: constants.MAX_HEIGHT * 0.05,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 2,
  },
  text: {
    fontSize: constants.MAX_WIDTH * 0.05,
    color: '#fff',
  },
  icon: {
    alignSelf: 'center',
    marginTop: constants.MAX_HEIGHT * 0.1,
    marginBottom: constants.MAX_HEIGHT * 0.1,
  },
  footertext: {
    color: '#fff',
    opacity: 0.5,
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    alignItems: 'center',
    width: '100%',
  },
});
