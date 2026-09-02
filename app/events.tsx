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
import React, { useState, useCallback, useEffect } from "react";
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
  Linking,
  ScrollView,
  ImageBackground,
  RefreshControl,
  useWindowDimensions,
} from "react-native";
import { loadWebsiteData } from '@/assets/json/eventService';
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { GlassView } from "expo-glass-effect";

interface SchoolEvent {
  name: string;
  month: string; // e.g., "August" or "08"
  day: string;   // e.g., "17"
  time: string;  // e.g., "All Day" or a specific time string
}
const openLink = (url: string) => {
  Linking.openURL(url).catch((error) => {
    console.error("Failed to open URL:", error);
  });
};
const Events = () => {
  const { height } = useWindowDimensions();
  const [events, setEvents] = useState<SchoolEvent[]>([]);
  const [eventsError, setEventsError] = useState<string | null>(null);
  const [appIsReady, setAppIsReady] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();

  // Re-fetch events every time this screen comes into focus, not just on mount.
  useFocusEffect(
    useCallback(() => {
      const controller = new AbortController();

      loadWebsiteData({
        signal: controller.signal,
        setEvents,
        setEventsError,
        setAppIsReady,
      });

      return () => {
        controller.abort();
      };
    }, [])
  );

  const handleRefresh = async () => {
    setRefreshing(true);
    const controller = new AbortController();

    await loadWebsiteData({
      signal: controller.signal,
      setEvents,
      setEventsError,
      setAppIsReady,
    });

    setRefreshing(false);
  };


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
      {appIsReady == false && (
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
          Events & Activities
        </Text>
      </View>
      <View className="bg-white w-[100vw] h-[75%] justify-center items-center " style={{ height: (height - 208)}}>
        <ScrollView
          className="w-[100vw] h-96 bg-white flex-1 flex-col "
          style={{ height: height * 0.5 }}
          bounces={false}                
          overScrollMode="never"          
          scrollEventThrottle={16}       
          decelerationRate="normal"
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
        >
          <Text className="z-20 font-barlow-semibold text-2xl text-whs-blue w-full text-center p-3 !pt-5">
            UPCOMING EVENTS
          </Text>
          <View className="flex flex-col justify-center items-center pt-3 pb-20 flex-wrap w-full">
            {eventsError ? (
              <Text className="text-whs-blue text-center px-8 pt-10">{eventsError}</Text>
            ) : events.length === 0 ? (
              <Text className="text-whs-blue text-center px-8 pt-10">No upcoming events.</Text>
            ) : (
              events.map((event, index) => (
                <View key={index} className="flex flex-row flex-nowrap self-center w-[90%] mx-[5%] p-5 mb-3 bg-whs-blue">
                  <View className="justify-center items-start border-r-2 border-white pr-5">
                    <Text className="text-white text-center font-roboto-bold">{event.month}</Text>
                    <Text className="text-whs-gold text-center font-source-serif-bold font-black text-3xl">{event.day}</Text>
                  </View>
                  <View className="flex-1 justify-center items-start pl-5">
                    <Text className="text-white text-sm text-wrap w-[50vw] pb-2 font-semibold font-source-serif-bold">{event.name}</Text>
                    <Text className="text-white text-center text-[0.75rem] font-light font-source-serif-regular">{event.time}</Text>
                  </View>
                  
                </View>
              ))
            )}
            <View className="w-[90%] h-3 border-b-2 border-whs-blue"></View>
            <Text className="z-20 font-barlow-semibold text-2xl text-whs-blue w-full text-center p-3 !pt-5">
              MAJOR EVENTS & ACTIVITIES
            </Text>
            <ImageBackground
              source={require("@/assets/images/IMG_0059.jpeg")}
              className="w-[90%] h-[50vh] self-center overflow-hidden mt-5"
            >
              <View className="absolute w-full h-full bg-black opacity-55 p-2"></View>
              <View className="absolute w-full h-full flex justify-center items-center p-4">
                <Text className="z-20 font-barlow-semibold text-3xl text-white w-full p-3 pt-3">
                  HOMECOMING
                </Text>
                <Text className="z-20 font-barlow-regular text-sm text-white w-full p-3 pt-3">
                  JOIN US FOR THE BIGGEST EVENT OF THE YEAR! Experience the unmatched energy of Waipahu High School Homecoming! This massive celebration brings together students, staff, and generations of proud Marauder alumni to honor community, history, and school pride. From high-energy campus spirit weeks to deep-rooted local traditions, it is the defining event of the school year on Oahu.
                </Text>
                <Text className="z-20 font-barlow-regular text-sm text-white w-full p-3 pt-3">
                  Mark your Calendars for Sept 25, 2026.
                </Text>
              </View>
            </ImageBackground>
            <ImageBackground
              source={require("@/assets/images/spiritweek.jpg")}
              className="w-[90%] h-[50vh] self-center overflow-hidden mt-5"
            >
              <View className="absolute w-full h-full bg-black opacity-55 p-2"></View>
              <View className="absolute w-full h-full flex justify-center items-center p-4">
                <Text className="z-20 font-barlow-semibold text-3xl text-white w-full p-3 pt-3">
                  SPIRIT WEEKS
                </Text>
                <Text className="z-20 font-barlow-regular text-sm text-white w-full p-3 pt-3">
                  Waipahu High School Spirit Weeks are high-energy traditions held throughout the year—including back-to-school, homecoming, and holidays—to unite the campus and boost Marauder pride. These seasonal celebrations feature creative daily dress-up themes, lively lunchtime courtyard rallies, and friendly grade-level competitions that give students a fun break from classes.
                </Text>
                <Text className="z-20 font-barlow-regular text-sm text-white w-full p-3 pt-3">
                  Get Spirit Week dates and themes by clicking <Text className="underline" onPress={() => openLink("https://www.instagram.com/waipahuhs.stugov/")}>HERE</Text>
                </Text>
              </View>
            </ImageBackground>
            <ImageBackground
              source={require("@/assets/images/snr_lua.jpg")}
              className="w-[90%] h-[50vh] self-center overflow-hidden mt-5"
            >
              <View className="absolute w-full h-full bg-black opacity-55 p-2"></View>
              <View className="absolute w-full h-full flex justify-center items-center p-4">
                <Text className="z-20 font-barlow-semibold text-3xl text-white w-full p-3 pt-3">
                  SENIOR LUAU
                </Text>
                <Text className="z-20 font-barlow-regular text-sm text-white w-full p-3 pt-3">
                  The Senior Luau is a special milestone event celebrating our graduating class as they near the finish line. While it is a major celebration, it is not the final farewell. Come enjoy great music, food, and relaxed tropical vibes at this exclusive senior gathering. Dress in your favorite island attire and make lasting memories with your classmates before graduation!
                </Text>
                <Text className="z-20 font-barlow-regular text-sm text-white w-full p-3 pt-3">
                  Mark your Calendars for Nov 21, 2026.
                </Text>
              </View>
            </ImageBackground>
            <ImageBackground
              source={require("@/assets/images/fsb.jpg")}
              className="w-[90%] h-[50vh] self-center overflow-hidden mt-5"
            >
              <View className="absolute w-full h-full bg-black opacity-55 p-2"></View>
              <View className="absolute w-full h-full flex justify-center items-center p-4">
                <Text className="z-20 font-barlow-semibold text-3xl text-white w-full p-3 pt-3">
                  FRESHMAN & SOPHMORE BANQUET
                </Text>
                <Text className="z-20 font-barlow-regular text-sm text-white w-full p-3 pt-3">
                  The Freshman & Sophomore Banquet is a celebratory milestone marking the end of the underclassman years. Bring your classmates together for an elegant evening of great food, music, and dancing. It is the perfect chance to dress up, take photos, and celebrate your high school journey so far!
                </Text>
                <Text className="z-20 font-barlow-regular text-sm text-white w-full p-3 pt-3" onPress={() => openLink("https://www.instagram.com/div2ne_crus9ders/")}>
                  Get FSB dates and details by clicking <Text className="underline">HERE</Text>
                </Text>
              </View>
            </ImageBackground>
            <ImageBackground
              source={require("@/assets/images/jnr_prom.jpg")}
              className="w-[90%] h-[50vh] self-center overflow-hidden mt-5"
            >
              <View className="absolute w-full h-full bg-black opacity-75 p-2"></View>
              <View className="absolute w-full h-full flex justify-center items-center p-4">
                <Text className="z-20 font-barlow-semibold text-3xl text-white w-full p-3 pt-3">
                  JUNIOR PROM
                </Text>
                <Text className="z-20 font-barlow-regular text-sm text-white w-full p-3 pt-3">
                  The Junior Prom is a formal dance event that celebrates the achievements and milestones of our junior class. It is an opportunity for students to showcase their style, connect with peers, and create unforgettable memories. Expect elegant attire, fantastic music, and a night to remember!
                </Text>
                <Text className="z-20 font-barlow-regular text-sm text-white w-full p-3 pt-3" onPress={() => openLink("https://www.instagram.com/vali2nt.vip8rs/")}>
                  Get Junior Prom dates and details by clicking <Text className="underline">HERE</Text>
                </Text>
              </View>
            </ImageBackground>
            <ImageBackground
              source={require("@/assets/images/snr_prom.jpg")}
              className="w-[90%] h-[50vh] self-center overflow-hidden mt-5"
            >
              <View className="absolute w-full h-full bg-black opacity-55 p-2"></View>
              <View className="absolute w-full h-full flex justify-center items-center p-4">
                <Text className="z-20 font-barlow-semibold text-3xl text-white w-full p-3 pt-3">
                  SENIOR PROM
                </Text>
                <Text className="z-20 font-barlow-regular text-sm text-white w-full p-3 pt-3">
                  The Senior Prom is a formal dance event that celebrates the achievements and milestones of our senior class. It is an opportunity for students to showcase their style, connect with peers, and create unforgettable memories. Expect elegant attire, fantastic music, and a night to remember!
                </Text>
                <Text className="z-20 font-barlow-regular text-sm text-white w-full p-3 pt-3" onPress={() => openLink("https://www.instagram.com/moonlightsoldiers27/")}>
                  Get Senior Prom dates and details by clicking <Text className="underline">HERE</Text>
                </Text>
              </View>
            </ImageBackground>
          </View>
        </ScrollView>
      </View>
      
      
    </SafeAreaProvider>
  );
};


export default Events;