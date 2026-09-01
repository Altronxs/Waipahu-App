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
    Switch,
} from "react-native";
import { GlassView } from 'expo-glass-effect';
import { SafeAreaProvider } from "react-native-safe-area-context"; 
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
  { label: 'Auto', value: '-1' },
  { label: 'Monday', value: '0' },
  { label: 'Tuesday', value: '1' },
  { label: 'Wednesday', value: '2' },
  { label: 'Thursday', value: '3' },
  { label: 'Friday', value: '4' },
  { label: 'A Assembly', value: '5' },
  { label: 'Double B Assembly', value: '6' },
  { label: 'C Assembly', value: '7' },
  { label: 'No School / Holiday', value: '8' },
  { label: 'EXAM A', value: '9' },
  { label: 'EXAM B', value: '10' },
];

// Shared helper so openURL rejections (app not installed, malformed URL, etc.)
// don't surface as unhandled promise rejections.
const openLink = (url: string) => {
  Linking.openURL(url).catch((error) => {
    console.error("Failed to open URL:", error);
  });
};

export default function Settings() {
  const router = useRouter(); // Get the router instance
  const { height, width } = useWindowDimensions();

  // Gate for the splash/loading screen. Only flips true once fonts are loaded
  // AND the first tick of the interval effect has run (see effect below).
  const [appIsReady, setAppIsReady] = useState(true); //This page doesn't need to load anything so hard coded true

  const [events, setEvents] = useState<SchoolEvent[]>([]);
  const [eventsError, setEventsError] = useState<string | null>(null);

  // Drives the pull-to-refresh spinner on the ScrollView (see
  // handleRefresh / RefreshControl below).
  const [refreshing, setRefreshing] = useState(false);

  const [AllowMapLocation, setAllowMapLocation] = useState<boolean>(false)
  const toggleSwitch = () => setAllowMapLocation(previousState => !previousState);
  //
  const [selectedSchedule, setSelectedSchedule] = useState<string>('');
  const [isFocus, setIsFocus] = useState(false);

  // Ref mirror of `events` so the 1s interval callback (which has an empty
  // dependency array and is created once) can always read the latest
  // events without needing to be re-created every time events changes.

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
//   useFocusEffect(
//     useCallback(() => {
//       const controller = new AbortController();

//       loadWebsiteData({
//         signal: controller.signal,
//         setEvents,
//         setEventsError,
//         setAppIsReady,
//       });
      
//       return () => {
//         controller.abort();
//       };
//     }, [])
//   );


  // Manual refresh trigger, wired to the ScrollView's RefreshControl below.
  const handleRefresh = async () => {
    setRefreshing(true);
    // const controller = new AbortController();

    // await loadWebsiteData({
    //   signal: controller.signal,
    //   setEvents,
    //   setEventsError,
    //   setAppIsReady,
    // });
    
    setRefreshing(false);
  };

  // 1. Always keep ref updated so the interval effect (empty dep array)
  // can access the latest `events` without staleness.
//   useEffect(() => {
//     eventsRef.current = events;
//   }, [events]);

  /**
   * Generates a standard JavaScript Date object set to Hawaii Standard Time (HST),
   * completely bypassing the user's local system timezone settings.
   * @returns {Date} A Date object reflecting current Hawaii time.
   */
//   const getHawaiiDate = () => {
//     // Get the current timestamp based on the user's device clock
//     const localTime = new Date();
    
//     // getTimezoneOffset() returns the difference in minutes between local time and UTC.
//     // Multiplying by 60,000 converts those minutes into milliseconds.
//     // Adding this to the local timestamp normalizes the time to absolute UTC (Greenwich Mean Time).
//     const utcTime = localTime.getTime() + (localTime.getTimezoneOffset() * 60000);
    
//     // Hawaii is locked to UTC-10 and never changes for Daylight Saving Time.
//     const hawaiiOffsetHours = -10;
    
//     // Multiplying 3,600,000 (milliseconds in 1 hour) by -10 calculates the shift needed.
//     // Adding this to the UTC time gives us the exact absolute time in Hawaii.
//     const hawaiiMilliseconds = utcTime + (3600000 * hawaiiOffsetHours);
    
//     // Create and return a new Date object initialized to Hawaii's exact current time.
//     // Methods like .getHours() or .getDate() will now return Hawaii-specific values.
//     return new Date(hawaiiMilliseconds);
//   }


  // Ticks once per second to recompute the "current period" / bell-schedule
  // progress bar. Tied to useFocusEffect so the interval is started when
  // this screen gains focus and cleared when it loses focus/unmounts —
  // it no longer keeps ticking in the background on other tabs.
//   useFocusEffect(
//     useCallback(() => {
//       const timer = setInterval(() => {
//         const now = getHawaiiDate();
//         const dayOfWeek = now.getDay();
//         const currentEventsList = eventsRef.current;
//         // Guard against calculateCurrentPeriod being called before events
//         // have loaded (currentEventsList would otherwise be an empty array
//         // and currentEventsList[0] would be undefined).
//         if (dayOfWeek >= 1 && dayOfWeek <= 5 && currentEventsList.length > 0) {

//           const periodData = calculateCurrentPeriod(now, currentEventsList[0], String(selectedSchedule)) as {
//             currentPeriod: string;
//             currentPeriodStart: string;
//             currentPeriodEnd: string;
//             timeLeft: string;
//             loadingBarFactor: string;
//             scheduleID: string;
//             schedule: string;
//           };
//           setCurrentSchedule(periodData.schedule)
//           setCurrentPeriod(periodData.currentPeriod);
//           setCurrentPeriodStart(periodData.currentPeriodStart);
//           setCurrentPeriodEnd(periodData.currentPeriodEnd);
//           setTimeLeft(periodData.timeLeft);
//           setLoadingBarFactor(periodData.loadingBarFactor);
//         }

//         // Flips the splash screen off once fonts are loaded + the first
//         // tick has run. React bails out of the re-render here once this is
//         // already true, since setState with an unchanged primitive is a
//         // no-op, so this is safe to call every tick.
//         setAppIsReady(true);
//       }, 1000);

//       return () => clearInterval(timer);
//       // Re-created each time this screen refocuses; `eventsRef` (kept in
//       // sync by the effect above) lets the callback always read the
//       // latest events without needing `events` in this dependency array.
//     }, [selectedSchedule])
//   );

  // Run this lifecycle hook immediately when the component mounts to the screen
  useEffect(() => {
    // Define an internal asynchronous function since useEffect callbacks cannot be async
    const loadSavedSettings = async () => {
      try {
        // Await the asynchronous retrieval of the saved schedule string from disk
        const savedValue = await AsyncStorage.getItem('setting.schedule');
        const savedAllowLocatorMark = await AsyncStorage.getItem('setting.mapLocation');
        
        // If the key exists, update our state. If it returns null, fall back to our default empty string.
        setAllowMapLocation(savedAllowLocatorMark !== null ? JSON.parse(savedAllowLocatorMark) : false)
        setSelectedSchedule(savedValue ?? '');
      } catch (error) {
        // Catch any filesystem errors to prevent the application from crashing
        console.error("Failed to load local schedule settings data:", error);
      }
    };

    // Execute the retrieval routine
    loadSavedSettings();
  }, []); // Empty dependency array ensures this effect runs exactly once on mount


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
        <View className="bg-white w-[100vw] h-[100vh] justify-center items-center ">
            <View className="flex flex-row flex-nowrap items-center bg-whs-blue w-full pt-16">
                <GlassView
                    style={{alignSelf: 'flex-start', zIndex: 30, borderRadius: 1000, alignItems: 'center', padding: 6, margin: 20}}
                    glassEffectStyle="clear"
                    isInteractive
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
                
                <Text className="z-20 font-roboto-bold text-white text-center text-xl pb-2">
                    App Settings
                </Text>
                <Image
                    source={require("@/assets/images/whs-logo.png")}
                    className="w-16 h-16 ml-auto mr-7"
                />
            </View> 
            <ScrollView
                className="w-[100vw]  flex-1 flex-col bg-black/10"
                style={{ height: height * 0.5}}
                bounces={true}                
                overScrollMode="never"          
                scrollEventThrottle={16}       
                decelerationRate="normal"
                
                refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
                }
            >
                <View
                    className="w-full h-[100vh] flex flex-col justify-start"
                >   
                    <Text
                        className="w-[90%] z-20 font-barlow-semibold text-2xl p-3 mt-5 ml-3 self-center"
                        style={{color: '#5b5b5b'}}
                    >
                        Bell Schedule
                    </Text>
                    <View
                        className="w-[90%] self-center bg-white flex flex-row flex-nowrap"
                        style={{borderRadius: 20}}
                    >
                        <Image
                            source={require("@/assets/images/bell-2.png")}
                            className="self-center"
                            style={{width: 45, height: 45, marginLeft: 20, marginRight: 8}}
                        />
                        <Text
                            className="z-20 font-barlow-semibold text-black text-xl p-3"
                        >
                            Schedule
                        </Text>
                        <Dropdown
                        style={{
                          width: '50%',
                          height: 50,
                          paddingHorizontal: 20,
                          borderRadius: 16,
                          marginLeft: 'auto',
                        }}
                        containerStyle={{
                          backgroundColor: '#ffffff',
                          borderWidth: 0,
                          borderRadius: 32,
                          padding: 16
                        }}
                        // --- ALIGNMENT FOR THE PLACEHOLDER TEXT ---
                        placeholderStyle={{ 
                          fontSize: 20, 
                          color: '#8b8b8b',
                          flex: 1,
                          fontFamily: 'BarlowSemiCondensed_600SemiBold',
                          textAlign: 'right'
                        }} 
                        // --- ALIGNMENT FOR THE SELECTED ITEM TEXT ---
                        selectedTextStyle={{ 
                          fontSize: 20, 
                          color: '#8b8b8b',
                          flex: 1,
                          fontFamily: 'BarlowSemiCondensed_600SemiBold',
                          textAlign: 'right'
                        }} 
                        // --- SET LINE LIMIT ON MAIN SELECTION TEXT ---
                        selectedTextProps={{
                          numberOfLines: 1,
                        }}
                        activeColor=""
                        // --- ALIGNMENT FOR THE DROPDOWN LIST POPUP ITEMS ---
                        itemTextStyle={{
                          fontSize: 20,
                          color: '#000000',
                          fontFamily: 'BarlowSemiCondensed_600SemiBold',
                          textAlign: 'left'
                        }}
                        data={SCHEDULE_OPTIONS}
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={!isFocus ? 'Auto' : '...'}
                        value={selectedSchedule}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={async (item) => { 
                          // 1. Guard check: Ensure item and item.value actually exist
                          if (item?.value) {
                            // 2. Instantly update the React state to make the UI feel fast and snappy
                            setSelectedSchedule(item.value); 
                            
                            try {
                              // 3. Persist the string choice to local storage asynchronously
                              // We cast item.value to a String to guarantee it matches AsyncStorage requirements
                              await AsyncStorage.setItem('setting.schedule', String(item.value));
                            } catch (error) {
                              console.error("Failed to save schedule selection:", error);
                            }
                          }
                          
                          // 4. Close the dropdown menu overlay
                          setIsFocus(false); 
                        }}
                      />
                    </View>
                    <Text
                        className="w-[90%] z-20 font-barlow-semibold text-base/tight p-3 self-center"
                        style={{color: '#8b8b8b'}}
                    >
                        Choose which bell schedule the app uses to show your current period. Leave it on Auto to match today's actual schedule, or manually select a specific day type (like an assembly or exam schedule) to preview it.
                    </Text>

                    <Text
                        className="w-[90%] z-20 font-barlow-semibold text-2xl p-3 ml-3 self-center"
                        style={{color: '#5b5b5b'}}
                    >
                        Map
                    </Text>
                    <View
                        className="w-[90%] self-center bg-white flex flex-row flex-nowrap"
                        style={{borderRadius: 20}}
                    >
                        <Image
                            source={require("@/assets/images/whs-map.png")}
                            className="self-center"
                            style={{width: 30, height: 30, marginLeft: 20, marginRight: 8}}
                        />
                        <Text
                            className="z-20 font-barlow-semibold text-black text-xl p-3"
                        >
                            Location Marker
                        </Text>
                        <Switch
                          style={{
                            alignSelf: 'center',
                            marginHorizontal: 10,
                            borderRadius: 16,
                            marginLeft: 'auto',
                            backgroundColor: '#9e9e9e',
                          }}
                          trackColor={{false: '#545454', true: '#b28d3e'}}
                          thumbColor={AllowMapLocation ? '#ffffff' : '#f4f3f4'}
                          onValueChange={async (nextValue) => {
                            setAllowMapLocation(nextValue);
                            console.log(nextValue)
                            try {
                              await AsyncStorage.setItem('setting.mapLocation', String(nextValue));
                            } catch (error) {
                              console.error("Failed to save map location setting:", error);
                            }
                          }}
                          value={AllowMapLocation}
                        />
                    </View>
                    <Text
                        className="w-[90%] z-20 font-barlow-semibold text-2xl p-3 ml-3 self-center"
                        style={{color: '#5b5b5b'}}
                    >
                        Information
                    </Text>
                    <TouchableOpacity
                      className="w-[90%] self-center bg-white flex flex-row flex-nowrap"
                      style={{borderTopLeftRadius: 20, borderTopRightRadius: 20}}
                      onPress={() => {
                        router.push("/author")
                      }}
                    >
                      <View
                          className="w-[100%] self-center bg-white flex flex-row flex-nowrap"
                          style={{borderTopLeftRadius: 20, borderTopRightRadius: 20}}
                          
                      >
                  
                          <Image
                              source={require("@/assets/images/author.png")}
                              className="self-center"
                              style={{width: 30, height: 30, marginLeft: 20, marginRight: 8}}
                          />
                          <Text
                              className="z-20 font-barlow-semibold text-black text-xl p-3"
                          >
                              Authors
                          </Text>
                          <Image
                              source={require("@/assets/images/forward.png")}
                              className="self-center"
                              
                              style={{width: 20, height: 20, marginLeft: 'auto', marginRight: 20, tintColor: '#8b8b8b'}}
                          />
                      </View>
                    </TouchableOpacity>
                    
                    <View
                        className="w-[90%] self-center bg-white flex flex-row flex-nowrap border-t-2 border-black/10"
                        
                    >
                        <Image
                            source={require("@/assets/images/docs.png")}
                            className="self-center"
                            style={{width: 30, height: 30, marginLeft: 20, marginRight: 8}}
                        />
                        <Text
                            className="z-20 font-barlow-semibold text-black text-xl p-3"
                        >
                          App Version
                        </Text>
                        <Text className="self-center ml-auto mr-[20px]"
                          style={{color: '#8b8b8b'}}
                        >
                          1.0.0
                        </Text>
                    </View>
                    <TouchableOpacity
                      className="w-[90%] self-center bg-white flex flex-row flex-nowrap"
                      style={{borderBottomLeftRadius: 20, borderBottomRightRadius: 20}}
                      onPress={() => {
                        openLink("https://github.com/Altronxs/Waipahu-App")
                      }}
                    >
                      <View
                        className="w-[100%] self-center bg-white flex flex-row flex-nowrap border-t-2 border-black/10"  
                        style={{borderBottomLeftRadius: 20, borderBottomRightRadius: 20}}  
                      >
                  
                          <Image
                              source={require("@/assets/images/globe.png")}
                              className="self-center"
                              style={{width: 30, height: 30, marginLeft: 20, marginRight: 8}}
                          />
                          <Text
                              className="z-20 font-barlow-semibold text-black text-xl p-3"
                          >
                              Source Code
                          </Text>
                          <Image
                              source={require("@/assets/images/forward.png")}
                              className="self-center"
                              
                              style={{width: 20, height: 20, marginLeft: 'auto', marginRight: 20, tintColor: '#8b8b8b'}}
                          />
                      </View>
                    </TouchableOpacity>
                    <Text
                        className="w-[90%] z-20 font-barlow-semibold text-base/tight p-3 self-center"
                        style={{color: '#8b8b8b'}}
                    >
                        MADE BY STUDENTS & ALUMNI
                    </Text>

                </View>
                
            </ScrollView>
        </View>
      </SafeAreaProvider>
    );
  } 
}