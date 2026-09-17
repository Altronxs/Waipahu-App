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
import { useFocusEffect, useRouter } from "expo-router";
import React, { useRef, useState } from "react";
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
import { getSchoolMenu } from "@/src/utils/liveServices";
import { useIsFocused } from "expo-router/react-navigation";
import { FocusGate } from "@/components/FocusGate";
import { MarauderLoadingBadge } from "@/components/MarauderLoadingBadge";
const { width, height } = Dimensions.get("window");

const FALLBACK_MENU_URL = `https://www.waipahuhigh.org/pdf/menu-events%20Sept%202026.pdf`;

interface MenuData {
  url: string;
}

// Minimum time between forced WebView reloads, independent of the data
// fetch's own cache TTL. Prevents rapid focus/blur cycling from also
// hammering waipahuhigh.org via the WebView's native request on top of
// the JS-level fetch above.
const RELOAD_THROTTLE_MS = 30000;

const Cafe = () => {
  const isFocused = useIsFocused();
  const [menuUrl, setMenuUrl] = useState<string>("");
  const webViewRef = useRef<WebViewType>(null);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const lastReloadAt = useRef<number>(0);


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

  // Single focus effect: pulls the menu URL (via the shared cache, so
  // rapid refocus reuses cached data instead of re-fetching) and only
  // forces the WebView to reload from network when it's actually due
  // for one — not on every single focus.
  useFocusEffect(
    React.useCallback(() => {
      getSchoolMenu()
        .then((data) => {
          const url = (data as MenuData)?.url || FALLBACK_MENU_URL;
          setMenuUrl(url);

          const now = Date.now();
          const dueForReload = now - lastReloadAt.current > RELOAD_THROTTLE_MS;

          if (webViewRef.current && dueForReload) {
            lastReloadAt.current = now;
            setIsLoading(true); // show the overlay again for the forced reload
            webViewRef.current.reload();
          }
        })
        .catch((error) => {
          console.error("Failed to fetch school menu, using fallback:", error);
          setMenuUrl(FALLBACK_MENU_URL);
        });
    }, [])
  );

  if (!fontsLoaded || !menuUrl) {
    return (
      <View className="flex-1 justify-center items-center bg-[#17273d]">
        <MarauderLoadingBadge></MarauderLoadingBadge>
      </View>
    );
  }

  return (
    <SafeAreaProvider className="flex-col">
      {isLoading == true && (
        <View className="absolute top-0 left-0 w-full h-full z-50 bg-[#17273d] justify-center items-center">
          <View className="flex-1 justify-center items-center bg-[#17273d]">
            <MarauderLoadingBadge></MarauderLoadingBadge>
          </View>
        </View>
      )}
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
                style={{ tintColor: "#ffffff" }}
                className="size-10 self-center block m-auto pr-1"
                />
            </TouchableOpacity>
        </GlassView>
        <Text className="z-20 font-roboto-bold text-white text-lg w-full  bg-whs-gold text-center absolute">
          School Cafe Menu
        </Text>
      </View>

      <View className="grow justify-center items-center bg-white">
        <FocusGate>
          <View className="self-center items-center flex-row w-full flex-1 z-10">
            {isFocused ? (
              <WebView
                className="relative"
                style={{ width: width, flex: 1 }}
                ref={webViewRef}
                source={{ uri: menuUrl }}
                injectedJavaScript={`
                    setTimeout(() => {
                      window.ReactNativeWebView.postMessage("styles_injected");
                    }, 100);
                    true;
                `}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                onMessage={(event) => {
                  if (event.nativeEvent.data === "styles_injected") {
                    setIsLoading(false);
                  } else {
                    console.log("WebView message:", event.nativeEvent.data);
                  }
                }}
                sharedCookiesEnabled={true}
                thirdPartyCookiesEnabled={true}
              />
            ) : null}
          </View>
        </FocusGate>
      </View>
    </SafeAreaProvider>
  );
};

export default Cafe;