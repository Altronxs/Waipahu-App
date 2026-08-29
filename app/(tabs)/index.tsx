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
    Modal,
    Text,
    TouchableOpacity,
    useWindowDimensions,
    View,
} from "react-native";
import { GlassView } from 'expo-glass-effect';
import { SafeAreaProvider } from "react-native-safe-area-context"; 
import "../globals.css";
import { loadWebsiteData } from '@/assets/json/eventService';
import { calculateCurrentPeriod } from '@/assets/json/schedule'
import { Dropdown } from 'react-native-element-dropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';


interface SchoolEvent {
  name: string;
  month: string; // e.g., "August" or "08"
  day: string;   // e.g., "17"
  time: string;  // e.g., "All Day" or a specific time string
}

// Your strict alphanumeric mapping array
const SCHEDULE_OPTIONS = [
  { label: 'No Override', value: '-1' },
  { label: 'Monday Schedule', value: '0' },
  { label: 'Tuesday Schedule', value: '1' },
  { label: 'Wednesday Schedule', value: '2' },
  { label: 'Thursday Schedule', value: '3' },
  { label: 'Friday Schedule', value: '4' },
  { label: 'A Assembly', value: '5' },
  { label: 'Double B Assembly', value: '6' },
  { label: 'C Assembly', value: '7' },
  { label: 'No School / Holiday', value: '8' },
  { label: 'EXAM A Schedule', value: '9' },
  { label: 'EXAM B Schedule', value: '10' },
];

// Shared helper so openURL rejections (app not installed, malformed URL, etc.)
// don't surface as unhandled promise rejections.
const openLink = (url: string) => {
  Linking.openURL(url).catch((error) => {
    console.error("Failed to open URL:", error);
  });
};

