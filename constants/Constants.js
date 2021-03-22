import { AdMobInterstitial } from "expo-ads-admob";
import { Dimensions } from "react-native";

export const constants = {
  MAX_WIDTH: Dimensions.get("screen").width,
  MAX_HEIGHT: Dimensions.get("screen").height,
}
export async function showInterstitial() {
  await AdMobInterstitial.setAdUnitID('ca-app-pub-3940256099942544/1033173712')
  await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true});
  await AdMobInterstitial.showAdAsync();
}