import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
class Aboutscreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Icon
          style={styles.menuIcon}
          name="back"
          size={30}
          color="lightgrey"
          onPress={() => {
            this.props.navigation.navigate('Home');
          }}
        />
        <Text style={styles.text}>Developed</Text>
        <Text style={styles.text}>with <Icon style={{marginLeft: 20}} name="heart" size={40} color="#EA0F0F" /> by</Text>
        <Text style={styles.text}>Anton Chepur</Text>
      </View>
    );
  }
}

export default Aboutscreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    color: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 60,
  },
  menuIcon: {
    position: 'absolute',
    top: 20,
    left: 20,
    // backgroundColor: '#000',
    // color: '#fff',
    zIndex: 999,
  },
});
