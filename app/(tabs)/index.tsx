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
    ImageBackground,
    Linking,
    RefreshControl,
    ScrollView,
    Text,
    TouchableOpacity,
    useWindowDimensions,
    View,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context"; 
import "../globals.css";
import { loadWebsiteData } from '@/assets/json/eventService';
import { calculateCurrentPeriod } from '@/assets/json/schedule'

interface SchoolEvent {
  name: string;
  month: string; // e.g., "August" or "08"
  day: string;   // e.g., "17"
  time: string;  // e.g., "All Day" or a specific time string
}
// Shared helper so openURL rejections (app not installed, malformed URL, etc.)
// don't surface as unhandled promise rejections.
const openLink = (url: string) => {
  Linking.openURL(url).catch((error) => {
    console.error("Failed to open URL:", error);
  });
};

export default function Index() {
  const router = useRouter(); // Get the router instance
  const { height } = useWindowDimensions();

  // --- Bell-schedule / "current period" state ---
  // These are recomputed every second by the interval effect below.
  const [currentPeriod, setCurrentPeriod] = useState<string>('');
  const [currentPeriodStart, setCurrentPeriodStart] = useState<string>('')
  const [currentPeriodEnd, setCurrentPeriodEnd] = useState<string>('')
  const [loadingBarFactor, setLoadingBarFactor] = useState<string>('0%')
  const [timeLeft, setTimeLeft] = useState('');

  // Gate for the splash/loading screen. Only flips true once fonts are loaded
  // AND the first tick of the interval effect has run (see effect below).
  const [appIsReady, setAppIsReady] = useState(false);

  const [events, setEvents] = useState<SchoolEvent[]>([]);
  const [eventsError, setEventsError] = useState<string | null>(null);

  // Drives the pull-to-refresh spinner on the ScrollView (see
  // handleRefresh / RefreshControl below).
  const [refreshing, setRefreshing] = useState(false);

  // Ref mirror of `events` so the 1s interval callback (which has an empty
  // dependency array and is created once) can always read the latest
  // events without needing to be re-created every time events changes.
  const eventsRef = useRef(events);

  type IconItem = {
    label: string;
    image: any;
    onPress: () => void;
  };

  // Static nav/menu configuration grouped into sections for the home grid.
  const sections: { title: string; items: IconItem[] }[] = [
    {
      title: "School Info",
      items: [
        { label: "Mission & Vision", image: require("@/assets/images/school.png"), onPress: () => router.push("/vision") },
        { label: "Calendar", image: require("@/assets/images/calendar.png"), onPress: () => router.push("/calendar") },
        { label: "Bell Schedule", image: require("@/assets/images/bell.png"), onPress: () => router.push("/bell") },
        { label: "News", image: require("@/assets/images/news.png"), onPress: () => router.push("/news") },
      ],
    },
    {
      title: "Campus Life",
      items: [
        { label: "Campus Map", image: require("@/assets/images/map-icon.png"), onPress: () => router.push("/map") },
        { label: "Menu", image: require("@/assets/images/cafe.png"), onPress: () => router.push("/cafe") },
        { label: "Athletics", image: require("@/assets/images/ball.png"), onPress: () => router.push("/athletics") },
        { label: "Clubs", image: require("@/assets/images/clubs.png"), onPress: () => router.push("/clubs") },
        { label: "Events & Activities", image: require("@/assets/images/activity.png"), onPress: () => router.push("/events") },
        { label: "Academies", image: require("@/assets/images/book.png"), onPress: () => router.push("/academies") },
        { label: "Socials", image: require("@/assets/images/socials.png"), onPress: () => router.push("/legacy") },
      ],
    },
    {
      title: "People & Records",
      items: [
        { label: "Student", image: require("@/assets/images/user.png"), onPress: () => router.push("/student") },
        { label: "Staff", image: require("@/assets/images/staff.png"), onPress: () => router.push("/staff") },
        { label: "Registrar", image: require("@/assets/images/registrar.png"), onPress: () => router.push("/registrar") },
        { label: "Contacts", image: require("@/assets/images/phone.png"), onPress: () => router.push("/contacts") },
      ],
    },
    {
      title: "Links",
      items: [
        { label: "Infinite Campus", image: require("@/assets/images/if.png"), onPress: () => openLink("https://hawaii.infinitecampus.org/campus/hawaii.jsp") },
        { label: "Official Website", image: require("@/assets/images/globe.png"), onPress: () => openLink("https://www.waipahuhigh.org/") },
        { label: "Made By", image: require("@/assets/images/author.png"), onPress: () => router.push("/author") },
      ],
    },
  ];


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

  // Re-fetch events every time this screen comes into focus, not just on mount.
  // AbortController cancels the in-flight fetch if the screen loses focus
  // (or unmounts) before it resolves, preventing state updates on an
  // unfocused/unmounted screen.
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


  // Manual refresh trigger, wired to the ScrollView's RefreshControl below.
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

  // 1. Always keep ref updated so the interval effect (empty dep array)
  // can access the latest `events` without staleness.
  useEffect(() => {
    eventsRef.current = events;
  }, [events]);

  // Ticks once per second to recompute the "current period" / bell-schedule
  // progress bar. Tied to useFocusEffect so the interval is started when
  // this screen gains focus and cleared when it loses focus/unmounts —
  // it no longer keeps ticking in the background on other tabs.
  useFocusEffect(
    useCallback(() => {
      const timer = setInterval(() => {
        const now = new Date();
        const dayOfWeek = now.getDay();
        const currentEventsList = eventsRef.current;
        // Guard against calculateCurrentPeriod being called before events
        // have loaded (currentEventsList would otherwise be an empty array
        // and currentEventsList[0] would be undefined).
        if (dayOfWeek >= 1 && dayOfWeek <= 5 && currentEventsList.length > 0) {
          const periodData = calculateCurrentPeriod(now, currentEventsList[0]) as {
            currentPeriod: string;
            currentPeriodStart: string;
            currentPeriodEnd: string;
            timeLeft: string;
            loadingBarFactor: string;
          };
          setCurrentPeriod(periodData.currentPeriod);
          setCurrentPeriodStart(periodData.currentPeriodStart);
          setCurrentPeriodEnd(periodData.currentPeriodEnd);
          setTimeLeft(periodData.timeLeft);
          setLoadingBarFactor(periodData.loadingBarFactor);
        }

        // Flips the splash screen off once fonts are loaded + the first
        // tick has run. React bails out of the re-render here once this is
        // already true, since setState with an unchanged primitive is a
        // no-op, so this is safe to call every tick.
        setAppIsReady(true);
      }, 1000);

      return () => clearInterval(timer);
      // Re-created each time this screen refocuses; `eventsRef` (kept in
      // sync by the effect above) lets the callback always read the
      // latest events without needing `events` in this dependency array.
    }, [])
  );

  // Splash/loading screen: shown until fonts are loaded AND the first
  // interval tick has fired (see setAppIsReady(true) in the focus effect above).
  if ((appIsReady == false) || !fontsLoaded) {
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
        {/* Header banner with logo + "MY VOICE / MY CHOICE / MY FUTURE" stack.
            NOTE: uses vh/vw-style units ("h-[13rem]", "w-[100vw]") mixed with
            rem-based utility classes; vw/vh work via NativeWind's web target
            but may not behave the same on native depending on setup — worth
            confirming this renders as expected on iOS/Android, not just web. */}
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
        <View className="bg-white w-[100vw] h-[100vh] justify-center items-center " style={{ height: (height - 208)}}>
          <ScrollView
            className="w-[100vw] h-96 bg-white flex-1 flex-col "
            style={{ height: height * 0.5}}
            bounces={false}                
            overScrollMode="never"          
            scrollEventThrottle={16}       
            decelerationRate="normal"
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
            }
          >
            <ImageBackground
              source={require("@/assets/images/bg-home.png")}
              className="flex-row flex-wrap justify-center w-[100vw]"
              style={{ height: height * 1.5}}
            >
              
              {/* Bell-schedule widget: current period name, time range, and
                  a progress bar showing how far through the period we are.
                  Only renders once currentPeriod has been computed
                  (i.e. on a weekday, after the first interval tick). */}
              {currentPeriod !== '' ? (
                <View className="p-[20] w-[100%] "> 
                  <View className="flex flex-column">
                    <Text className="font-bold font-barlow text-whs-blue text-sm/none">{currentPeriod}</Text>
                    {timeLeft ? (
                      <View>
                        <Text className="font-bold font-barlow-regular text-whs-blue text-sm">{currentPeriodStart}-{currentPeriodEnd}</Text>
                        <View>
                          {/* Track (background) */}
                          <View className="w-[100%] bg-whs-gold/50 h-4 rounded-full absolute"></View>
                          {/* Fill — width driven by loadingBarFactor (e.g. "42%") */}
                          <View className=" bg-whs-gold h-4 rounded-full" style={{ width: loadingBarFactor || '0%'}}></View>
                        </View>
                      </View>
                    ) : null}
                  </View>
                  
                  
                  {timeLeft ? (
                    <View>
                      <Text className="font-bold font-barlow-regular text-whs-blue text-sm">{timeLeft}</Text>
                    </View>
                  ) : null}
                </View> 
              ) : (
                // Placeholder spacer on weekends / before period data is ready,
                // so layout doesn't jump when the widget above appears.
                <View className="h-[30px] w-full"></View>
              )}
              
              {/* Welcome banner: script logo + "WELCOME!" text */}
              <View className="flex flex-row justify-center items-center gap-[1rem] w-full">
                <Image
                  source={require("@/assets/images/marauder-script.png")} 
                  className="self-center object-contain" 
                  style={{ height: 40, width: 'auto', aspectRatio: 198 / 50 }} 
                >
                </Image>
                <Text className="z-20 font-barlow-italic text-2xl text-whs-blue text-center relative top-[1px] ">
                  WELCOME!
                </Text>
              </View>

              {/* Main icon grid, grouped by section (School Info, Campus Life,
                  People & Records, Links). Each item is a fixed-width (20%)
                  tile so 5 fit per row before wrapping. */}
              {sections.map((section) => (
                <View key={section.title} className="w-full mt-4 px-4">
                  <Text className="font-barlow-semibold text-whs-blue text-base mb-2 text-center">
                    {section.title}
                  </Text>
                  <View className="flex-row flex-wrap justify-center gap-4">
                    {section.items.map((item) => (
                      <TouchableOpacity
                        key={item.label}
                        className="w-[20%] h-min justify-center items-center"
                        onPress={item.onPress}
                        accessibilityRole="button"
                        accessibilityLabel={item.label}
                      >
                        <Image source={item.image} style={{ tintColor: "#17273d" }} className="size-[3.75rem] self-center" />
                        <Text className="text-center font-barlow-semibold text-[#17273d] text-xs">
                          {item.label}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              ))}
              
            </ImageBackground>
          </ScrollView>
        </View>
      </SafeAreaProvider>
    );
  } 
}