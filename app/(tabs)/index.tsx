import { BarlowSemiCondensed_600SemiBold } from "@expo-google-fonts/barlow-semi-condensed";
import { useFonts } from "@expo-google-fonts/barlow-semi-condensed/useFonts";
import { useRouter } from "expo-router";
import React, { useRef, useState, useEffect } from "react";
import {
    ActivityIndicator,
    Image,
    ImageBackground,
    Dimensions,
    Linking,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
 
import "../globals.css";
import { SCHOOL_SCHEDULE } from '@/assets/json/schedule';

const { width, height } = Dimensions.get("window");

export default function Index() {
  const router = useRouter(); // Get the router instance
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentPeriod, setCurrentPeriod] = useState<String>('');
  const [currentPeriodStart, setCurrentPeriodStart] = useState<String>('')
  const [currentPeriodEnd, setCurrentPeriodEnd] = useState<String>('')
  const [loadingBarFactor, setLoadingBarFactor] = useState<string>('0%')
  const [timeLeft, setTimeLeft] = useState('');
  const [appIsReady, setAppIsReady] = useState(false);


  let [fontsLoaded] = useFonts({
    BarlowSemiCondensed_600SemiBold,
  });

  useEffect(() => {
    // Update timer every single second
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      calculateCurrentPeriod(now);
      setAppIsReady(true)
    }, 1000);

    return () => clearInterval(timer);
  }, []);


  const minutesToString = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const minute = Math.round(((minutes / 60) - hours) * 60);
    const paddedMinute = minute < 10 ? "0" + minute : minute;
    return hours + ":" + paddedMinute;
  };

  const calculateCurrentPeriod = (now: Date): void => {
    const currentMinutes = (now.getHours()) * 60 + (now.getMinutes());
    const currentSeconds = now.getSeconds();
    
    const activePeriod = SCHOOL_SCHEDULE.find(
      (p) => currentMinutes >= p.start && currentMinutes < p.end
    );
    
    if (activePeriod) {
      setCurrentPeriod(activePeriod.name);
      setCurrentPeriodStart(minutesToString(activePeriod.start));
      if (activePeriod.end >= 720) {
        setCurrentPeriodEnd(minutesToString(activePeriod.end) + "pm")
      } else {
        setCurrentPeriodEnd(minutesToString(activePeriod.end) + "am")
      }
      const minutesRemaining = activePeriod.end - currentMinutes - 1;
      const secondsRemaining = 60 - currentSeconds;

      const displaySeconds = secondsRemaining < 10 ? `0${secondsRemaining}` : secondsRemaining;
      setTimeLeft(`${minutesRemaining}m ${displaySeconds}s`);

      setLoadingBarFactor((100 * (((activePeriod.end - activePeriod.start) - minutesRemaining) / (activePeriod.end - activePeriod.start))) + "%")

    } else {
      setCurrentPeriod('');
      setTimeLeft('');
    }
  };  

  if ((appIsReady == false) || !fontsLoaded) {
    return (
      <View className="flex-1 justify-center items-center bg-[#0b0b49]">
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
        <View className="flex-row bg-[#0b0b49] h-[13rem] z-10 pt-44">
            <Image
                source={require("@/assets/images/whs-logo.png")}
                className="w-32 h-32 relative bottom-28 left-11"
            />
            <View className="w-48 h-28 bottom-20 left-14 items-start z-40 relative">
                <Text className="text-white font-barlow-semibold">MY VOICE</Text>
                <Text className="text-white ml-5 font-barlow-semibold"> MY CHOICE</Text>
                <Text className="text-white ml-12 font-barlow-semibold"> MY FUTURE</Text>
            </View>
        </View>
        <View className="bg-white w-[100vw] h-[75%] justify-center items-center ">
          <ScrollView
            className="w-[100vw] h-96 bg-white flex-1 flex-col "
            style={{ height: height * 0.5 }}
          >
            <ImageBackground
              source={require("@/assets/images/bg-home.png")}
              className="flex-row flex-wrap justify-center items-start w-[100vw] h-[100vh]"
            >
              {currentPeriod !== '' ? (
                <View className="bg-white/10 p-[20] w-[100%] "> 
                  <View className="flex flex-column">
                    <Text className="font-bold font-barlow text-whs-blue text-sm/none">{currentPeriod}</Text>
                    {timeLeft ? (
                      <View>
                        <Text className="font-bold font-barlow-regular text-whs-blue text-sm">{currentPeriodStart}-{currentPeriodEnd}</Text>
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
              ) : (
                <View className="h-5 w-10"></View>
              )}
              

              <Text className="z-20 font-barlow-semibold text-2xl text-whs-blue w-full text-center relative bottom-10">
                WELCOME!
              </Text>
              <TouchableOpacity
                className="w-24 h-min mx-3 my-3 justify-center pt-5"
                onPress={() => router.push("/vision")}
              >
                <Image
                  source={require("@/assets/images/school.png")}
                  style={{
                    tintColor: "#0b0b49",
                  }}
                  className="size-14 self-center"
                />
                <Text className="text-center font-barlow-semibold text-[#0b0b49] text-xs">
                  Mission & Vision
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="w-24 h-min mx-3 my-3 justify-center pt-5"
                onPress={() => router.push("/calendar")}
              >
                <Image
                  source={require("@/assets/images/calender.png")}
                  style={{
                    tintColor: "#0b0b49",
                  }}
                  className="size-14 self-center"
                />
                <Text className="text-center font-barlow-semibold text-[#0b0b49] text-xs">
                  Calendar
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="w-24 h-min mx-3 my-3 justify-center pt-5"
                onPress={() => router.push("/news")}
              >
                <Image
                  source={require("@/assets/images/news.png")}
                  style={{
                    tintColor: "#0b0b49",
                  }}
                  className="size-14 self-center"
                />
                <Text className="text-center font-barlow-semibold text-[#0b0b49] text-xs">
                  News
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="w-24 h-min mx-3 my-3 justify-center"
                onPress={() => router.push("/bell")}
              >
                <Image
                  source={require("@/assets/images/bell.png")}
                  style={{
                    tintColor: "#0b0b49",
                  }}
                  className="size-14 self-center"
                />
                <Text className="text-center font-barlow-semibold text-[#0b0b49] text-xs">
                  Bell Schedule
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="w-24 h-min mx-3 my-3 justify-center"
                onPress={() => router.push("/map")}
              >
                <Image
                  source={require("@/assets/images/map-icon.png")}
                  style={{
                    tintColor: "#0b0b49",
                  }}
                  className="size-14 self-center"
                />
                <Text className="text-center font-barlow-semibold text-[#0b0b49] text-xs">
                  Campus Map
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="w-24 h-min mx-3 my-3 justify-center"
                onPress={() => router.push("/contacts")}
              >
                <Image
                  source={require("@/assets/images/phone.png")}
                  style={{
                    tintColor: "#0b0b49",
                  }}
                  className="size-14 self-center"
                />
                <Text className="text-center font-barlow-semibold text-[#0b0b49] text-xs">
                  Contacts
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="w-24 h-min mx-3 my-3 justify-center"
                onPress={() => router.push("/student")}
              >
                <Image
                  source={require("@/assets/images/user.png")}
                  style={{
                    tintColor: "#0b0b49",
                  }}
                  className="size-14 self-center"
                />
                <Text className="text-center font-barlow-semibold text-[#0b0b49] text-xs">
                  Student
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="w-24 h-min mx-3 my-3 justify-center"
                onPress={() => router.push("/registrar")}
              >
                <Image
                  source={require("@/assets/images/registrar.png")}
                  style={{
                    tintColor: "#0b0b49",
                  }}
                  className="size-14 self-center"
                />
                <Text className="text-center font-barlow-semibold text-[#0b0b49] text-xs">
                  Registrar
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="w-24 h-min mx-3 my-3 justify-center"
                onPress={() => {
                  Linking.openURL(
                    "https://hawaii.infinitecampus.org/campus/hawaii.jsp",
                  );
                }}
              >
                <Image
                  source={require("@/assets/images/if.png")}
                  style={{
                    tintColor: "#0b0b49",
                  }}
                  className="size-14 self-center"
                />
                <Text className="text-center font-barlow-semibold text-[#0b0b49] text-xs">
                  Infinite Campus
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="w-24 h-min mx-3 my-3 justify-center"
                onPress={() => router.push("/athletics")}
              >
                <Image
                  source={require("@/assets/images/ball.png")}
                  style={{
                    tintColor: "#0b0b49",
                  }}
                  className="size-14 self-center"
                />
                <Text className="text-center font-barlow-semibold text-[#0b0b49] text-xs">
                  Athletics
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="w-24 h-min mx-3 my-3 justify-center"
                onPress={() => router.push("/cafe")}
              >
                <Image
                  source={require("@/assets/images/cafe.png")}
                  style={{
                    tintColor: "#0b0b49",
                  }}
                  className="size-14 self-center"
                />
                <Text className="text-center font-barlow-semibold text-[#0b0b49] text-xs">
                  Cafeteria
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="w-24 h-min mx-3 my-3 justify-center"
                onPress={() => router.push("/legacy")}
              >
                <Image
                  source={require("@/assets/images/torch.png")}
                  style={{
                    tintColor: "#0b0b49",
                  }}
                  className="size-14 self-center"
                />
                <Text className="text-center font-barlow-semibold text-[#0b0b49] text-xs">
                  LEGACY
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="w-24 h-min mx-3 my-3 justify-center"
                onPress={() => router.push("/author")}
              >
                <Image
                  source={require("@/assets/images/author.png")}
                  style={{
                    tintColor: "#0b0b49",
                  }}
                  className="size-14 self-center"
                />
                <Text className="text-center font-barlow-semibold text-[#0b0b49] text-xs">
                  Authors
                </Text>
              </TouchableOpacity>
              
            </ImageBackground>
          </ScrollView>
        </View>
      </SafeAreaProvider>
    );
  } 
}
