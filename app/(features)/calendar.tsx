import { HeaderPage } from "@/components/HeaderPage";
import { MarauderLoadingBadge } from "@/components/MarauderLoadingBadge";
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
import { GlassView } from "expo-glass-effect";
import { useRouter } from "expo-router";
import { useIsFocused } from "expo-router/react-navigation"; // SDK 56+ path
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
  const isFocused = useIsFocused();

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
        <MarauderLoadingBadge></MarauderLoadingBadge>
      </View>
    );
  }

  return (
    <SafeAreaProvider className="flex-col">
      <HeaderPage></HeaderPage>

      <View className="justify-center items-center flex-nowrap bg-whs-gold">
        <GlassView
            style={{alignSelf: 'flex-start', zIndex: 30, borderRadius: 1000, alignItems: 'center', padding: 6, margin: 10}}
            glassEffectStyle="clear"
            isInteractive
            
        >
            <TouchableOpacity
                className="items-center"
                onPress={() => router.canGoBack() ? router.back() : router.navigate("/(tabs)")}
            >
                <Image
                source={require("@/assets/images/back.png")}
                style={{
                    tintColor: "#ffffff",
                }}
                className="size-10 self-center block m-auto pr-1"
                />
            </TouchableOpacity>
        </GlassView>
        <Text className="z-20 font-roboto-bold text-white text-xl w-full  bg-whs-gold text-center absolute"
        >
          School Calendar SY26-27
        </Text>
      </View>
      
      <View className="grow justify-center items-center bg-whs-gold">
        
        <View className="self-center items-center flex-row w-full flex-1 z-10">
          {isFocused ? (
            <WebView
              className="relative"
              style={{ width: width, flex: 1 }}
              ref={webViewRef}
              source={{
                uri: "https://www.waipahuhigh.org/apps/events/view_calendar.jsp",
              }}
            />
          ) : null}
        </View>
      </View>
    </SafeAreaProvider>
  );
};

export default Calendar;