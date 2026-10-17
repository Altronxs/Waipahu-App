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
import React, { useRef, useState } from "react";
import {
    ActivityIndicator,
    Image,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import type {
  WebView as WebViewType,
  WebViewMessageEvent,
  WebViewNavigation,
} from "react-native-webview";
import { WebView } from "react-native-webview";
import { GlassView } from 'expo-glass-effect';
import { FocusGate } from "@/components/FocusGate";
import { MarauderLoadingBadge } from "@/components/MarauderLoadingBadge";
import { HeaderPage } from "@/components/HeaderPage";

const Athletics = () => {
  const router = useRouter();
  const webViewRef = useRef<WebViewType>(null);
  const [canGoBack, setCanGoBack] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      if (webViewRef.current) {
        webViewRef.current.reload();
      }
    }, []),
  );

  useFocusEffect(
    React.useCallback(() => {
      if (webViewRef.current?.reload) {
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
      <HeaderPage></HeaderPage>

      {canGoBack ? (
        <View className="justify-center items-center flex-nowrap bg-whs-gold">
          <GlassView
              style={{alignSelf: 'flex-start', zIndex: 30, borderRadius: 1000, alignItems: 'center', padding: 6, margin: 10}}
              glassEffectStyle="clear"
              isInteractive
              onTouchEnd={() => webViewRef.current?.goBack()}
          >
              <TouchableOpacity
                  className="items-center"
                  onPress={() => webViewRef.current?.goBack()}
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
          <Text className="z-20 font-roboto-bold text-white text-xl/tight w-full  bg-whs-gold text-center absolute"
          >
            Athletics Homepage
          </Text>
        </View>
      ) : (
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
          <Text className="z-20 font-roboto-bold text-white text-xl/tight w-full  bg-whs-gold text-center absolute"
          >
            Athletics
          </Text>
        </View>
      )}

      <View className="grow justify-center items-center bg-white">
        <FocusGate>
          <View className="w-[100vw] h-[65vh] z-10">
            <WebView
              className="h-[5vh]"
              ref={webViewRef}
              source={{
                uri: "https://www.waipahuhigh.org/apps/pages/index.jsp?uREC_ID=555405&type=d",
              }}
              injectedJavaScript={`
                  setTimeout(() => {
                  const style = document.createElement('style');
                  style.innerHTML = \`
                      #enheader5, #enfooter1 {
                      display: none !important;
                      }
                  \`;
                  document.head.appendChild(style);
                  window.ReactNativeWebView.postMessage("styles_injected");
                  }, 250);
                  true;
              `}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              onMessage={(event: WebViewMessageEvent) => {
                if (event.nativeEvent.data === "styles_injected") {
                  console.log("Styles injected successfully.");
                  setIsLoading(false);
                } else {
                  console.log(event.nativeEvent.data);
                }
              }}
              onNavigationStateChange={(navState: WebViewNavigation) => {
                setCanGoBack(navState.canGoBack);
              }}
              sharedCookiesEnabled={true}
              thirdPartyCookiesEnabled={true}
            />
          </View>
        </FocusGate>
      </View>
    </SafeAreaProvider>
  );
};
//https://www.waipahuhigh.org/apps/pages/index.jsp?uREC_ID=555403&type=d
export default Athletics;
