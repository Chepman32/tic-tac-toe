import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { AdMobComponent } from '../components/AdMobComponent';
import { IMLocalized, init } from '../localization';
class Aboutscreen extends Component {
  constructor(props) {
    super(props)
    init()
    this.state = {
      donate: true
    }
  }
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
        <Text style={styles.text}>{IMLocalized("Developed")} </Text>
        <Text style={styles.text}>
          {IMLocalized("with")} <Icon style={{marginLeft: 20}} name="heart" size={40} color="#EA0F0F" />{IMLocalized("by")}
          </Text>
        <Text style={styles.text}>Anton Chepur</Text>
        <TouchableOpacity onPess={() => this.setState({donate: true})}>
        <Text onPess={() => this.setState({donate: true})} style={styles.text}>Donate </Text>
        </TouchableOpacity>
        
        <AdMobComponent donate={this.state.donate} />
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
