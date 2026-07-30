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
    ImageBackground,
    Linking,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import type { WebView as WebViewType } from "react-native-webview";
 

const { width, height } = Dimensions.get("window");

const Students = () => {
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
          Student Resources
        </Text>
      </View>
      <View className="bg-white w-[100vw] h-[75%] justify-center items-center " style={{ height: (height - 208)}}>
        <ScrollView
          className="w-[100vw] h-96 bg-white flex-1 flex-col "
          style={{ height: height * 0.5 }}
        >
          <ImageBackground
            source={require("@/assets/images/bg-home.png")}
            className="flex-row flex-wrap justify-center items-start w-[100vw] h-[100vh]"

          >
            <Text className="z-20 font-barlow-semibold text-2xl text-whs-blue w-full text-center p-5 pb-0">
              Student Resources
            </Text>
            <Text className="z-20 font-source-serif-regular text-sm text-gray-700 w-full text-center p-8 pt-3">
              Welcome to the Student page where students are provided with
              important resources to help navigate through Waipahu High School
              life.
            </Text>

            <TouchableOpacity
              className="w-24 h-min mx-3 my-3 justify-center"
              onPress={() => router.push("/registrar")}
            >
              <Image
                source={require("@/assets/images/registrar.png")}
                style={{
                  tintColor: "#0b0b49",
                }}
                className="size-14 self-center"
              />
              <Text className="text-center font-barlow-semibold text-[#0b0b49] text-xs">
                Registrar
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="w-24 h-min mx-3 my-3 justify-center"
              onPress={() => {
                Linking.openURL(
                  "https://hawaii.infinitecampus.org/campus/hawaii.jsp",
                );
              }}
            >
              <Image
                source={require("@/assets/images/if.png")}
                style={{
                  tintColor: "#0b0b49",
                }}
                className="size-14 self-center"
              />
              <Text className="text-center font-barlow-semibold text-[#0b0b49] text-xs">
                Infinite Campus
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="w-24 h-min mx-3 my-3 justify-center"
              onPress={() => router.push("/bell")}
            >
              <Image
                source={require("@/assets/images/bell.png")}
                style={{
                  tintColor: "#0b0b49",
                }}
                className="size-14 self-center"
              />
              <Text className="text-center font-barlow-semibold text-[#0b0b49] text-xs">
                Bell Schedule
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="w-24 h-min mx-3 my-3 justify-center pt-5"
              onPress={() => router.push("/calendar")}
            >
              <Image
                source={require("@/assets/images/calender.png")}
                style={{
                  tintColor: "#0b0b49",
                }}
                className="size-14 self-center"
              />
              <Text className="text-center font-barlow-semibold text-[#0b0b49] text-xs">
                Calendar
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="w-24 h-min mx-3 my-3 justify-center pt-5"
              onPress={() => router.push("/clubs")}
            >
              <Image
                source={require("@/assets/images/clubs.png")}
                style={{
                  tintColor: "#0b0b49",
                }}
                className="size-14 self-center"
              />
              <Text className="text-center font-barlow-semibold text-[#0b0b49] text-xs">
                Clubs
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="w-24 h-min mx-3 my-3 justify-center pt-5"
              onPress={() => router.push("/news")}
            >
              <Image
                source={require("@/assets/images/news.png")}
                style={{
                  tintColor: "#0b0b49",
                }}
                className="size-14 self-center"
              />
              <Text className="text-center font-barlow-semibold text-[#0b0b49] text-xs">
                News
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="w-24 h-min mx-3 my-3 justify-center"
              onPress={() => router.push("/legacy")}
            >
              <Image
                source={require("@/assets/images/torch.png")}
                style={{
                  tintColor: "#0b0b49",
                }}
                className="size-14 self-center"
              />
              <Text className="text-center font-barlow-semibold text-[#0b0b49] text-xs">
                LEGACY
              </Text>
            </TouchableOpacity>
          </ImageBackground>
        </ScrollView>
      </View>
    </SafeAreaProvider>
  );
};

export default Students;
