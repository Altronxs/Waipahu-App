import {
    BarlowSemiCondensed_400Regular,
    BarlowSemiCondensed_400Regular_Italic,
    BarlowSemiCondensed_600SemiBold,
} from "@expo-google-fonts/barlow-semi-condensed";
import {
    NotoSerif_400Regular,
    NotoSerif_700Bold,
    NotoSerif_700Bold_Italic,
} from "@expo-google-fonts/noto-serif";
import {
    Roboto_400Regular,
    Roboto_700Bold,
    useFonts,
} from "@expo-google-fonts/roboto";
import {
    SourceSerifPro_400Regular,
    SourceSerifPro_400Regular_Italic,
    SourceSerifPro_600SemiBold,
    SourceSerifPro_700Bold,
    SourceSerifPro_700Bold_Italic,
} from "@expo-google-fonts/source-serif-pro";
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


  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    NotoSerif_400Regular,
    NotoSerif_700Bold,
    NotoSerif_700Bold_Italic,
    BarlowSemiCondensed_400Regular,
    BarlowSemiCondensed_400Regular_Italic,
    BarlowSemiCondensed_600SemiBold,
    SourceSerifPro_400Regular,
    SourceSerifPro_400Regular_Italic,
    SourceSerifPro_700Bold,
    SourceSerifPro_700Bold_Italic,
    SourceSerifPro_600SemiBold,
  });

  if (!fontsLoaded) {
    return (
      <View className="flex-1 justify-center items-center bg-[#17273d]">
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
      <View className="flex-row bg-[#17273d] h-[13rem] z-10 pt-44">
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
              tintColor: "#17273d",
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
