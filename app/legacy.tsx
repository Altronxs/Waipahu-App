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

type SocialItem = {
  label: string;
  image: any;
  url: string;
};

const officialAccounts: SocialItem[] = [
  {
    label: "Waipahu High School",
    image: require("@/assets/images/social/whs.jpg"),
      url: "https://www.instagram.com/waipahuhighmarauders/",
  },
  {
    label: "WHS Student Government",
    image: require("@/assets/images/social/whs-gov.jpg"),
      url: "https://www.instagram.com/waipahuhigh.stugov/",
  },
];

// Sorted newest class (highest year) to oldest
const classLegacyAccounts: SocialItem[] = [
  {
    label: "legacy.808",
    image: require("@/assets/images/social/legacy.jpg"),
    url: "https://www.instagram.com/legacy.808/",
  },
  {
    label: "Legendary Leviathans '30",
    image: require("@/assets/images/social/ll30.jpg"),
    url: "https://www.instagram.com/legendaryleviathans/",
  },
  {
    label: "Divine Crusaders '29",
    image: require("@/assets/images/social/dc29.jpg"),
    url: "https://www.instagram.com/div2ne_crus9ders/",
  },
  {
    label: "Valient Vipers '28",
    image: require("@/assets/images/social/vv28.jpg"),
    url: "https://www.instagram.com/vali2nt.vip8rs/",
  },
  {
    label: "Moonlight Soldiers '27",
    image: require("@/assets/images/social/ms27.jpg"),
      url: "https://www.instagram.com/moonlightsoldiers27/",
  },
  {
    label: "Immortal Lions '26",
    image: require("@/assets/images/social/il26.jpg"),
    url: "https://www.instagram.com/immortal.lions26/",
  },
  {
    label: "Mystic Knights '25",
    image: require("@/assets/images/social/mk25.jpg"),
    url: "https://www.instagram.com/mk25_decisions/",
  },
  {
    label: "Menacing Thunderbirds '24",
    image: require("@/assets/images/social/mt24.jpg"),
    url: "https://www.instagram.com/m2n4cing.thunderbirds/",
  },
  {
    label: "Midnight Warriors '23",
    image: require("@/assets/images/social/mw23.jpg"),
    url: "https://www.instagram.com/midnightwarriors23/",
  },
  {
    label: "Fearless Huskies '22",
    image: require("@/assets/images/social/fh22.jpg"),
    url: "https://www.instagram.com/fearlesshuskies",
  },
  {
    // NOTE: this still points at the same URL as Fearless Huskies '22 above (copy-paste leftover from the source file) — swap in the correct handle when ready.
    label: "Royal Rebels '21",
    image: require("@/assets/images/social/rr21.jpg"),
      url: "https://www.instagram.com/fearlesshuskies",
  },
  {
    label: "Luminous Wolves '20",
    image: require("@/assets/images/social/lw20.jpg"),
    url: "https://www.instagram.com/luminouswolvess",
  },
  {
    label: "Ambitious Archers '19",
    image: require("@/assets/images/social/aa19.jpg"),
    url: "https://www.instagram.com/ambitiousarchers/",
  },
];

const socialSections: { title: string; items: SocialItem[] }[] = [
  { title: "Official Accounts", items: officialAccounts },
  { title: "Class Legacies", items: classLegacyAccounts },
];

const Legacy = () => {
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
          Social Media
        </Text>
      </View>
      <View className="bg-white w-[100vw] h-[75%] justify-center items-center ">
        <ScrollView
          className="w-[100vw] h-96 bg-white flex-1 flex-col "
          style={{ height: height * 0.5 }}
        >
          <ImageBackground
            source={require("@/assets/images/bg-home.png")}
            className="flex-row flex-wrap justify-center items-start w-[100vw] h-[100vh]"
            style={{ height: height * 1.5 }}
          >
            <Text className="z-20 font-barlow-semibold text-2xl text-whs-blue w-full text-center p-5 pb-0">
              Social Media
            </Text>
            <Text className="z-20 font-source-serif-regular text-sm text-gray-700 w-full text-center p-8 pt-3">
              Welcome to the Social Media page where students can connect with their respective classes and stay updated on the latest news and events.
            </Text>
            {socialSections.map((section) => (
              <View key={section.title} className="w-full mt-2 px-4">
                <Text className="font-barlow-semibold text-whs-blue text-base mb-2 text-center">
                  {section.title}
                </Text>
                <View className="flex-row flex-wrap justify-center gap-2">
                  {section.items.map((item) => (
                    <TouchableOpacity
                      key={item.label}
                      className="w-1/4 h-min justify-center items-center"
                      onPress={() => Linking.openURL(item.url)}
                    >
                      <Image
                        source={item.image}
                        className="size-14 self-center rounded-full"
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

export default Legacy;