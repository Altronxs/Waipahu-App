import { BarlowSemiCondensed_600SemiBold } from "@expo-google-fonts/barlow-semi-condensed";
import { useFonts } from "@expo-google-fonts/barlow-semi-condensed/useFonts";
import { useRouter } from "expo-router";
import {
    ActivityIndicator,
    Image,
    ImageBackground,
    Linking,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import "../globals.css";

export default function Index() {
  const router = useRouter(); // Get the router instance
  let [fontsLoaded] = useFonts({
    BarlowSemiCondensed_600SemiBold,
  });

  if (!fontsLoaded) {
    return (
      <SafeAreaProvider className="flex-1 justify-center items-center bg-white">
        <SafeAreaView className="flex-row bg-[#0b0b49] h-28 z-30 pt-28 w-full">
          <ActivityIndicator size="large" color="#0b0b49" />
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

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
      <View className="grow justify-center items-center bg-white">
        <ScrollView className="self-center h-[100vh]">
          <ImageBackground
            source={require("@/assets/images/bg-home.png")}
            className="flex-row flex-wrap justify-center items-start w-[100vw] h-[100vh]"
          >
            <Text className="z-20 font-barlow-semibold text-2xl text-whs-blue w-full text-center p-5 pb-0">
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
              onPress={() => router.push("/calender")}
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
