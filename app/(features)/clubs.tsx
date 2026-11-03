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
import { useFocusEffect } from "expo-router";
import {
    ActivityIndicator,
    Dimensions,
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { GlassView } from "expo-glass-effect";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import type { WebView as WebViewType } from "react-native-webview";
import { MarauderLoadingBadge } from "@/components/MarauderLoadingBadge";
import { FooterPage } from "@/components/FooterPage";
import { HeaderPage } from "@/components/HeaderPage";

const { width, height } = Dimensions.get("window");
interface clubFeature {
  name: string;
  location: string;
  supervisor: string;
  description?: string;
}
interface clubDataResponse {
  clubData: clubFeature[];
}

const Clubs = () => {
  const webViewRef = useRef<WebViewType>(null);
  const router = useRouter();
  const [clubData, setClubData] = useState<clubDataResponse>(
    require("@/assets/json/clubData.json"),
  );

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
          Club Directory
        </Text>
      </View>
      <View className="bg-white w-[100vw] h-[75%] justify-center items-center">
        <ScrollView
          className="w-[100vw] bg-white flex-1 flex-col "
        >
          <Text className="z-20 font-barlow-semibold text-3xl text-whs-blue w-full text-center pt-8">
            HOME OF THE MARAUDERS
          </Text>
          <Text className="w-[80%] z-20 font-source-serif-italic text-lg text-gray-700 self-center m-auto text-center py-3">
            Waipahu High School's vision is to provide student-centered
            educational programs that challenge all students to perform at their
            highest potential.
          </Text>
          <View className="pb-20 pt-2">
            {clubData.clubData?.map((feature, index) => (
              <React.Fragment key={index}>
                <View className="w-[90%] h-[max(200px, auto)] p-3 flex-col mx-auto bg-whs-blue my-2">
                  {/* <View className="w-full m-5">
                    <Image
                      source={require('@/assets/images/whs-logo.png')}
                      className="w-full h-[max(25vw)] aspect-square"
                      style={{aspectRatio: 1/1}}
                    />
                  </View> */}
                  <View className="w-full">
                    <Text className="z-30 font-barlow-semibold text-white text-2xl relative left-2 m-5 mb-3 border-l-4 px-2 border-whs-gold">
                      {feature.name}
                    </Text>
                    <View className="flex-row pl-5">
                      {feature.location !== "" ? (
                        <>
                          <Image
                            source={require("@/assets/images/whs-map.png")}
                            className="w-[12px] h-[12px] object-contain relative object-center m-1 my-2"
                            style={{ tintColor: "white" }}
                          />
                          <Text className="z-20 font-barlow-regular text-sm text-white pl-2 pr-2 my-1">
                            {feature.location}
                          </Text>
                        </>
                      ) : null}
                      {feature.supervisor !== "" ? (
                        
                        <>
                          {feature.location !== "" ? (
                            <>
                              <Image
                                source={require("@/assets/images/registrar.png")}
                                className="w-[32px] h-[16px] object-center relative bottom-1 border-l-2 border-white pl-2 m-2"
                                style={{ tintColor: "white" }}
                              />
                              <Text className="z-20 font-barlow-regular text-sm text-white pl-2 my-1">
                                {feature.supervisor}
                              </Text>
                            </>
                          ) : (
                            <>
                              <Image
                                source={require("@/assets/images/registrar.png")}
                                className="w-[32px] h-[17px] object-center relative bottom-1 pl-2 m-2"
                                style={{ tintColor: "white" }}
                              />
                              <Text className="z-20 font-barlow-regular text-sm text-white pl-2 my-1">
                                {feature.supervisor}
                              </Text>
                            </>
                          )}
                          
                        </>
                      ) : null}
                    </View>
                    {feature.description && (
                      <Text className="z-20 font-barlow-regular text-base text-white w-full p-6 pt-2">
                        {feature.description}
                      </Text>
                    )}
                    
                  </View>
                  
                </View>
              </React.Fragment>
            ))}
            <FooterPage></FooterPage>
          </View>
        </ScrollView>
      </View>
    </SafeAreaProvider>
  );
};

export default Clubs;
