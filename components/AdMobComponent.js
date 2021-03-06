import {
    AdMobBanner,
    AdMobInterstitial,
    PublisherBanner,
    AdMobRewarded,
    setTestDeviceIDAsync,
  } from 'expo-ads-admob';
  import React, { Component } from 'react';
  import {StyleSheet, Text, View, Button} from 'react-native';
  export class AdMobComponent extends Component {
async componentDidMount() {
  await setTestDeviceIDAsync('EMULATOR');
  console.log(this.props)
}
componentDidUpdate() {
  this.props.donate && this.showRewarded()
}
  bannerError() {
      console.log('An error');
      return;
  }

  async showInterstitial() {
    await AdMobInterstitial.setAdUnitID('ca-app-pub-3940256099942544/1033173712')
    await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true});
    await AdMobInterstitial.showAdAsync();
  }
  _handlePress = async () => {
    await AdMobRewarded.showAdAsync();
    }
  async showRewarded() {
    await AdMobRewarded.setAdUnitID('ca-app-pub-3940256099942544/5224354917'); // Test ID, Replace with your-admob-unit-id
await AdMobRewarded.requestAdAsync();
await AdMobRewarded.showAdAsync();
  }
  render() {
      return (
          <View style={styles.container}>
              <Text>Open up App.js to start working on your app!</Text>
              <Button title="Interstitial"
                      onPress={this.showInterstitial}
                      containerViewStyle={styles.interstitialBanner}/>
                      <Text onPress={this.showRewarded} style={{fontSize: 40, color: "#fff"}} >Show</Text>
              <AdMobBanner
                  style={styles.bottomBanner}
                  bannerSize="fullBanner"
                  adUnitID="ca-app-pub-3940256099942544/6300978111" // Test ID, Replace with your-admob-unit-id
                  didFailToReceiveAdWithError={this.bannerError}/>
          </View>
      );
  }
  }
  const styles = StyleSheet.create({
    bottomBanner: {
      position: "absolute",
      bottom: 0,
      backgroundColor: "#ccc"
    },
  })