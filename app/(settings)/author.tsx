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
import { useFocusEffect , useRouter } from "expo-router";
import {
    Dimensions,
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import React, { useRef } from "react";
import type { WebView as WebViewType } from "react-native-webview";
import { GlassView } from "expo-glass-effect";
import { HeaderPage } from "@/components/HeaderPage";
import { FooterPage } from "@/components/FooterPage";
import { MarauderLoadingBadge } from "@/components/MarauderLoadingBadge";

const { height } = Dimensions.get("window");

type CreditPerson = {
  name: string;
  class?: string;
  classLogo?: any;
  igHandle?: string;
  role?: string;
};

const Author = () => {
  const webViewRef = useRef<WebViewType>(null);
  const router = useRouter();

  const credits: { title: string; people: CreditPerson[] }[] = [
    {
      title: "",
      people: [
        {name: "Kyle Alexander Baldovi", class: "2026", classLogo: require("@/assets/images/il.png"), igHandle: "@kylealtxyz"},
        {name: "Layten Fernandez", class: "2025", classLogo: require("@/assets/images/mk.png"), igHandle: "layten_f"},
        {name: "Lander Jarvis Viernes", class: "2025", classLogo: require("@/assets/images/mk.png")},
        {name: "Justine John Claro", class: "2025", classLogo: require("@/assets/images/mk.png"), igHandle: "time2plytmr"},
        {name: "Ian Ramos", class: "2025", classLogo: require("@/assets/images/mk.png"), igHandle: "@eeeyannnn"},
        {name: "Carl Nelson David", class: "2025", classLogo: require("@/assets/images/mk.png"), igHandle: "itsaflyingsheep"}
      ],
    },
    {
      title: "MENTORS",
      people: [
        {name: "Mrs. C. Takara"},
        //{name: "Brian Dote"}, Will add back later
      ]
    },
    {
      title: "SPECIAL THANKS",
      people: [
        {name: "Matthew Daniel Tabladillo", class: "2026", classLogo: require("@/assets/images/il.png"), igHandle: "@mattchu.dani"},
        {name: "Angelina Alcantra Pao", class: "2026", classLogo: require("@/assets/images/il.png"), igHandle: "@aiea.nglnx"}
      ]
    }
    

  ]
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
        <Text className="z-20 font-roboto-bold text-white text-xl w-full bg-whs-gold text-center absolute"
        >
          App Creators & Credits
        </Text>
      </View>
      <View className="bg-white w-[100vw] h-[75%] justify-center items-center ">
        <ScrollView
          className="w-[100vw] h-96 bg-white flex-1 flex-col"
          style={{ height: height * 0.5 }}
          bounces={true}                
          overScrollMode="never"          
          scrollEventThrottle={16}       
          decelerationRate="normal"   
        >
          <Text className="z-20 font-barlow-semibold text-2xl text-whs-blue w-full text-center p-3 !pt-5">
            {"MADE BY STUDENTS FOR STUDENTS"}
          </Text>
          <Text className="z-20 font-source-serif-italic text-base text-gray-700 w-full text-center pb-5 mb-5 px-4 border-b-2 border-gray-200">
            {"Waipahu High School's vision is to provide student-centered educational programs that challenge all students to perform at their highest potential."}
          </Text>
          
          <View>
            {credits.map((sections) => (
              <View key={sections.title}>
                {sections.title !== "" ? (
                  <Text className="font-barlow-semibold text-2xl text-whs-blue w-1/2 text-center p-2 border-b-2 border-whs-gold mb-2 block m-auto">
                    {sections.title}
                  </Text>
                ) : null}
                {sections.people.map((people) => (
                  <View key={people.name} className="w-[90%] p-5 border-t-[1px] bg-whs-blue m-2 mx-auto self-center">
                    <Text className="z-30 font-barlow-semibold text-white text-lg w-full mb-1 border-l-2 border-whs-gold pl-2">
                      {people.name}
                    </Text>
                    {people.class ? (
                      <View className="flex-row flex-wrap justify-start items-center pl-4">
                        <Image
                          source={people.classLogo}
                          className="w-5 h-5 object-contain relative"
                          style={{ tintColor: "white", height: 20, width: 20 }}
                        />
                        <Text className="z-20 font-barlow-regular text-sm text-white pl-2 pr-2">
                          Class of {people.class} 
                        </Text>
                        {people.igHandle ? (
                          <View className="flex-row flex-wrap justify-start items-center border-white border-l-[1px] pl-1">
                            <Image
                              source={require("@/assets/images/instagram.png")}
                              className="w-5 h-5 object-center ml-[2px]"
                              style={{ tintColor: "white" }}
                            />
                            <Text className="z-20 font-barlow-regular text-sm text-white pl-2">
                              {people.igHandle}
                            </Text>
                          </View>
                        ) : null}
                      </View>
                    ): null}

                    
                  </View>
                ))}
              </View>
            ))}
            
          </View>
          
          <View className="pb-20"></View>

          <FooterPage></FooterPage>
        </ScrollView>
      </View>
    </SafeAreaProvider>
  );
};

export default Author;
