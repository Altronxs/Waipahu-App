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


  type IconItem = {
    label: string;
    image: any;
    onPress: () => void;
  };

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
        { label: "Events & Activities", image: require("@/assets/images/activity.png"), onPress: () => Linking.openURL("https://www.instagram.com/waipahuhigh.stugov/") },
        //{ label: "Academies", image: require("@/assets/images/book.png"), onPress: () => Linking.openURL("https://www.instagram.com/waipahuhigh.stugov/") },
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
        { label: "Infinite Campus", image: require("@/assets/images/if.png"), onPress: () => Linking.openURL("https://hawaii.infinitecampus.org/campus/hawaii.jsp") },
        { label: "Official Website", image: require("@/assets/images/globe.png"), onPress: () => Linking.openURL("https://www.waipahuhigh.org/") },
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
      const dayOfWeek = now.getDay();
      if (dayOfWeek >= 1 && dayOfWeek <= 5) {
        calculateCurrentPeriod(now);
        setCurrentTime(now);
      }
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
      setCurrentPeriod('');
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
  } else {
    return (
      <SafeAreaProvider className="flex-col">
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
          >
            <ImageBackground
              source={require("@/assets/images/bg-home.png")}
              className="flex-row flex-wrap justify-center w-[100vw]"
              style={{ height: height * 1.5}}
            >
              
              {currentPeriod !== '' ? (
                <View className="p-[20] w-[100%] "> 
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
                <View className="h-[30px] w-full"></View>
              )}
              
              <View className="flex flex-row justify-center items-center gap-5 w-full ">
                <Image
                  source={require("@/assets/images/marauder-script.png")} 
                  className="self-center object-contain" 
                  style={{ height: 40, width: 'auto', aspectRatio: 198 / 50 }} 
                >
                </Image>
                <Text className="z-20 font-barlow-semibold text-2xl text-whs-blue text-center  ">
                  WELCOME!
                </Text>
              </View>
              {sections.map((section) => (
                <View key={section.title} className="w-full mt-4 px-4">
                  <Text className="font-barlow-semibold text-whs-blue text-base mb-2 text-center">
                    {section.title}
                  </Text>
                  <View className="flex-row flex-wrap justify-center">
                    {section.items.map((item) => (
                      <TouchableOpacity
                        key={item.label}
                        className="w-1/4 h-min justify-center items-center"
                        onPress={item.onPress}
                      >
                        <Image source={item.image} style={{ tintColor: "#17273d" }} className="size-14 self-center" />
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
