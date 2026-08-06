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

const Vision = () => {
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
      <View className="flex-row justify-center bg-[#17273d] h-[13rem] z-10 pt-44 gap-5 relative pl-10">
          <Image
              source={require("@/assets/images/whs-logo.png")}
              className="w-32 h-32 relative bottom-28"
          />
          <View className="w-48 h-28 bottom-20 items-start z-40 relative">
              <Text className="text-white font-barlow-semibold">MY VOICE</Text>
              <Text className="text-white ml-5 font-barlow-semibold"> MY CHOICE</Text>
              <Text className="text-white ml-12 font-barlow-semibold"> MY FUTURE</Text>
          </View>
      </View>

      <View className="justify-center items-center bg-whs-gold">
        <TouchableOpacity
          className="w-10 h-10 left self-start pt-3 z-30"
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
          Mission, Vision, & Beliefs
        </Text>
      </View>
      <View className="bg-white w-[100vw] h-[75%] justify-center items-center ">
        <ScrollView
          className="w-[100vw] h-96 bg-white flex-1 flex-col "
          style={{ height: height * 0.5 }}
        >
          <Text className="z-20 font-barlow-semibold text-2xl text-whs-blue w-full text-center relative p-7 bottom-4 pt-10">
            HOME OF THE MARAUDERS
          </Text>
          <Text className="z-20 font-source-serif-italic text-base text-gray-700 w-full text-center relative bottom-16 p-8">
            Waipahu High School's vision is to provide student-centered
            educational programs that challenge all students to perform at their
            highest potential.
          </Text>
          <View className="relative bottom-24 pb-[10rem]">
            <Text className="z-30 font-barlow-semibold text-whs-blue text-xl w-full text-center relative p-5">
              CLASS OF 2026
            </Text>
            <View className="flex-wrap flex-row justify-center items-center gap-3">
              <View className="w-[40vw] items-center justify-center px-4 bg-whs-blue h-[70vw]">
                <Text className="z-20 font-source-serif-italic text-white w-[33vw] text-3xl text-center pl-8 pr-8 self-center">
                  32
                </Text>
                <Text className="font-barlow-regular text-xs text-white text-center self-center">
                  Early College Olympians (graduating w/ AA)
                </Text>
              </View>
              <View className="w-[40vw] items-center justify-center px-4 bg-whs-blue h-[70vw]">
                <Text className="z-20 font-source-serif-italic text-white w-[33vw] text-3xl text-center pl-8 pr-8 self-center">
                  256
                </Text>
                <Text className="font-barlow-regular text-xs text-white text-center self-center">
                  Academic Honors
                </Text>
              </View>
              <View className="w-[40vw] items-center justify-center px-4 bg-whs-blue h-[70vw]">
                <Text className="z-20 font-source-serif-italic text-white w-[33vw] text-3xl text-center pl-8 pr-8 self-center">
                  321
                </Text>
                <Text className="font-barlow-regular text-xs text-white text-center self-center">
                  STEM & CTE Honors
                </Text>
              </View>
              <View className="w-[40vw] items-center justify-center px-4 bg-whs-blue h-[70vw]">
                <Text className="z-20 font-source-serif-italic text-white w-[33vw] text-3xl text-center pl-8 pr-8 self-center">
                  83
                </Text>
                <Text className="font-barlow-regular text-xs text-white text-center self-center">
                  Achieved Valedictorian Status (4.0 g.p.a)
                </Text>
              </View>
              <View className="w-[40vw] items-center justify-center px-4 bg-whs-blue h-[70vw]">
                <Text className="z-20 font-source-serif-italic text-white w-[33vw] text-3xl text-center pl-8 pr-8 self-center">
                  461
                </Text>
                <Text className="font-barlow-regular text-xs text-white text-center self-center">
                  Earned an Industry Certification
                </Text>
              </View>
              <View className="w-[40vw] items-center justify-center px-4 bg-whs-blue h-[70vw]">
                <Text className="z-20 font-source-serif-italic text-white w-[33vw] text-3xl text-center pl-8 pr-8 self-center">
                  117
                </Text>
                <Text className="font-barlow-regular text-xs text-white text-center self-center">
                  Seal of Biliteracy Awards - 34 with three languages & two with
                  four languages
                </Text>
              </View>
              <View className="w-[40vw] items-center justify-center px-4 bg-whs-blue h-[70vw]">
                <Text className="z-20 font-source-serif-italic text-white w-[40vw] text-3xl text-center pl-8 pr-8 self-center">
                  $28M
                </Text>
                <Text className="font-barlow-regular text-xs text-white text-center self-center">
                  In Merit-Based Scholarships
                </Text>
              </View>
            </View>
            <Text className="z-30 font-source-serif-600 text-whs-blue text-xl w-full text-center relative p-5">
              School Mission
            </Text>
            <Text className="z-20 font-source-serif-italic text-base text-gray-700 w-full text-center pl-8 pr-8">
              Waipahu High School prepares students for success in the 21st
              century by engaging them in rigorous and relevant learning
              opportunities that promote academic, physical, and emotional
              growth.
            </Text>
            <Text className="z-30 font-source-serif-600 text-whs-blue text-xl w-full text-center relative p-5">
              Vision of a Hawaii Public Graduate
            </Text>
            <Text className="z-20 font-source-serif-italic text-base text-gray-700 w-full text-center pl-8 pr-8">
              All Hawaii public school graduates will:
            </Text>
            <Text className="z-20 font-source-serif-regular text-sm text-gray-700 w-full relative left-5 pl-8 pr-8">
              - Realize their individual goals and aspirations
            </Text>
            <Text className="z-20 font-source-serif-regular text-sm text-gray-700 w-full relative left-5 pl-8 pr-8">
              - Possess the attitudes, knowledge and skills necessary to
              contribute positively and compete in a global society
            </Text>
            <Text className="z-20 font-source-serif-regular text-sm text-gray-700 w-full relative left-5 pl-8 pr-8">
              - Exercise the rights and responsibilities of citizenship
            </Text>
            <Text className="z-20 font-source-serif-regular text-sm text-gray-700 w-full relative left-5 pl-8 pr-8">
              - Pursue post-secondary education and/or careers without the need
              for remediation
            </Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaProvider>
  );
};

export default Vision;
