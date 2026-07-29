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
import { useFocusEffect } from "expo-router";
import {
    ActivityIndicator,
    Dimensions,
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
 
import { useRouter } from "expo-router";
import React, { useRef } from "react";
import type { WebView as WebViewType } from "react-native-webview";

const { width, height } = Dimensions.get("window");

const Author = () => {
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

      <View className="justify-center items-center bg-whs-gold ">
        <TouchableOpacity
          className="w-10 h-10 left self-start pt-3 z-30"
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
          Authors
        </Text>
      </View>
      <View className="bg-white w-[100vw] h-[75%] justify-center items-center ">
        <ScrollView
          className="w-[100vw] h-96 bg-white flex-1 flex-col "
          style={{ height: height * 0.5 }}
        >
          <View className="w-[100vw] p-3 border-t-[1px] border-gray-200">
            <Text className="z-30 font-barlow-semibold text-whs-blue text-lg w-full relative left-2 p-5 pb-3 underline">
              Layten Fernandez
            </Text>
            <View className="flex-row relative left-8">
              <Image
                source={require("@/assets/images/mk.png")}
                className="w-10 h-10 bottom-2 object-contain relative"
                style={{ tintColor: "gray" }}
              />
              <Text className="z-20 font-barlow-regular text-sm text-gray-700 pl-4 pr-4">
                Class of 2025
              </Text>
              <Image
                source={require("@/assets/images/instagram.png")}
                className="w-10 h-7 object-center relative bottom-1 border-l-2 border-gray-200 pl-4"
                style={{ tintColor: "gray" }}
              />
              <Text className="z-20 font-barlow-regular text-sm text-gray-700 pl-4">
                @layten_f
              </Text>
            </View>
            <Text className="z-20 font-barlow-regular text-xs text-gray-700 w-full p-6 pt-2"></Text>
          </View>
          <View className="w-[100vw] p-3 border-t-[1px] border-gray-200">
            <Text className="z-30 font-barlow-semibold text-whs-blue text-lg w-full relative left-2 p-5 pb-3 underline">
              Lander Jarvis Viernes
            </Text>
            <View className="flex-row relative left-8">
              <Image
                source={require("@/assets/images/mk.png")}
                className="w-10 h-10 bottom-2 object-contain relative"
                style={{ tintColor: "gray" }}
              />
              <Text className="z-20 font-barlow-regular text-sm text-gray-700 pl-4 pr-4">
                Class of 2025
              </Text>
            </View>
            <Text className="z-20 font-barlow-regular text-xs text-gray-700 w-full p-6 pt-2"></Text>
          </View>
          <View className="w-[100vw] p-3 border-t-[1px] border-gray-200">
            <Text className="z-30 font-barlow-semibold text-whs-blue text-lg w-full relative left-2 p-5 pb-3 underline">
              Justine John Claro
            </Text>
            <View className="flex-row relative left-8">
              <Image
                source={require("@/assets/images/mk.png")}
                className="w-10 h-10 bottom-2 object-contain relative"
                style={{ tintColor: "gray" }}
              />
              <Text className="z-20 font-barlow-regular text-sm text-gray-700 pl-4 pr-4">
                Class of 2025
              </Text>
              <Image
                source={require("@/assets/images/instagram.png")}
                className="w-10 h-7 object-center relative bottom-1 border-l-2 border-gray-200 pl-4"
                style={{ tintColor: "gray" }}
              />
              <Text className="z-20 font-barlow-regular text-sm text-gray-700 pl-4">
                @time2plytmr
              </Text>
            </View>
            <Text className="z-20 font-barlow-regular text-xs text-gray-700 w-full p-6 pt-2"></Text>
          </View>
          <View className="w-[100vw] p-3 border-t-[1px] border-gray-200">
            <Text className="z-30 font-barlow-semibold text-whs-blue text-lg w-full relative left-2 p-5 pb-3 underline">
              Ian Ramos
            </Text>
            <View className="flex-row relative left-8">
              <Image
                source={require("@/assets/images/mk.png")}
                className="w-10 h-10 bottom-2 object-contain relative"
                style={{ tintColor: "gray" }}
              />
              <Text className="z-20 font-barlow-regular text-sm text-gray-700 pl-4 pr-4">
                Class of 2025
              </Text>
              <Image
                source={require("@/assets/images/instagram.png")}
                className="w-10 h-7 object-center relative bottom-1 border-l-2 border-gray-200 pl-4"
                style={{ tintColor: "gray" }}
              />
              <Text className="z-20 font-barlow-regular text-sm text-gray-700 pl-4">
                @eeeyannnn
              </Text>
            </View>
            <Text className="z-20 font-barlow-regular text-xs text-gray-700 w-full p-6 pt-2"></Text>
          </View>
          <View className="w-[100vw] p-3 border-t-[1px] border-gray-200">
            <Text className="z-30 font-barlow-semibold text-whs-blue text-lg w-full relative left-2 p-5 pb-3 underline">
              Carl Nelson David
            </Text>
            <View className="flex-row relative left-8">
              <Image
                source={require("@/assets/images/mk.png")}
                className="w-10 h-10 bottom-2 object-contain relative"
                style={{ tintColor: "gray" }}
              />
              <Text className="z-20 font-barlow-regular text-sm text-gray-700 pl-4 pr-4">
                Class of 2025
              </Text>
              <Image
                source={require("@/assets/images/instagram.png")}
                className="w-10 h-7 object-center relative bottom-1 border-l-2 border-gray-200 pl-4"
                style={{ tintColor: "gray" }}
              />
              <Text className="z-20 font-barlow-regular text-sm text-gray-700 pl-4">
                @itsaflyingsheep
              </Text>
            </View>
            <Text className="z-20 font-barlow-regular text-xs text-gray-700 w-full p-6 pt-2"></Text>
          </View>
          <View className="w-[100vw] p-3 border-t-[1px] border-gray-200 pb-[8rem]">
            <Text className="z-30 font-barlow-semibold text-whs-blue text-lg w-full relative left-2 p-5 pb-3 underline">
              Kyle Alexander Baldovi
            </Text>
            <View className="flex-row relative left-8">
              <Image
                source={require("@/assets/images/il.png")}
                className="w-10 h-10 bottom-2 object-contain relative"
                style={{ tintColor: "gray" }}
              />
              <Text className="z-20 font-barlow-regular text-sm text-gray-700 pl-4 pr-4">
                Class of 2026
              </Text>
              <Image
                source={require("@/assets/images/instagram.png")}
                className="w-10 h-7 object-center relative bottom-1 border-l-2 border-gray-200 pl-4"
                style={{ tintColor: "gray" }}
              />
              <Text className="z-20 font-barlow-regular text-sm text-gray-700 pl-4">
                @kylealtxyz
              </Text>
            </View>
            <Text className="z-20 font-barlow-regular text-xs text-gray-700 w-full p-6 pt-2"></Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaProvider>
  );
};

export default Author;
