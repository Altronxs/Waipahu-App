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

type IconItem = {
  label: string;
  image: any;
  onPress: () => void;
};

const Students = () => {
  const webViewRef = useRef<WebViewType>(null);
  const router = useRouter();

  const studentSections: { title: string; items: IconItem[] }[] = [
    {
      title: "School Info",
      items: [
        { label: "Bell Schedule", image: require("@/assets/images/bell.png"), onPress: () => router.push("/bell") },
        { label: "Calendar", image: require("@/assets/images/calendar.png"), onPress: () => router.push("/calendar") },
        { label: "News", image: require("@/assets/images/news.png"), onPress: () => router.push("/news") },
      ],
    },
    {
      title: "Records & Admin",
      items: [
        { label: "Registrar", image: require("@/assets/images/registrar.png"), onPress: () => router.push("/registrar") },
        {
          label: "Infinite Campus",
          image: require("@/assets/images/if.png"),
          onPress: () => Linking.openURL("https://hawaii.infinitecampus.org/campus/hawaii.jsp"),
        },
      ],
    },
    {
      title: "Campus Life",
      items: [
        { label: "Clubs", image: require("@/assets/images/clubs.png"), onPress: () => router.push("/clubs") },
        { label: "Socials", image: require("@/assets/images/socials.png"), onPress: () => router.push("/legacy") },
      ],
    },
  ];

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

      <View className="justify-center items-center bg-whs-gold ">
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
          Student Resources
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

            {studentSections.map((section) => (
              <View key={section.title} className="w-full mt-2 px-4">
                <Text className="font-barlow-semibold text-whs-blue text-base mb-2 text-center">
                  {section.title}
                </Text>
                <View className="flex-row flex-wrap justify-center">
                  {section.items.map((item) => (
                    <TouchableOpacity
                      key={item.label}
                      className="w-1/4 h-min  justify-center items-center"
                      onPress={item.onPress}
                    >
                      <Image
                        source={item.image}
                        style={{
                          tintColor: "#17273d",
                        }}
                        className="size-14 self-center"
                      />
                      <Text className="text-center font-barlow-semibold text-[#17273d] text-xs">
                        {item.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            ))}
          </ImageBackground>
        </ScrollView>
      </View>
    </SafeAreaProvider>
  );
};

export default Students;