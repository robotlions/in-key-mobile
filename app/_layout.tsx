import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import App from "./app";

SplashScreen.setOptions({
  duration: 1000,
  fade: true,
});

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    FigtreeRegular: require("../assets/fonts/Figtree-Regular.ttf"),
    FigtreeMedium: require("../assets/fonts/Figtree-Medium.ttf"),
    FigtreeSemiBold: require("../assets/fonts/Figtree-SemiBold.ttf"),
    FigtreeBold: require("../assets/fonts/Figtree-Bold.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <>
      <App />
      <StatusBar style="auto" />
    </>
  );
}
