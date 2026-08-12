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
import React, { useRef, useState, useEffect } from "react";
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Dimensions,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import type { WebView as WebViewType } from "react-native-webview";
import { WebView } from "react-native-webview";

const { width, height } = Dimensions.get("window");

const Events = () => {
  const webViewRef = useRef<WebViewType>(null);
  const [appIsReady, setAppIsReady] = useState(false);
  const router = useRouter();

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

      {canGoBack ? (
            <View className="justify-center items-center bg-whs-gold">
            <TouchableOpacity
                className="w-10 h-10 left self-start pt-3 z-30"
                onPress={() => webViewRef.current?.goBack()}
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
                Events & Activities
            </Text>
            </View>
        ) : (
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
                Events & Activities
            </Text>
            </View>
        )}
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
            <View className="self-center items-center flex flex-column w-[100vw] h-[80vh] z-10 "> 
              <View className="h-1/2 z-0 p-[0] w-full">
                {!appIsReady && (
                  <View className="flex-1 justify-center items-center bg-[#17273d] absolute z-40 w-full h-full">
                    <ActivityIndicator size="large" color="#ffffff" />
                  </View>
                )}
                
                  <WebView
                    className="h-full w-[100vw]"
                    style={{width: '100%'}}
                    ref={webViewRef}
                    source={{
                    uri: "https://www.waipahuhigh.org",
                    }}
                    injectedJavaScript={`
                        setTimeout(() => {
                        const style = document.createElement('style');
                        style.innerHTML = \`
                            #enheader5, #enfooter1, #index-wrapper, #first-row, #third-row, #fourth-row, #fifth-row, div.en-events-slider-footer {
                                display: none !important;
                            }
                            #second-row {
                                padding-top: 40px;
                            }
                            body {
                                overflow: hidden;
                            }
                        \`;
                        const meta = document.createElement('meta');
                        meta.name = 'viewport';
                        meta.content = 'width=device-width, initial-scale=0.5, maximum-scale=0.5, user-scalable=no';
                        document.getElementsByTagName('head')[0].appendChild(meta);
                        document.head.appendChild(style);

                        // Send a message back to React Native signaling success
                        window.ReactNativeWebView.postMessage("INJECTION_SUCCESS");     
                        }, 250);
                        true;
                    `}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    onMessage={(event) => {
                        if (event.nativeEvent.data === "INJECTION_SUCCESS") {
                           setAppIsReady(true);
                        }
                    }}
                    onNavigationStateChange={(navState) => {
                    setCanGoBack(navState.canGoBack);
                    }}
                    sharedCookiesEnabled={true}
                    thirdPartyCookiesEnabled={true}
                />
              </View>
            </View>
          </ImageBackground>
        </ScrollView>
      </View>
      
      
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', justifyContent: 'center', alignItems: 'center' },
  card: { backgroundColor: '#fff', padding: 30, borderRadius: 20, width: '85%', alignItems: 'center', elevation: 3, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10 },
  clock: { fontSize: 18, color: '#666', marginBottom: 20, fontWeight: '600' },
  label: { fontSize: 14, color: '#aaa', textTransform: 'uppercase', letterSpacing: 1, marginTop: 15 },
  periodText: { fontSize: 32, fontWeight: 'bold', color: '#1a1a1a', textAlign: 'center', marginVertical: 5 },
  timerText: { fontSize: 40, fontWeight: 'bold', color: '#ff4757', marginTop: 5 },
});

export default Events;
