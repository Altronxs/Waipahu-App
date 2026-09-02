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
  Modal,
  View,
  ScrollView,
  useWindowDimensions,
  RefreshControl,
} from "react-native";
// NOTE: `ImageBackground` was imported but never used — removed.
import { SafeAreaProvider } from "react-native-safe-area-context";
import type { WebView as WebViewType } from "react-native-webview";
import { WebView } from "react-native-webview";
import { Dropdown } from 'react-native-element-dropdown';
import { GlassView } from 'expo-glass-effect';
import { loadWebsiteData } from '@/assets/json/eventService';
import { calculateCurrentPeriod, findCalendarEntryForDate } from '@/assets/json/schedule'
import schoolSchedule from '@/assets/json/school_schedule.json'
import AsyncStorage from '@react-native-async-storage/async-storage';


interface SchoolEvent {
  name: string;
  month: string; // e.g., "August" or "08"
  day: string;   // e.g., "17"
  time: string;  // e.g., "All Day" or a specific time string
}
interface ScheduleItem {
  date: Date;
  schedule: (typeof schoolSchedule.schedule)[number];
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


// Shape returned by `calculateCurrentPeriod`. Declaring this once here (instead
// of inline `as {...}` casts at every call site) makes it easier to keep in
// sync if `schedule.ts` changes, and gives you real type-checking on the
// return value rather than an unchecked assertion.
interface PeriodData {
  currentPeriod: string;
  currentPeriodStart: string;
  currentPeriodEnd: string;
  timeLeft: string;
  loadingBarFactor: string;
  scheduleID: string;
  schedule: string;
}

// Shape returned by `findCalendarEntryForDate`.
interface CalendarEntry {
  scheduleID: string;
}

const Bell = () => {
  const webViewRef = useRef<WebViewType>(null);
  const router = useRouter();
  const { height, width } = useWindowDimensions();

  // "Current period" bell-schedule state (progress bar, period name, times left, etc.)
  const [currentPeriod, setCurrentPeriod] = useState<string>('');
  const [currentPeriodStart, setCurrentPeriodStart] = useState<string>('')
  const [currentPeriodEnd, setCurrentPeriodEnd] = useState<string>('')
  const [loadingBarFactor, setLoadingBarFactor] = useState<string>('0%')
  const [currentSchedule, setCurrentSchedule] = useState<string>('');
  const [weekdaySchedule, setWeekdaySchedule] = useState<ScheduleItem[]>([]);
  const [timeLeft, setTimeLeft] = useState('');
  const [appIsReady, setAppIsReady] = useState(false);

  // Events pulled from the school website (used to look up the period schedule).
  const [events, setEvents] = useState<SchoolEvent[]>([]);
  const [eventsError, setEventsError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  // Kept in sync with `events` via the effect below so the 1s interval callback
  // (which is only created once per focus, see the `useFocusEffect` further
  // down) can always read the latest events without needing `events` itself
  // in its dependency array.
  const eventsRef = useRef(events);

  // Tracks the day/scheduleID we last built `weekdaySchedule` for, so the
  // 1s interval doesn't rebuild 5 Date objects + look up 5 schedules on
  // every single tick — only when the calendar day (or the schedule for
  // that day) actually changes.
  const lastScheduleKeyRef = useRef<string>('');

  //
  const [isSheetVisible, setIsSheetVisible] = useState(false);

  //
  const [selectedSchedule, setSelectedSchedule] = useState<string>('');
  const [isFocus, setIsFocus] = useState(false);

  // Reload the bell-schedule PDF WebView every time the screen regains focus,
  // so it doesn't sit on a stale/blank load if the user navigated away mid-load.
  useFocusEffect(
    useCallback(() => {
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

  // Always keep the ref updated so the interval callback below can see fresh events.
  useEffect(() => {
    eventsRef.current = events;
  }, [events]);

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

  /**
   * Generates a standard JavaScript Date object set to Hawaii Standard Time (HST),
   * completely bypassing the user's local system timezone settings.
   * @returns {Date} A Date object reflecting current Hawaii time.
   */
  const getHawaiiDate = () => {
    // Get the current timestamp based on the user's device clock.
    const localTime = new Date();

    // getTimezoneOffset() returns the difference in minutes between local time and UTC.
    // Multiplying by 60,000 converts those minutes into milliseconds.
    // Adding this to the local timestamp normalizes the time to absolute UTC (Greenwich Mean Time).
    const utcTime = localTime.getTime() + (localTime.getTimezoneOffset() * 60000);

    // Hawaii is locked to UTC-10 and never observes Daylight Saving Time.
    const hawaiiOffsetHours = -10;

    // Multiplying 3,600,000 (milliseconds in 1 hour) by -10 calculates the shift needed.
    // Adding this to the UTC time gives us the exact absolute time in Hawaii.
    const hawaiiMilliseconds = utcTime + (3600000 * hawaiiOffsetHours);

    // Create and return a new Date object initialized to Hawaii's exact current time.
    // Methods like .getHours() or .getDate() will now return Hawaii-specific values.
    return new Date(hawaiiMilliseconds);
  }

  /**
   * Builds the Mon–Fri date/schedule list for the week containing `date`,
   * using `scheduleID` (a 5-character string, one digit per weekday) to look
   * up each day's bell schedule from `schoolSchedule.schedule`.
   */
  const getWeekdays = (date: Date, scheduleID: string) => {
    const current = date;

    // Get the current day index (0 = Sunday .. 6 = Saturday). Treat Sunday (0)
    // as 7 so the "days back to Monday" math below works uniformly.
    const dayIndex = current.getDay() === 0 ? 7 : current.getDay();

    // Clone the current date and roll it back to Monday of this week.
    // JS Date automatically rolls back months/years if the subtraction crosses one.
    const monday = new Date(current);
    monday.setDate(current.getDate() - dayIndex + 1);

    // Build exactly 5 entries: Monday through Friday.
    const weekDates: ScheduleItem[] = [];
    for (let i = 0; i < 5; i++) {
      const index = Number(scheduleID[i]);
      const schedule = schoolSchedule.schedule[index];

      const date = new Date(monday);
      date.setDate(monday.getDate() + i);

      weekDates[i] = { date, schedule };
    }
    return weekDates;
  };

  // Ticks once per second to recompute the "current period" / bell-schedule
  // progress bar, and keeps the weekly schedule list in sync with "today".
  // Tied to useFocusEffect so the interval starts when this screen gains
  // focus and is cleared when it loses focus/unmounts, instead of ticking
  // forever in the background.
  useFocusEffect(
    useCallback(() => {
      const timer = setInterval(() => {
        const now = getHawaiiDate();
        const dayOfWeek = now.getDay();
        const currentEventsList = eventsRef.current;

        if (dayOfWeek >= 1 && dayOfWeek <= 5) {
          // `findCalendarEntryForDate` is the single source of truth for
          // "what schedule is today on" — used both to build the weekly list
          // and (below) to decide whether there's a live period to show.
          // Previously this was computed twice per tick (once implicitly via
          // `calculateCurrentPeriod`'s own scheduleID, and again here), which
          // did redundant work and could disagree if the two ever diverged.
          const calendarEntry = findCalendarEntryForDate(now) as CalendarEntry;

          // Only rebuild the weekly list when the day or its scheduleID
          // changes (e.g. once a day, or when an admin swaps in a snow-day
          // schedule mid-day) — not on every single 1s tick.
          const scheduleKey = `${now.toDateString()}-${calendarEntry.scheduleID}`;
          if (scheduleKey !== lastScheduleKeyRef.current) {
            lastScheduleKeyRef.current = scheduleKey;
            setWeekdaySchedule(getWeekdays(now, calendarEntry.scheduleID));
          }
        } else {
          // Use a cloned Date instance so we can advance to the next day without
          // mutating the current Hawaii time used elsewhere in this tick.
          const nextDay = new Date(now);
          if (dayOfWeek == 0) {
            nextDay.setDate(now.getDate() + 1);
          } else if (dayOfWeek == 6) {
            nextDay.setDate(now.getDate() - 1);
          }
          
          const calendarEntry = findCalendarEntryForDate(nextDay) as CalendarEntry;
          
          const scheduleKey = `${now.toDateString()}-${calendarEntry.scheduleID}`;
          if (scheduleKey !== lastScheduleKeyRef.current) {
            lastScheduleKeyRef.current = scheduleKey;
            setWeekdaySchedule(getWeekdays(now, calendarEntry.scheduleID));
          }
        }
        

        // Guard against calling calculateCurrentPeriod before events have
        // loaded (currentEventsList would otherwise be empty, making
        // currentEventsList[0] undefined).
        if (dayOfWeek >= 1 && dayOfWeek <= 5 && currentEventsList.length > 0) {
          const periodData = calculateCurrentPeriod(now, currentEventsList[0], String(selectedSchedule)) as PeriodData;
          setCurrentSchedule(periodData.schedule)
          setCurrentPeriod(periodData.currentPeriod);
          setCurrentPeriodStart(periodData.currentPeriodStart);
          setCurrentPeriodEnd(periodData.currentPeriodEnd);
          setTimeLeft(periodData.timeLeft);
          setLoadingBarFactor(periodData.loadingBarFactor);
        } else {
          // Weekend, or events haven't loaded yet: clear out the "current
          // period" fields instead of leaving Friday's stale values showing.
          setCurrentPeriod('');
          setCurrentPeriodStart('');
          setCurrentPeriodEnd('');
          setTimeLeft('');
          setLoadingBarFactor('0%');
        }

        setAppIsReady(true);
      }, 1000);

      return () => clearInterval(timer);
      // Re-created each time this screen refocuses; `eventsRef` (kept in
      // sync by the effect above) lets the callback read the latest events
      // without needing `events` in this dependency array.
    }, [selectedSchedule])
  );

  const openSheetFor = () => {
    setIsSheetVisible(true);
  };

  if (appIsReady === false || !fontsLoaded) {
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
          Bell Schedule SY26-27
        </Text>
      </View>

      <View className="bg-white w-[100vw] h-[75%] justify-center items-center" style={{ height: (height) }}>
        <ScrollView
          // NOTE: `className="h-96"` here is immediately overridden by the
          // inline `style={{ height: height * 2.5 }}` below — the class has
          // no effect. Left as-is to avoid changing layout, but consider
          // dropping the dead className.
          className="w-[100vw] h-96 bg-white flex-1 flex-col"
          style={{ height: height * 2.5 }}
          bounces={false}
          overScrollMode="never"
          scrollEventThrottle={16}
          decelerationRate="normal"
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
        >
          <View
            className="flex-row flex-wrap justify-center items-start w-[100vw]"
            style={{ height: height * 1.75 }}
          > 
            
            <View className="self-center items-center flex flex-column w-[100vw] h-[80vh] z-10">
              {/* Bell-schedule widget: current period name, time range, and
                  a progress bar showing how far through the period we are.
                  Only renders once currentPeriod has been computed
                  (i.e. on a weekday, after the first interval tick). */}
              {currentPeriod !== '' ? (
                <View className="pt-10 px-5 w-[90%] "> 
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
                        <Text className="font-bold font-barlow-regular text-whs-blue text-sm"><Text className="">{currentSchedule.replace('Schedule', '')}</Text>  |  {currentPeriodStart}-{currentPeriodEnd}</Text>
                        <View>
                          {/* Track (background) */}
                          <View className="w-[100%] bg-whs-gold/50 h-4 rounded-full absolute"></View>
                          {/* Fill — width driven by loadingBarFactor (e.g. "42%") */}
                          <View className=" bg-whs-gold h-4 rounded-full" style={{ width: `${loadingBarFactor || "0%"}` as any }}></View>
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
                <View className="h-[10px] w-full"></View>
              )}

              <Text className="z-20 font-barlow-semibold text-2xl text-whs-blue w-full text-center p-3 !pt-5">
                THIS WEEKS SCHEDULE
              </Text>
              <View className="flex-row flex-wrap justify-center w-full">
                {weekdaySchedule.map((day, index) => {
                  // Convert the Date into locale-formatted day-of-week text.
                  const dayString = day.date.toLocaleString('en-US', { weekday: 'short' });

                  return (
                    <React.Fragment key={index}>
                      <View className="flex flex-row flex-nowrap self-center w-[90%] mx-[5%] p-5 mb-3 bg-whs-blue">
                        <View className="justify-center items-start border-r-2 border-white pr-5">
                          <Text className="text-whs-gold text-center font-source-serif-bold font-black text-3xl">
                            {day.date.getDate()}
                          </Text>
                          <Text className="text-white text-center font-roboto-bold">{dayString}</Text>
                        </View>
                        <View className="flex-1 justify-center items-start pl-5">
                          <Text className="text-white text-sm text-wrap w-[50vw] pb-2 font-semibold font-source-serif-bold">
                            {day.schedule.day}
                          </Text>
                          <Text className="text-white text-center text-xs font-light font-source-serif-regular"> 
                            {day.schedule.timeSchedule
                              .filter((schedule) => schedule.name.includes('Period'))
                              .map((schedule, i) => (
                                <React.Fragment key={i}>
                                  <Text> {schedule.name.replace('Period ', '')}</Text>
                                </React.Fragment>
                              ))}</Text>
                        </View>
                      </View>
                    </React.Fragment>
                  );
                })}
              </View>

              <View className="self-center items-start flex-row h-3/4 z-0 p-[10]">
                <WebView
                  className="relative h-[50%]"
                  ref={webViewRef}
                  source={{ uri: 'https://www.waipahuhigh.org/full%20bell%2025-26%20revised.pdf' }}
                />
              </View>
              
            </View>

            
          </View>
        </ScrollView>
      </View>
    </SafeAreaProvider>
  );
};

export default Bell;