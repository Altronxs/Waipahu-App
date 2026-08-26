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
import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  ImageBackground,
  Dimensions,
  RefreshControl,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import type { WebView as WebViewType } from "react-native-webview";
import { WebView } from "react-native-webview";
import { loadWebsiteData } from '@/assets/json/eventService';
import { calculateCurrentPeriod } from '@/assets/json/schedule'
import schoolSchedule from '@/assets/json/school_schedule.json'

const { height } = Dimensions.get("window");

interface SchoolEvent {
  name: string;
  month: string; // e.g., "August" or "08"
  day: string;   // e.g., "17"
  time: string;  // e.g., "All Day" or a specific time string
}
interface ScheduleItem {
  date: Date;
  schedule: string;
}
const Bell = () => {
  const webViewRef = useRef<WebViewType>(null);
  const router = useRouter();
  const [currentPeriod, setCurrentPeriod] = useState<string>('');
  const [currentPeriodStart, setCurrentPeriodStart] = useState<string>('')
  const [currentPeriodEnd, setCurrentPeriodEnd] = useState<string>('')
  const [loadingBarFactor, setLoadingBarFactor] = useState<string>('0%')
  const [currentSchedule, setCurrentSchedule] = useState<string>('');
  const [weekdaySchedule, setWeekdaySchedule] = useState<ScheduleItem[]>([]);
  const [timeLeft, setTimeLeft] = useState('');
  const [appIsReady, setAppIsReady] = useState(false);

  const [events, setEvents] = useState<SchoolEvent[]>([]);
  const [eventsError, setEventsError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const eventsRef = useRef(events);

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

  // 1. Always keep ref updated
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

  const getWeekdays = (date: Date, scheduleID: string) => {
    // 1. Get the current date and time
    const current = date
    
    // 2. Find the current day index (0 for Sunday, 1 for Monday, etc.)
    // If it is Sunday (0), we treat it as 7 to correctly calculate back to Monday
    const dayIndex = current.getDay() === 0 ? 7 : current.getDay();
    
    // 3. Create a new Date object cloned from the current time
    const monday = new Date(current);
    
    // 4. Subtract days to shift the date back to Monday of this week
    // JavaScript automatically rolls back months/years if necessary
    monday.setDate(current.getDate() - dayIndex + 1);

    // 5. Generate an array with a length of exactly 5 elements
    let weekDates = []
    for (let i = 0; i < 5; i++) {
      // getSchedule
      const index = Number(scheduleID[i])
      const schedule = schoolSchedule.schedule[index].day
      // Clone the Monday date object for each iteration
      const date = new Date(monday);
      
      // Add the current loop index (0 to 4) to get Mon, Tue, Wed, Thu, Fri
      date.setDate(monday.getDate() + i);

      weekDates[i] = {date: date, schedule: schedule};
    }
    return weekDates;
  };

  // Ticks once per second to recompute the "current period" / bell-schedule
  // progress bar. Tied to useFocusEffect so the interval starts when this
  // screen gains focus and is cleared when it loses focus/unmounts, instead
  // of ticking forever in the background.
  useFocusEffect(
    useCallback(() => {
      const timer = setInterval(() => {
        const now = getHawaiiDate()
        const dayOfWeek = now.getDay();
        const currentEventsList = eventsRef.current;
        // Guard against calling calculateCurrentPeriod before events have
        // loaded (currentEventsList would otherwise be empty, making
        // currentEventsList[0] undefined).
        if (dayOfWeek >= 1 && dayOfWeek <= 5 && currentEventsList.length > 0) {
          const periodData = calculateCurrentPeriod(now, currentEventsList[0]) as {
            currentPeriod: string;
            currentPeriodStart: string;
            currentPeriodEnd: string;
            timeLeft: string;
            loadingBarFactor: string;
            scheduleID: string;
            schedule: string;
          };
          setWeekdaySchedule(getWeekdays(now, periodData.scheduleID));
          setCurrentSchedule(periodData.schedule)
          setCurrentPeriod(periodData.currentPeriod);
          setCurrentPeriodStart(periodData.currentPeriodStart);
          setCurrentPeriodEnd(periodData.currentPeriodEnd);
          setTimeLeft(periodData.timeLeft);
          setLoadingBarFactor(periodData.loadingBarFactor);
        }

        setAppIsReady(true);
      }, 1000);

      return () => clearInterval(timer);
      // Re-created each time this screen refocuses; `eventsRef` (kept in
      // sync by the effect above) lets the callback read the latest events
      // without needing `events` in this dependency array.
    }, [])
  );


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
          Bell Schedule SY25-26
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
          <ImageBackground
            source={require("@/assets/images/bg-home.png")}
            className="flex-row flex-wrap justify-center items-start w-[100vw] h-[100vh]"

          >
            <View className="self-center items-center flex flex-column w-[100vw] h-[80vh] z-10 ">
              <View className="flex bg-white p-[5%] w-[90%] mt-5  ">
              
                <View className="flex flex-column">
                  <Text className="font-bold font-barlow text-whs-blue text-base">{currentPeriod}</Text>
                  {timeLeft ? (
                    <View>
                      <Text className="font-light font-barlow-regular text-whs-blue text-sm">{currentSchedule}  |  {currentPeriodStart}-{currentPeriodEnd}</Text>
                      <View>
                        <View className="w-[100%] bg-whs-gold/50 h-4 rounded-full absolute"></View>
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
              <View className="flex-row flex-wrap justify-center mt-5 w-[90%]">
                {weekdaySchedule.map((day, index) => {
                  // Convert the ISO string into a local readable date format
                  const monthString = day.date.toLocaleString('en-US', { month: 'short' });
                  const dayString = day.date.toLocaleString('en-US', { weekday: 'short' });

                  return (
                    <React.Fragment key={index}>
                      <View className="flex flex-colflex-nowrap bg-whs-blue w-[20%] p-5">
                        <View className="justify-center items-start border-b-2 border-white">
                          
                          <Text className="text-whs-gold text-center font-source-serif-bold font-black text-base/tight">{day.date.getDate()}</Text>
                          <Text className="text-white text-xs/tight font-semibold font-source-serif-bold">{dayString}</Text>                       
                        </View>
                        <View className="justify-center items-start">
                          <Text className="text-white text-xs font-light font-source-serif-regular pt-3 shrink break-all">{day.schedule}</Text>
                        </View>
                      </View>
                    </React.Fragment>
                  );
                })}

              </View>
              <View className="self-center items-start flex-row h-3/4 z-0 p-[20]">
                  <WebView
                    className="relative h-[50%]"
                    ref={webViewRef}
                    source={{ uri: 'https://www.waipahuhigh.org/full%20bell%2025-26%20revised.pdf' }}
                  />
              </View>
            </View>
          </ImageBackground>
        </ScrollView>
      </View>
      
      
    </SafeAreaProvider>
  );
};

export default Bell;