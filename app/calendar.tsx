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
      <SafeAreaProvider className="flex-1 justify-center items-center bg-white">
        <SafeAreaView className="flex-row bg-[#0b0b49] h-28 z-30 pt-28 w-full">
          <ActivityIndicator size="large" color="#0b0b49" />
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider className="flex-col">
      <View className="flex-row bg-[#0b0b49] h-[13rem] z-10 pt-44">
        <Image
          source={require("@/assets/images/whs-logo.png")}
          className="w-32 h-32 relative bottom-28 left-11"
        />
        <View className="w-48 h-28 bottom-20 left-14 items-start z-40 relative">
          <Text className="text-white font-barlow-semibold">MY VOICE</Text>
          <Text className="text-white ml-5 font-barlow-semibold"> MY CHOICE</Text>
          <Text className="text-white ml-12 font-barlow-semibold"> MY FUTURE</Text>
        </View>
      </View>

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
