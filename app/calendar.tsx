import {
  BarlowSemiCondensed_600SemiBold,
  useFonts,
} from "@expo-google-fonts/barlow-semi-condensed";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useRef } from "react";
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

const Calendar = () => {
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

  if (!fontsLoaded) {
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
          Calendar SY 25-26
        </Text>
        <View className="self-center items-center flex-row w-full flex-1 z-10">
          <WebView
            className="relative"
            style={{ width: width, flex: 1 }}
            ref={webViewRef}
            source={{
              uri: "https://www.waipahuhigh.org/apps/events/view_calendar.jsp",
            }}
          />
        </View>
      </View>
    </SafeAreaProvider>
  );
};

export default Calendar;
