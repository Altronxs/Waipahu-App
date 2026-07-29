import {
  BarlowSemiCondensed_600SemiBold,
  useFonts,
} from "@expo-google-fonts/barlow-semi-condensed";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import type { WebView as WebViewType } from "react-native-webview";
import { WebView } from "react-native-webview";
import TitleBar from "@/components/titleBar";

const { width, height } = Dimensions.get("window");

const Cafe = () => {
  const [menuUrl, setMenuUrl] = useState<string>("");
  const webViewRef = useRef<WebViewType>(null);
  const router = useRouter();

  useFocusEffect(
    React.useCallback(() => {
      if (webViewRef.current) {
        webViewRef.current.reload();
      }
    }, []),
  );

  let [fontsLoaded] = useFonts({
    BarlowSemiCondensed_600SemiBold,
  });

  useEffect(() => {
    const date = new Date();
    const month = date.getMonth();
    const year = date.getFullYear();
    const monthNames = [
      "JANUARY",
      "FEBRUARY",
      "MARCH",
      "APRIL",
      "MAY",
      "JUNE",
      "JULY",
      "AUGUST",
      "SEPTEMBER",
      "OCTOBER",
      "NOVEMBER",
      "DECEMBER",
    ];
    const formattedMonth = monthNames[month];
    const pdfUrl = `https://www.waipahuhigh.org/pdf/MONTHLY%20%20MENU%20${formattedMonth}-${year}.pdf`;
    setMenuUrl(pdfUrl);
    console.log(pdfUrl);
  }, []);

  if (!fontsLoaded || !menuUrl) {
    return (
      <View className="flex-1 justify-center items-center bg-[#0b0b49]">
        <Image
          source={require("@/assets/images/whs-logo.png")}
          className="size-32 mb-6 self-center"
        />
        <ActivityIndicator size="large" color="#ffffff" />
        <Text className="text-white mt-4 font-barlow-semibold text-center self-center">
          Loading...
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaProvider className="flex-col">
      <TitleBar></TitleBar>

      <View className="grow justify-center items-center bg-whs-gold">
        <TouchableOpacity
          className="w-10 h-10 left self-start pt-4 z-30"
          onPress={() => router.push("/")}
        >
          <Image
            source={require("@/assets/images/back.png")}
            style={{
              tintColor: "#0b0b49",
            }}
            className="size-10 self-center"
          />
        </TouchableOpacity>
        <Text className="z-20 font-barlow-semibold text-white w-full bg-whs-gold text-center relative bottom-5">
          Breakfast & Lunch Menu
        </Text>
        <View className="self-center items-center flex-row w-full flex-1 z-10">
          <WebView
            className="relative"
            style={{ width: width, flex: 1 }}
            ref={webViewRef}
            source={{ uri: menuUrl }}
          />
        </View>
      </View>
    </SafeAreaProvider>
  );
};

export default Cafe;
