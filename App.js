import React, {useEffect, useState} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {BackHandler, Alert, Vibration, StatusBar} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {DrawerContent} from './drawer/DrawerContent';
import {StyleSheet} from 'react-native';

import GameScreen from './screens/GameScreen';
import AboutScreen from './screens/AboutScreen';
import Settings from './screens/Settings';

function HomeScreen({navigation}) {
  return <GameScreen {...{navigation}} />;
}

function NotificationsScreen({navigation}) {
  return <AboutScreen {...{navigation}} />;
}

const Drawer = createDrawerNavigator();

export default function App() {
  const [initRender, setInitRender] = useState(true);

  useEffect(() => {
    const backAction = () => {
      Vibration.vibrate(50);
      Alert.alert('Hold on!', 'Are you sure you want to exit?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => BackHandler.exitApp()},
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerStyle={{...styles.drawer, width: initRender ? null : '70%'}}
        initialRouteName="Home"
        drawerContent={(props) => <DrawerContent {...props} />}>
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Settings" component={Settings} />
        <Drawer.Screen name="About" component={NotificationsScreen} />
      </Drawer.Navigator>
      <StatusBar hidden={true}/>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  drawer: {
    backgroundColor: '#000',
  },
});
