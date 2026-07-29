import { BarlowSemiCondensed_600SemiBold } from "@expo-google-fonts/barlow-semi-condensed";
import { useFonts } from "@expo-google-fonts/barlow-semi-condensed/useFonts";
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
import type { WebView as WebViewType } from "react-native-webview";
import { WebView } from "react-native-webview";
import TitleBar from "@/components/titleBar";

const Contacts = () => {
  const router = useRouter();
  const webViewRef = useRef<WebViewType>(null);

  useFocusEffect(
    React.useCallback(() => {
      if (webViewRef.current) {
        webViewRef.current.reload();
      }
    }, []),
  );

  const [canGoBack, setCanGoBack] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      if (webViewRef.current?.reload) {
        webViewRef.current.reload();
      }
    }, []),
  );

  let [fontsLoaded] = useFonts({
    BarlowSemiCondensed_600SemiBold,
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

      {canGoBack ? (
        <View className="justify-center items-center bg-whs-gold z-20">
          <TouchableOpacity
            className="w-10 h-10 left self-start pt-3 z-30"
            onPress={() => webViewRef.current?.goBack()}
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
            Contacts & Staff
          </Text>
        </View>
      ) : (
        <View className="justify-center items-center bg-whs-gold z-20">
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
            Contacts & Staff
          </Text>
        </View>
      )}

      <View className="grow justify-center items-center bg-white">
        <View className="self-center items-center flex-row w-[100vw] h-[100vh] z-10">
          <WebView
            className="h-[50vh]"
            ref={webViewRef}
            source={{ uri: "https://www.waipahuhigh.org/apps/staff/" }}
            injectedJavaScript={`
                setTimeout(() => {
                    const style = document.createElement('style');
                    style.innerHTML = \`
                        #enheader5, #enfooter1 {
                        display: none !important;
                        }
                    \`;
                  document.head.appendChild(style);
                }, 250);
                true;
            `}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            onMessage={(event) => {
              console.log("WebView message:", event.nativeEvent.data);
            }}
            onNavigationStateChange={(navState) => {
              setCanGoBack(navState.canGoBack);
            }}
            sharedCookiesEnabled={true}
            thirdPartyCookiesEnabled={true}
          />
        </View>
      </View>
    </SafeAreaProvider>
  );
};

export default Contacts;
