import {
    BarlowSemiCondensed_400Regular,
    BarlowSemiCondensed_400Regular_Italic,
    BarlowSemiCondensed_600SemiBold_Italic,
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
import React, { useState, useEffect, useCallback, useRef } from "react";
import {
    ActivityIndicator,
    Image,
    Linking,
    RefreshControl,
    ScrollView,
    Modal,
    Text,
    TouchableOpacity,
    useWindowDimensions,
    View,
    Switch,
} from "react-native";
import { GlassView } from 'expo-glass-effect';
import { SafeAreaProvider } from "react-native-safe-area-context"; 
import qaJSON from "@/assets/json/qaData.json";
import { FooterPage } from "@/components/FooterPage";


interface qaFeature {
    id: number;
    category?: string;
    question: string;
    answer: string;
}
interface qaData {
    qaData: qaFeature[];
}


export default function Qanda() {
  const router = useRouter(); // Get the router instance
  const { height, width } = useWindowDimensions();

  const [selectedSchedule, setSelectedSchedule] = useState<string>('');
  const [isFocus, setIsFocus] = useState(false);

  const [qaData, setQaData] = useState<qaData>(
    require("@/assets/json/qaData.json")
  );

  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    NotoSerif_400Regular,
    NotoSerif_700Bold,
    NotoSerif_700Bold_Italic,
    BarlowSemiCondensed_400Regular,
    BarlowSemiCondensed_400Regular_Italic,
    BarlowSemiCondensed_600SemiBold_Italic,
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
  } else {
    return (
      <SafeAreaProvider className="flex-col">
        <View className="bg-white w-[100vw] h-[100vh] justify-center items-center ">
            <View className="flex flex-row flex-nowrap items-center bg-whs-blue w-full pt-16">
                <GlassView
                    style={{alignSelf: 'flex-start', zIndex: 30, borderRadius: 1000, alignItems: 'center', padding: 6, margin: 20}}
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
                
                <Text className="z-20 font-roboto-bold text-white text-center text-2xl pb-2">
                    Q&A
                </Text>
                <Image
                    source={require("@/assets/images/whs-logo.png")}
                    className="w-16 h-16 ml-auto mr-7"
                />
            </View> 
            <ScrollView
                className="w-[100vw] flex-1 flex-col bg-black/10"
                style={{ height: height * 0.5}}
                bounces={true}                
                overScrollMode="never"          
                scrollEventThrottle={16}       
                decelerationRate="normal"
            >
                <View className="w-[90%] self-center mt-5 px-3 pb-20">
                    {qaData.qaData?.map((feature) => (
                        <React.Fragment key={feature.id}>
                            {feature.category && (
                                <Text className="font-barlow-semibold text-2xl underline text-left my-3">
                                    {feature.category}
                                </Text>
                            )}
                            <Text className="font-barlow-semibold text-left text-lg">
                                {feature.id})  {feature.question}
                            </Text>
                            <Text className="z-20 font-barlow-regular text-base text-gray-700 w-full p-3 pt-2">
                                {feature.answer}
                            </Text>
                        </React.Fragment>
                    ))}
                </View>
                <FooterPage></FooterPage>
            </ScrollView>
        </View>
      </SafeAreaProvider>
    );
  } 
}