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
import TitleBar from "@/components/titleBar";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import type { WebView as WebViewType } from "react-native-webview";

const { width, height } = Dimensions.get("window");
interface clubFeature {
  name: string;
  location: string;
  supervisor: string;
  description?: string;
}
interface clubDataResponse {
  clubData: clubFeature[];
}

const Clubs = () => {
  const webViewRef = useRef<WebViewType>(null);
  const router = useRouter();
  const [clubData, setClubData] = useState<clubDataResponse>(
    require("@/assets/json/clubData.json"),
  );

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
      <TitleBar></TitleBar>

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
          Clubs
        </Text>
      </View>
      <View className="bg-white w-[100vw] h-[75%] justify-center items-center">
        <ScrollView
          className="w-[100vw] h-96 bg-white flex-1 flex-col "
          style={{ height: height * 0.5 }}
        >
          <Image
            source={require("@/assets/images/myVoiceChoiceFuture.png")}
            className="self-center w-[40vw] h-[20vh] object-contain block z-10 m-[2.5vw]"
            resizeMode="contain"
          ></Image>
          <Text className="z-20 font-barlow-semibold text-2xl text-whs-blue w-full text-center relative bottom-7 p-5">
            HOME OF THE MARAUDERS
          </Text>
          <Text className="z-20 font-source-serif-italic text-base text-gray-700 w-full text-center relative bottom-16 p-8">
            Waipahu High School's vision is to provide student-centered
            educational programs that challenge all students to perform at their
            highest potential.
          </Text>
          <View className="relative bottom-16">
            {clubData.clubData?.map((feature, index) => (
              <React.Fragment key={index}>
                <View className="w-[100vw] p-3 border-t-[1px] border-gray-200">
                  <Text className="z-30 font-barlow-semibold text-whs-blue text-lg w-full relative left-2 p-5 pb-3 underline">
                    {feature.name}
                  </Text>
                  <View className="flex-row relative left-8">
                    <Image
                      source={require("@/assets/images/whs-map.png")}
                      className="w-7 h-7 object-contain relative"
                      style={{ tintColor: "gray" }}
                    />
                    <Text className="z-20 font-barlow-regular text-sm text-gray-700 pl-4 pr-4">
                      {feature.location}
                    </Text>
                    <Image
                      source={require("@/assets/images/registrar.png")}
                      className="w-14 h-10 object-center relative bottom-1 border-l-2 border-gray-200 pl-4"
                      style={{ tintColor: "gray" }}
                    />
                    <Text className="z-20 font-barlow-regular text-sm text-gray-700 pl-4">
                      {feature.supervisor}
                    </Text>
                  </View>

                  {feature.description && (
                    <Text className="z-20 font-barlow-regular text-xs text-gray-700 w-full p-6 pt-2">
                      {feature.description}
                    </Text>
                  )}
                </View>
              </React.Fragment>
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaProvider>
  );
};

export default Clubs;
