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
import React, { useRef, useState, useEffect } from "react";
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Dimensions,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import type { WebView as WebViewType } from "react-native-webview";
import { WebView } from "react-native-webview";
 
import { SCHOOL_SCHEDULE } from '@/assets/json/schedule';
const { width, height } = Dimensions.get("window");

const Bell = () => {
  const webViewRef = useRef<WebViewType>(null);
  const router = useRouter();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentPeriod, setCurrentPeriod] = useState<String>('');
  const [currentPeriodStart, setCurrentPeriodStart] = useState<String>('')
  const [currentPeriodEnd, setCurrentPeriodEnd] = useState<String>('')
  const [loadingBarFactor, setLoadingBarFactor] = useState<string>('0%')
  const [timeLeft, setTimeLeft] = useState('');
  const [appIsReady, setAppIsReady] = useState(false);

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
      if (activePeriod.start >= 780) {
        setCurrentPeriodStart(minutesToString(activePeriod.start - 720));
      } else {
        setCurrentPeriodStart(minutesToString(activePeriod.start));
      }
      if (activePeriod.end >= 720) {
        if (activePeriod.end >= 780) {
          setCurrentPeriodEnd(minutesToString(activePeriod.end - 720) + "pm")
        } else {
          setCurrentPeriodEnd(minutesToString(activePeriod.end) + "pm")
        }
      } else {
        setCurrentPeriodEnd(minutesToString(activePeriod.end) + "am")
      }
      const minutesRemaining = activePeriod.end - currentMinutes - 1;
      const secondsRemaining = 60 - currentSeconds;

      const displaySeconds = secondsRemaining < 10 ? `0${secondsRemaining}` : secondsRemaining;
      setTimeLeft(`${minutesRemaining}m ${displaySeconds}s`);

      if ((100 * (((activePeriod.end - activePeriod.start) - (minutesRemaining + (secondsRemaining/60))) / (activePeriod.end - activePeriod.start))) >= 5) {
        setLoadingBarFactor((100 * (((activePeriod.end - activePeriod.start) - (minutesRemaining + (secondsRemaining/60))) / (activePeriod.end - activePeriod.start))) + "%")
      } else {
        setLoadingBarFactor('5%')
      }
    } else {
      setCurrentPeriod('School is Out');
      setTimeLeft('');
    }
  };  


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
        >
          <ImageBackground
            source={require("@/assets/images/bg-home.png")}
            className="flex-row flex-wrap justify-center items-start w-[100vw] h-[100vh]"

          >
            <View className="self-center items-center flex flex-column w-[100vw] h-[80vh] z-10 ">
              <View className="flex bg-white p-[20] rounded-[3rem] w-[90%] mt-5  ">
              
                <View className="flex flex-column">
                  <Text className="font-bold font-barlow text-whs-blue text-lg/tight">{currentPeriod}</Text>
                  {timeLeft ? (
                    <View>
                      <Text className="font-light font-barlow-regular text-whs-blue text-base/tight">{currentPeriodStart}-{currentPeriodEnd}</Text>
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

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', justifyContent: 'center', alignItems: 'center' },
  card: { backgroundColor: '#fff', padding: 30, borderRadius: 20, width: '85%', alignItems: 'center', elevation: 3, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10 },
  clock: { fontSize: 18, color: '#666', marginBottom: 20, fontWeight: '600' },
  label: { fontSize: 14, color: '#aaa', textTransform: 'uppercase', letterSpacing: 1, marginTop: 15 },
  periodText: { fontSize: 32, fontWeight: 'bold', color: '#1a1a1a', textAlign: 'center', marginVertical: 5 },
  timerText: { fontSize: 40, fontWeight: 'bold', color: '#ff4757', marginTop: 5 },
});

export default Bell;
