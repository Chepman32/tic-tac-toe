import React, { useState, useEffect } from 'react'
import SwitchSelector from "react-native-switch-selector"
import { View, Text, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { constants } from '../constants/Constants'
export default function Settings({}) {
  const [vibro, setVibro] = useState(storedVibro)
  const [storedVibro, setStoredVibro] = useState(false)
  useEffect(() => {
    getValue()
  }, [])
  const getValue = async () => {
    try {
      let value = await AsyncStorage.getItem("VIBRO")
      value = JSON.parse(value)
      setStoredVibro(value)
    }
    catch(e) {
      console.log("getValue", e)
    }
  }
  const setValue = async () => {
    try {
       await AsyncStorage.setItem("VIBRO", storedVibro.toString())
    }
    catch(e) {
      console.log("setValue", e)
    }
  }
  useEffect(() => {
    setValue()
    getValue()
  }, [storedVibro])
  const options = [
    { label: "On", value: true },
    { label: "Off", value: false },
  ];
  
  const toggleSwitch = () => {
    setVibro(!vibro)      
  }
  return (
    <View style={styles.container} >
      <View style={styles.item} >
        <Text style={styles.text}>Vibration</Text>
        <SwitchSelector
        value={storedVibro ? 0 : 1}
        onPress={toggleSwitch}
  options={options}
  initial={storedVibro ? 0 : 1}
  onPress={toggleSwitch}
/>
    </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 100,
    justifyContent: "space-around",
    alignItems: "center",
    paddingBottom: constants.MAX_HEIGHT * 0.1,
    backgroundColor: "#053646",
  },
  item: {
    width: constants.MAX_WIDTH * 0.9,
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
    padding: 10,
  },
  text: {
    fontSize: constants.MAX_HEIGHT * 0.05,
    fontWeight: "600",
    textAlign: "center",
    color: "#fff"
  }
})