export default function Index() {
  const router = useRouter(); // Get the router instance
  const { height, width } = useWindowDimensions();

  // --- Bell-schedule / "current period" state ---
  // These are recomputed every second by the interval effect below.
  const [currentPeriod, setCurrentPeriod] = useState<string>('');
  const [currentPeriodStart, setCurrentPeriodStart] = useState<string>('')
  const [currentPeriodEnd, setCurrentPeriodEnd] = useState<string>('')
  const [loadingBarFactor, setLoadingBarFactor] = useState<string>('0%')
  const [currentSchedule, setCurrentSchedule] = useState<string>('')
  const [timeLeft, setTimeLeft] = useState('');

  // Gate for the splash/loading screen. Only flips true once fonts are loaded
  // AND the first tick of the interval effect has run (see effect below).
  const [appIsReady, setAppIsReady] = useState(false);

  const [events, setEvents] = useState<SchoolEvent[]>([]);
  const [eventsError, setEventsError] = useState<string | null>(null);

  // Drives the pull-to-refresh spinner on the ScrollView (see
  // handleRefresh / RefreshControl below).
  const [refreshing, setRefreshing] = useState(false);

  //
  const [isSheetVisible, setIsSheetVisible] = useState(false);

  //
  const [selectedSchedule, setSelectedSchedule] = useState<string>('');
  const [isFocus, setIsFocus] = useState(false);

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
      title: "",
      items: [
        { label: "Mission & Vision", image: require("@/assets/images/school.png"), onPress: () => router.push("/vision") },
        { label: "Calendar", image: require("@/assets/images/calendar.png"), onPress: () => router.push("/calendar") },
        { label: "Bell Schedule", image: require("@/assets/images/bell.png"), onPress: () => router.push("/bell") },
        { label: "News", image: require("@/assets/images/news.png"), onPress: () => router.push("/news") },
        { label: "Campus Map", image: require("@/assets/images/map-icon.png"), onPress: () => router.push("/map") },
        { label: "Menu", image: require("@/assets/images/cafe.png"), onPress: () => router.push("/cafe") },
        { label: "Athletics", image: require("@/assets/images/ball.png"), onPress: () => router.push("/athletics") },
        { label: "Clubs", image: require("@/assets/images/clubs.png"), onPress: () => router.push("/clubs") },
        { label: "Events & Activities", image: require("@/assets/images/activity.png"), onPress: () => router.push("/events") },
        { label: "Academies", image: require("@/assets/images/book.png"), onPress: () => router.push("/academy") },
        { label: "Socials", image: require("@/assets/images/socials.png"), onPress: () => router.push("/legacy") },
        { label: "Student", image: require("@/assets/images/user.png"), onPress: () => router.push("/student") },
        { label: "Staff", image: require("@/assets/images/staff.png"), onPress: () => router.push("/staff") },
        { label: "Registrar", image: require("@/assets/images/registrar.png"), onPress: () => router.push("/registrar") },
        { label: "Contacts", image: require("@/assets/images/phone.png"), onPress: () => router.push("/contacts") },
        { label: "Infinite Campus", image: require("@/assets/images/if.png"), onPress: () => openLink("https://hawaii.infinitecampus.org/campus/hawaii.jsp") },
        { label: "Official Website", image: require("@/assets/images/globe.png"), onPress: () => openLink("https://www.waipahuhigh.org/") },
        { label: "App Settings", image: require("@/assets/images/gear.png"), onPress: () => router.push("/settings") },
        { label: "Made By", image: require("@/assets/images/author.png"), onPress: () => router.push("/author") },
      ],
    }
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

  /**
   * Generates a standard JavaScript Date object set to Hawaii Standard Time (HST),
   * completely bypassing the user's local system timezone settings.
   * @returns {Date} A Date object reflecting current Hawaii time.
   */
  const getHawaiiDate = () => {
    // Get the current timestamp based on the user's device clock
    const localTime = new Date();
    
    // getTimezoneOffset() returns the difference in minutes between local time and UTC.
    // Multiplying by 60,000 converts those minutes into milliseconds.
    // Adding this to the local timestamp normalizes the time to absolute UTC (Greenwich Mean Time).
    const utcTime = localTime.getTime() + (localTime.getTimezoneOffset() * 60000);
    
    // Hawaii is locked to UTC-10 and never changes for Daylight Saving Time.
    const hawaiiOffsetHours = -10;
    
    // Multiplying 3,600,000 (milliseconds in 1 hour) by -10 calculates the shift needed.
    // Adding this to the UTC time gives us the exact absolute time in Hawaii.
    const hawaiiMilliseconds = utcTime + (3600000 * hawaiiOffsetHours);
    
    // Create and return a new Date object initialized to Hawaii's exact current time.
    // Methods like .getHours() or .getDate() will now return Hawaii-specific values.
    return new Date(hawaiiMilliseconds);
  }


  // Ticks once per second to recompute the "current period" / bell-schedule
  // progress bar. Tied to useFocusEffect so the interval is started when
  // this screen gains focus and cleared when it loses focus/unmounts —
  // it no longer keeps ticking in the background on other tabs.
  useFocusEffect(
    useCallback(() => {
      const timer = setInterval(() => {
        const now = getHawaiiDate();
        const dayOfWeek = now.getDay();
        const currentEventsList = eventsRef.current;
        // Guard against calculateCurrentPeriod being called before events
        // have loaded (currentEventsList would otherwise be an empty array
        // and currentEventsList[0] would be undefined).
        if (dayOfWeek >= 1 && dayOfWeek <= 5 && currentEventsList.length > 0) {

          const periodData = calculateCurrentPeriod(now, currentEventsList[0], String(selectedSchedule)) as {
            currentPeriod: string;
            currentPeriodStart: string;
            currentPeriodEnd: string;
            timeLeft: string;
            loadingBarFactor: string;
            scheduleID: string;
            schedule: string;
          };
          setCurrentSchedule(periodData.schedule)
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
    }, [selectedSchedule])
  );

  // Run this lifecycle hook immediately when the component mounts to the screen
  useEffect(() => {
    // Define an internal asynchronous function since useEffect callbacks cannot be async
    const loadSavedSchedule = async () => {
      try {
        // Await the asynchronous retrieval of the saved schedule string from disk
        const savedValue = await AsyncStorage.getItem('setting.schedule');
        
        // If the key exists, update our state. If it returns null, fall back to our default empty string.
        setSelectedSchedule(savedValue ?? '');
      } catch (error) {
        // Catch any filesystem errors to prevent the application from crashing
        console.error("Failed to load local schedule settings data:", error);
      }
    };

    // Execute the retrieval routine
    loadSavedSchedule();
  }, []); // Empty dependency array ensures this effect runs exactly once on mount


  const openSheetFor = () => {
    setIsSheetVisible(true);
  };

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
        <View className="bg-white w-[100vw] h-[100vh] justify-center items-center ">
          <ScrollView
            className="w-[100vw] bg-white flex-1 flex-col"
            style={{ height: height * 0.5}}
            bounces={true}                
            overScrollMode="never"          
            scrollEventThrottle={16}       
            decelerationRate="normal"
            
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
            }
          >
            <ImageBackground
              source={require("@/assets/images/bg-home.png")}
              className="flex-row flex-wrap flex-1 justify-center  w-[100vw]"
              style={{ flex: 1, height: height * 1.25}}
              resizeMode="cover"
            >
              
              
              
              {/* Welcome banner: script logo + "WELCOME!" text */}
              <View className="justify-center items-center pt-10 w-[90%]">
                <View className="flex flex-col gap-[0px]">
                  <Text className="z-20 font-barlow-italic text-5xl text-whs-blue text-center self-center">
                    WELCOME
                  </Text>
                  <Image
                    source={require("@/assets/images/marauder-script.png")} 
                    className="self-end object-contain " 
                    style={{ height: 35, width: 'auto', aspectRatio: 198 / 50 }} 
                  >
                  </Image>
                </View>
              </View>
            

              {/* Bell-schedule widget: current period name, time range, and
                  a progress bar showing how far through the period we are.
                  Only renders once currentPeriod has been computed
                  (i.e. on a weekday, after the first interval tick). */}
              {currentPeriod !== '' ? (
                <View className="pt- px-5 w-[90%] "> 
                  <View className="flex flex-column">
                    <Text className="font-bold font-barlow text-whs-blue text-base/none">{currentPeriod}
                      <TouchableOpacity
                        className="justify-center items-center z-30  aspect-square"
                        style={{
                          width: 30, height: 50
                        }}
                        onPress={() => router.push("/settings")}
                      >
                        <Image
                          source={require("@/assets/images/question.png")}
                          style={{
                            tintColor: "#17273d", width: 20, height: 18, objectFit: 'contain'
                          }}
                          className="self-center object-contain"
                        />
                      </TouchableOpacity>
                    </Text>
                    {timeLeft ? (
                      <View>
                        <Text className="font-bold font-barlow-regular text-whs-blue text-sm"><Text className="">{currentSchedule.replace('Schedule', '')}</Text>  |  {currentPeriodStart.replace('0:00', '12:00am')}-{currentPeriodEnd}</Text>
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
                <View className="h-[20px] w-full"></View>
              )}


              {/* Main icon grid, grouped by section (School Info, Campus Life,
                  People & Records, Links). Each item is a fixed-width (20%)
                  tile so 5 fit per row before wrapping. */}
              {sections.map((section) => (
                <View key={section.title} className="w-[90%] px-4">
                  <Text className="font-barlow-semibold text-center">
                    {section.title}
                  </Text>
                  <View className="flex-row flex-wrap justify-center">
                    {section.items.map((item) => (
                      <TouchableOpacity
                        key={item.label}
                        className="w-[30%] h-min justify-center items-center py-3"
                        onPress={item.onPress}
                        accessibilityRole="button"
                        accessibilityLabel={item.label}
                      >
                        <Image source={item.image} style={{ tintColor: "#17273d" }} className="size-[4.25rem] self-center" />
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