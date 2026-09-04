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
    Image,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import type { WebView as WebViewType } from "react-native-webview";
import { WebView } from "react-native-webview";
 

const News = () => {
  const router = useRouter();
  const webViewRef = useRef<WebViewType>(null);
  const [isLoading, setIsLoading] = useState(true);
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
    <SafeAreaProvider className="flex-col">
      {isLoading == true && (
        <View className="absolute top-0 left-0 w-full h-full z-50 bg-[#17273d] justify-center items-center">
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
          <Text className="z-20 font-roboto-bold text-white text-lg w-full  bg-whs-gold text-center absolute"
          >
            News & Announcements
          </Text>
        </View>
      ) : (
        <View className="justify-center items-center flex-nowrap bg-whs-gold">
          <GlassView
              style={{alignSelf: 'flex-start', zIndex: 30, borderRadius: 1000, alignItems: 'center', padding: 6, margin: 10}}
              glassEffectStyle="clear"
              isInteractive
              onTouchEnd={() => router.push("/")}
          >
              <TouchableOpacity
                  className="items-center"
                  onPress={() => router.push("/")}
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
          <Text className="z-20 font-roboto-bold text-white text-lg w-full  bg-whs-gold text-center absolute"
          >
            News & Announcements
          </Text>
        </View>
      )}

      <View className="grow justify-center items-center bg-white">
        <View className="w-[100vw] h-[65vh] z-10 ">
          <WebView
            className="h-[5vh]"
            ref={webViewRef}
            source={{
              uri: "https://www.waipahuhigh.org/apps/news/index.jsp?id=0",
            }}
            injectedJavaScript={`
              setTimeout(() => {
                // 1. Inject your cleaned up styles
                const style = document.createElement('style');
                style.innerHTML = \`
                  #enheader5, #enfooter1, #shortcut-wrapper, #pageTitle { display: none !important; }
                  .inside-page::before { background-color: #ffffff !important; }
                  table:first-of-type { display: none !important; }
                  
                  /* FORCE PARENT WRAPPERS TO FILL WIDE AND RE-CENTER CONTENT */
                  #news0wrapper, #news0wrapper tbody {
                    display: block !important;
                    width: 100% !important;
                    margin: 0 auto !important;
                  }
                  
                  table:nth-of-type(2) { 
                    display: flex !important; 
                    flex-direction: column !important;
                    align-items: center !important; 
                    justify-content: center !important; 
                    margin: 0 auto !important; 
                    padding: 0px !important; 
                    width: 100% !important;
                  }
                  
                  /* THE NEW MASONRY CONTAINER - FIXED FOR PERFECT CENTERING */
                  .masonry-container { 
                    display: flex !important; 
                    width: 95% !important;          /* Fills the screen beautifully on phone, scales out on tablets */
                    max-width: 920px !important;    /* Keeps it from getting too ridiculously wide on giant iPad screens */
                    margin: 0 auto !important;      /* CRITICAL: Perfectly centers the track on any device screen */
                    padding: 0 !important; 
                    
                  } 
                  
                  .masonry-column { 
                    flex: 1 !important; 
                    display: flex !important; 
                    flex-direction: column !important; 
                    
                  } 
                  
                  /* Cleaned up original styles */
                  #news0wrapper tbody tr { 
                    display: block !important; 
                    width: 100% !important; 
                    margin: 0 !important; 
                    padding: 5px !important; 
                    box-sizing: border-box !important; 
                  } 
                  
                  #news0wrapper tbody tr td { 
                    display: flex !important; 
                    flex-direction: column-reverse !important; 
                    align-items: center !important; 
                    justify-content: center !important; 
                    background-color: #ffffff !important; 
                    padding-top: 10px !important; 
                    padding-bottom: 10px !important; 
                  } 
                  
                  #news0wrapper tbody tr td span { 
                    display: block !important; 
                    width: 100% !important; 
                    margin: auto !important; 
                    align-self: center !important; 
                  } 
                  
                  #news0wrapper tbody tr td span a { 
                    display: inline-block !important; 
                    width: 100% !important; 
                    color: #17273d !important; 
                    font-size: 20px !important; 
                    font-weight: bold !important; 
                    text-decoration: none !important; 
                    position: relative !important; 
                    border-bottom: 2px solid #17273d !important; 
                  } 
                  
                  #news0wrapper tbody tr td a { 
                    width: 100% !important; 
                    text-decoration: underline !important; 
                    top: 0 !important; 
                    align-self: center !important; 
                  } 
                  
                  #news0wrapper tbody tr td a img { 
                    display: block !important; 
                    width: 100% !important; 
                    height: auto !important; 
                    margin-left: auto !important; 
                    margin-right: auto !important; 
                    border-width: 0px !important;   
                  } 
                  
                  .itemImages { 
                    width: 100% !important; 
                    height: auto !important; 
                    border-width: 0px !important; 
                  } 
                  
                  .light { 
                    color: #17273d !important; 
                    font-size: 0rem !important; 
                    line-height: 1.25 !important; 
                  } 
                \`;
                document.head.appendChild(style);

                // 2. AUTOMATIC JAVASCRIPT MASONRY CONVERSION
                const tbody = document.querySelector('#news0wrapper tbody');
                if (tbody) {
                  const rows = Array.from(tbody.querySelectorAll('tr'));
                  if (rows.length > 0) {
                    // Create the parent masonry container
                    const container = document.createElement('div');
                    container.className = 'masonry-container';
                    
                    // Create left and right columns
                    const col1 = document.createElement('div');
                    col1.className = 'masonry-column';
                    const col2 = document.createElement('div');
                    col2.className = 'masonry-column';
                    
                    container.appendChild(col1);
                    container.appendChild(col2);
                    
                    // Distribute items left-to-right alternately (keeps newer stuff first!)
                    rows.forEach((row, index) => {
                      if (index % 2 === 0) {
                        col1.appendChild(row); // Item 1, 3, 5...
                      } else {
                        col2.appendChild(row); // Item 2, 4, 6...
                      }
                    });
                    
                    // Clear tbody and inject the new responsive layout
                    tbody.innerHTML = '';
                    tbody.appendChild(container);
                  }
                }

                window.ReactNativeWebView.postMessage("styles_injected");
              }, 100);
              true;
            `}

            javaScriptEnabled={true}
            domStorageEnabled={true}
            onMessage={(event) => {
              if (event.nativeEvent.data === "styles_injected") {
                console.log("Styles injected successfully.");
                setIsLoading(false);
              } else {
                console.log(event.nativeEvent.data);
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
      <View className="text-sm">

      </View>
    </SafeAreaProvider>
  );
};

export default News;
