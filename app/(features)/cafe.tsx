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
import React, { useRef, useEffect, useState } from "react";
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
import { useIsFocused } from "expo-router/react-navigation";
import { FocusGate } from "@/components/FocusGate";
import { MarauderLoadingBadge } from "@/components/MarauderLoadingBadge";
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get("window");

const FALLBACK_MENU_URL = `https://www.waipahuhigh.org/pdf/menu-events%20Sept%202026.pdf`;

interface MenuData {
  url: string;
}
interface webLinks {
  website: {
    url: string;
  }[];
}
// Minimum time between forced WebView reloads, independent of the data
// fetch's own cache TTL. Prevents rapid focus/blur cycling from also
// hammering waipahuhigh.org via the WebView's native request on top of
// the JS-level fetch above.
const RELOAD_THROTTLE_MS = 30000;

const Cafe = () => {
  const isFocused = useIsFocused();
  const [menuUrl, setMenuUrl] = useState<webLinks>();
  const webViewRef = useRef<WebViewType>(null);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  // 24 hours in milliseconds (24 * 60 * 60 * 1000)
  const ONE_DAY_MS = 86400000; 

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

  // Function to SAVE your webLinks
  const savewebLinks = async (webLinks : webLinks) => {
    try {
      const jsonValue = JSON.stringify(webLinks);
      await AsyncStorage.setItem('@WHS:Menu:Data', jsonValue);
    } catch (error) {
      console.error('Failed to save webLink:', error);
    }
  };

  // Function to READ your webLinks
  const getwebLinks = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@WHS:Menu:Data');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      // if fail return hardcoded but not updated calendar
      return FALLBACK_MENU_URL;
    }
  };

  useEffect(() => {
    // Guards every setState call below so we never update state after
    // this component has unmounted (defensive — Home is long-lived, but
    // this keeps the pattern consistent with the rest of the app).
    let isMounted = true;
    const initializedData = async () => {
      try {
        const now = Date.now();
        
        // Locally cached webLinks (AsyncStorage), or the bundled fallback
        // JSON if AsyncStorage read fails — see getCalendar()'s own catch.
        const weblinkData = await getwebLinks();
        const lastFetchTime = await AsyncStorage.getItem('@WHS:Menu:LastFetchTime');

          // Refresh from the CDN if we've never fetched, or if it's been
        // more than a day since the last successful fetch.
        const isCacheEmpty = !weblinkData || !lastFetchTime;
        const isOlderThanOneDay = now - parseInt(lastFetchTime || '0', 10) > ONE_DAY_MS;

        if (isCacheEmpty || isOlderThanOneDay) {
          console.log("Local Menu cache stale/empty. Pulling from CDN...");

          // Bound the CDN fetch with a 10s timeout so a slow/dead network
          // can't leave this promise chain hanging indefinitely.
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 10000);

          try {
            const response = await fetch(
              'https://raw.githubusercontent.com/Altronxs/Waipahu-App/refs/heads/main/live-data/website.json',
              { signal: controller.signal }
            );

            if (!response.ok) throw new Error('CDN response error');

            // Parse the raw response body into a usable JavaScript object/array
            const data = await response.json();
            console.log(data);
            // Persist the fresh data + timestamp so we don't re-fetch
            // again until ONE_DAY_MS has passed.
            await savewebLinks(data);
            await AsyncStorage.setItem('@WHS:Menu:LastFetchTime', now.toString());

            if (isMounted) setMenuUrl(data);
          } finally {
            // Always clear the timeout — whether the fetch succeeded,
            // failed, or was aborted by the timeout itself — so it never
            // fires late against an already-settled request.
            clearTimeout(timeoutId);
          }
        } else {
          // Cache is fresh — use what's already on disk, no network hit.
          if (isMounted) setMenuUrl(weblinkData);
        }
      } catch (error) {
        console.error("Failed to load local schedule settings data:", error);

        // Fallback: if the CDN fetch failed (offline, bad response, etc.),
        // fall back to whatever local/bundled webLink we have rather than
        try {
          const fallbackData = await getwebLinks();
          if (fallbackData && isMounted) setMenuUrl(fallbackData);
        } catch (innerError) {
          console.error("Critical fallback storage failure:", innerError);
        }
      }
    }
    initializedData();
    // Cleanup: mark unmounted so any in-flight setState calls above are
    // skipped if this effect's cleanup runs before they resolve.
    return () => {
      isMounted = false;
    };
  }, []); //// Empty dependency array — runs exactly once on mount, not on focus

  if (!fontsLoaded) { //|| !menuUrl
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
              <Text className="text-white text-xl font-barlow-semibold">MY VOICE</Text>
              <Text className="text-white text-xl ml-5 font-barlow-semibold"> MY CHOICE</Text>
              <Text className="text-white text-xl ml-12 font-barlow-semibold"> MY FUTURE</Text>
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
        <Text className="z-20 font-roboto-bold text-white text-xl w-full  bg-whs-gold text-center absolute">
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
                source={{ uri: menuUrl?.website[0]?.url ?? FALLBACK_MENU_URL }}
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