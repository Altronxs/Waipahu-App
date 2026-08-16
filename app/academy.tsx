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
import { Button } from "expo-router/build/react-navigation";
import React, { useState, useCallback, useEffect } from "react";
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
  Linking,
  ScrollView,
  ImageBackground,
  RefreshControl,
  useWindowDimensions,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";


const openLink = (url: string) => {
  Linking.openURL(url).catch((error) => {
    console.error("Failed to open URL:", error);
  });
};
const Academy = () => {
  const { height } = useWindowDimensions();
  const router = useRouter();



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
    <SafeAreaProvider className="flex flex-col">
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
            accessibilityRole="button"
            accessibilityLabel="Go back"
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
            Academies of Waipahu High School
        </Text>
      </View>
      <View className="bg-white w-[100vw] h-[75%] justify-center items-center " style={{ height: (height - 208)}}>
        <ScrollView
          className="w-[100vw] h-96 bg-white flex-1 flex-col "
          style={{ height: height * 0.5 }}
          bounces={false}                
          overScrollMode="never"          
          scrollEventThrottle={16}       
          decelerationRate="normal"
        >
          <View className="flex flex-row justify-center items-center pt-3 pb-20 flex-wrap w-full gap-2">
            
            <Text className="z-20 font-barlow-semibold text-2xl/none text-whs-blue w-full text-center !pt-5">
              ACADEMIES OF
            </Text>
            <Text className="z-20 font-barlow-semibold text-2xl/none text-whs-blue w-[90%] text-center pb-5 border-b-2 border-black/10">
              WAIPAHU HIGH SCHOOL
            </Text>
            
            <ImageBackground
              source={require("@/assets/images/ql-bg1.png")}
              className="w-[30%] self-center overflow-hidden mt-6 aspect-[549/766]"
            >
              <TouchableOpacity className="absolute w-full h-full" onPress={() => openLink("https://www.waipahuhigh.org/apps/pages/index.jsp?uREC_ID=555316&type=d")}></TouchableOpacity>
            </ImageBackground>
            <ImageBackground
              source={require("@/assets/images/ql-bg2.png")}
              className="w-[30%] self-center overflow-hidden mt-6 aspect-[549/766] translate-y-5"
            >
              <TouchableOpacity className="absolute w-full h-full" onPress={() => openLink("https://www.waipahuhigh.org/apps/pages/index.jsp?uREC_ID=555305&type=d")}></TouchableOpacity>
            </ImageBackground>
            <ImageBackground
              source={require("@/assets/images/ql-bg3.png")}
              className="w-[30%] self-center overflow-hidden mt-6 aspect-[549/766]"
            >
              <TouchableOpacity className="absolute w-full h-full" onPress={() => openLink("https://www.waipahuhigh.org/apps/pages/index.jsp?uREC_ID=555317&type=d")}></TouchableOpacity>
            </ImageBackground>
            <ImageBackground
              source={require("@/assets/images/ql-bg4.png")}
              className="w-[30%] self-center overflow-hidden mt-6 aspect-[549/766]"
            >
              <TouchableOpacity className="absolute w-full h-full" onPress={() => openLink("https://www.waipahuhigh.org/apps/pages/index.jsp?uREC_ID=555312&type=d")}></TouchableOpacity>
            </ImageBackground>
            <ImageBackground
              source={require("@/assets/images/ql-bg5.png")}
              className="w-[30%] self-center overflow-hidden mt-6 aspect-[549/766] translate-y-5"
            >
              <TouchableOpacity className="absolute w-full h-full" onPress={() => openLink("https://www.waipahuhigh.org/apps/pages/index.jsp?uREC_ID=555318&type=d")}></TouchableOpacity>
            </ImageBackground>
            <ImageBackground
              source={require("@/assets/images/ql-bg6.png")}
              className="w-[30%] self-center overflow-hidden mt-6 aspect-[549/766]"
            >
              <TouchableOpacity className="absolute w-full h-full" onPress={() => openLink("https://www.waipahuhigh.org/apps/pages/index.jsp?uREC_ID=555345&type=d")}></TouchableOpacity>
            </ImageBackground>
          </View>
        </ScrollView>
      </View>
      
      
    </SafeAreaProvider>
  );
};


export default Academy;