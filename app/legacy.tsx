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
import React, { useRef } from "react";
import {
    ActivityIndicator,
    Dimensions,
    Image,
    ImageBackground,
    Linking,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import type { WebView as WebViewType } from "react-native-webview";
 

const { width, height } = Dimensions.get("window");

const Legacy = () => {
  const webViewRef = useRef<WebViewType>(null);
  const router = useRouter();

  useFocusEffect(
    React.useCallback(() => {
      if (webViewRef.current) {
        webViewRef.current.reload();
      }
    }, []),
  );

  let [fontsLoaded] = useFonts({
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
    <SafeAreaProvider className="flex-col">
      <View className="flex-row bg-[#17273d] h-[13rem] z-10 pt-44">
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
          L.E.G.A.C.Y Resources
        </Text>
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
            <Text className="z-20 font-barlow-semibold text-2xl text-whs-blue w-full text-center p-5 pb-0">
              L.E.G.A.C.Y
            </Text>
            <Text className="z-20 font-source-serif-regular text-sm text-gray-700 w-full text-center p-8 pt-3">
              Welcome to the LEGACY page where students are provided with
              important resources for their respective class
            </Text>
            <TouchableOpacity
              className="w-24 h-min mx-3 my-3 justify-center"
              onPress={() => {
                Linking.openURL(
                  "https://www.instagram.com/waipahuhighmarauders/",
                );
              }}
            >
              <Image
                source={{ uri: 'https://instagram.fhnl3-1.fna.fbcdn.net/v/t51.82787-19/651150899_18566645851026601_3394037472475620577_n.jpg?stp=dst-jpg_s150x150_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLmRqYW5nby41NjIuYzIifQ&_nc_ht=instagram.fhnl3-1.fna.fbcdn.net&_nc_cat=101&_nc_oc=Q6cZ2gGHe5tXiKMaZpO97HHaCO2mVroM5TZ29RIBOlVqntUN8SsbdXTs8Sz74uOJf-CS5as&_nc_ohc=Xj7_1NDBqUkQ7kNvwFEjudc&_nc_gid=Zk9cdfqFuwWMZHBjuruATw&edm=AP4sbd4BAAAA&ccb=7-5&oh=00_AQB1hu7dmrzsW1KIGeOHusqyo8UqoBXKT0SiW3QbHrVllA&oe=6A6C588A&_nc_sid=7a9f4b'}}
                className="size-14 self-center rounded-full"
              />
              <Text className="text-center font-barlow-semibold text-[#17273d] text-xs">
                Waipahu High School
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="w-24 h-min mx-3 my-3 justify-center"
              onPress={() => {
                Linking.openURL(
                  "https://www.instagram.com/legacy.808/",
                );
              }}
            >
              <Image
                source={{ uri: 'https://instagram.fhnl3-1.fna.fbcdn.net/v/t51.2885-19/20346830_1974403226176167_450762907978825728_a.jpg?stp=dst-jpg_s150x150_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLmRqYW5nby4xMDgwLmV4cGVyaW1lbnRhbCJ9&_nc_ht=instagram.fhnl3-1.fna.fbcdn.net&_nc_cat=103&_nc_oc=Q6cZ2gHGRCmErDfITsGEhGm5rtOiQwiXGt6FriFKw3zTqWthuVv9mr6RArEwjpaGf3LotUY&_nc_ohc=71TAhg7iWdoQ7kNvwGW96OU&_nc_gid=1nC-G9Ta8P1KmlvQzKaMow&edm=AP4sbd4BAAAA&ccb=7-5&oh=00_AQDoXan4mz33FoVzseDFV771oOeheQuCdCGOO-hf1G-QNA&oe=6A6C4F23&_nc_sid=7a9f4b'}}
                className="size-14 self-center rounded-full"
              />
              <Text className="text-center font-barlow-semibold text-[#17273d] text-xs">
                legacy.808
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="w-24 h-min mx-3 my-3 justify-center"
              onPress={() => {
                Linking.openURL(
                  "https://www.instagram.com/waipahuhigh.stugov/",
                );
              }}
            >
              <Image
                source={{ uri: 'https://instagram.fhnl3-2.fna.fbcdn.net/v/t51.2885-19/330801182_207085698487804_8172898972968818707_n.jpg?stp=dst-jpg_s150x150_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLmRqYW5nby40MTYuYzIifQ&_nc_ht=instagram.fhnl3-2.fna.fbcdn.net&_nc_cat=104&_nc_oc=Q6cZ2gFlcR-QCS_cOdsw_gJnVJlfDM5AcPhS31UYOF5ohMv8kyVx7xE0D1iznViw_CZMdXE&_nc_ohc=5VB2eVzWRoAQ7kNvwEAEhW0&_nc_gid=QCuq-mgswF4ojk1W4EBkTw&edm=AP4sbd4BAAAA&ccb=7-5&oh=00_AQCGghjtb_BkOs2a-Wc3ahuBVvFfv1ULazSWsWR9mTwz5w&oe=6A6C44EE&_nc_sid=7a9f4b'}}
                className="size-14 self-center rounded-full"
              />
              <Text className="text-center font-barlow-semibold text-[#17273d] text-xs">
                WHS Student Government
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="w-24 h-min mx-3 my-3 justify-center"
              onPress={() => {
                Linking.openURL(
                  "https://www.instagram.com/legendaryleviathans/",
                );
              }}
            >
              <Image
                source={{ uri: 'https://scontent.cdninstagram.com/v/t51.82787-19/721377449_18127622212556631_5429922796695097582_n.jpg?stp=dst-jpg_s150x150_tt6&_nc_cat=109&ccb=7-5&_nc_sid=f7ccc5&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLnd3dy4xMDgwLkMzIn0%3D&_nc_ohc=tS0xUd0v1SEQ7kNvwGEHty2&_nc_oc=AdrwH-AKtCAua-968ylSJxQbaBXUNYGaFYBYQWzdISEzHGnspeq4SZzXNMta80-xng8&_nc_zt=24&_nc_ht=scontent.cdninstagram.com&_nc_gid=lJOR8MKXeUXcUOC-tl68FQ&_nc_ss=7b6a8&oh=00_AQB1BJRG1LsJ1TI5EUAM55wK9Ar0ywUhW8YLr23Yes6wPg&oe=6A6C49FC'}}
                className="size-14 self-center rounded-full"
              />
              <Text className="text-center font-barlow-semibold text-[#17273d] text-xs">
                Legendary Leviathans '30
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="w-24 h-min mx-3 my-3 justify-center"
              onPress={() => {
                Linking.openURL("https://www.instagram.com/div2ne_crus9ders/",);
              }}
            >
              <Image
                source={{ uri: 
                    'https://scontent.cdninstagram.com/v/t51.82787-19/724133816_18105695974858323_8650144346831112300_n.jpg?stp=dst-jpg_s150x150_tt6&_nc_cat=109&ccb=7-5&_nc_sid=f7ccc5&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLnd3dy4xMDgwLkMzIn0%3D&_nc_ohc=j36hPj1Nu1IQ7kNvwF0dhaL&_nc_oc=AdqTMuCx5jujCLP9NandIfrP9dLhUJMMUs-JF61IUFwiNz5cUBdiRvD0oVFA-qij9OA&_nc_zt=24&_nc_ht=scontent.cdninstagram.com&_nc_gid=zKvEJ92IZZB_Kj7EMzcO6g&_nc_ss=7b6a8&oh=00_AQBnDQqP78-NVLpNZ8qVJNpS0KlHZJvI59pNiU0PchVNrg&oe=6A6C6AFB'
                
                }}
                className="size-14 self-center rounded-full"
              />
              <Text className="text-center font-barlow-semibold text-[#17273d] text-xs">
                Divine Crusaders '29
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="w-24 h-min mx-3 my-3 justify-center"
              onPress={() => {
                Linking.openURL("https://www.instagram.com/vali2nt.vip8rs/",);
              }}
            >
              <Image
                source={{ uri: 
                    'https://instagram.fhnl3-2.fna.fbcdn.net/v/t51.82787-19/729522626_17945962755239464_5137392392051577241_n.jpg?stp=dst-jpg_s150x150_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLmRqYW5nby4xMDgwLmMyIn0&_nc_ht=instagram.fhnl3-2.fna.fbcdn.net&_nc_cat=104&_nc_oc=Q6cZ2gEDN4LZ4kwGPlBr6mFZOK5vr2iHQAu8Mk3pEtljSeXx3724ot_R4Pf4Ig6fjepSGbY&_nc_ohc=YOHzTEQSCtQQ7kNvwExaJRt&_nc_gid=FcgOGgtY6Kfb4rlorvHhwg&edm=AP4sbd4BAAAA&ccb=7-5&oh=00_AQCK6mh1LW_8lPO8tkV7A4342eGorsB0fN5BfVI8bfpKyg&oe=6A6C5179&_nc_sid=7a9f4b'
                }}
                className="size-14 self-center rounded-full"
              />
              <Text className="text-center font-barlow-semibold text-[#17273d] text-xs">
                Valient Vipers  '28
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="w-24 h-min mx-3 my-3 justify-center"
              onPress={() => {
                Linking.openURL("https://www.instagram.com/moonlightsoldiers27/",);
              }}
            >
              <Image
                source={{ uri: 
                    'https://instagram.fhnl3-1.fna.fbcdn.net/v/t51.2885-19/448457729_746709044065166_5396085396133412082_n.jpg?stp=dst-jpg_s150x150_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLmRqYW5nby44MDQuYzIifQ&_nc_ht=instagram.fhnl3-1.fna.fbcdn.net&_nc_cat=102&_nc_oc=Q6cZ2gHMcSC7mhMM9YdBPiMHlXjfNYN6jHc7mWVSYGTleuwPKbMRd_gm8qOHPudAM6re-S0&_nc_ohc=BwnfmYw_vw8Q7kNvwEOxnI-&_nc_gid=WoCfI68QfgP_nII6nl5URA&edm=APoiHPcBAAAA&ccb=7-5&oh=00_AQARryt1kt8HcwgSiuW-vsaTw5clK6RFd5AJ02vWb58mCg&oe=6A6C5079&_nc_sid=22de04'
                }}
                className="size-14 self-center rounded-full"
              />
              <Text className="text-center font-barlow-semibold text-[#17273d] text-xs">
                Moonlight Soldiers '27
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="w-24 h-min mx-3 my-3 justify-center"
              onPress={() => {
                Linking.openURL("https://www.instagram.com/immortal.lions26/",);
              }}
            >
              <Image
                source={{ uri: 
                    'https://instagram.fhnl3-1.fna.fbcdn.net/v/t51.2885-19/451087557_1741346926399789_4734095321480639237_n.jpg?stp=dst-jpg_s150x150_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLmRqYW5nby4xMDgwLmMyIn0&_nc_ht=instagram.fhnl3-1.fna.fbcdn.net&_nc_cat=101&_nc_oc=Q6cZ2gFBYx7Y_dfVqSiisaQlvQqv_mBF2-H7RLzn5PfrwRIxQNKPg6Lzlubtug0alivn_JA&_nc_ohc=E3NZGjPypSsQ7kNvwErmuTT&_nc_gid=lS9IJlp0SRzuvDfejz5mUw&edm=AP4sbd4BAAAA&ccb=7-5&oh=00_AQB66S_o2JHAePHyjU2f_XWzYsJNljDKQBpFZbnPxx_lwA&oe=6A6C51A7&_nc_sid=7a9f4b'
                }}
                className="size-14 self-center rounded-full"
              />
              <Text className="text-center font-barlow-semibold text-[#17273d] text-xs">
                Immortal Lions '26
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="w-24 h-min mx-3 my-3 justify-center"
              onPress={() => {
                Linking.openURL("https://www.instagram.com/mk25_decisions/",);
              }}
            >
              <Image
                source={{ uri: 
                    'https://instagram.fhnl3-1.fna.fbcdn.net/v/t51.2885-19/448727986_836926535027413_6191499269463844900_n.jpg?stp=dst-jpg_s150x150_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLmRqYW5nby4xMDgwLmMyIn0&_nc_ht=instagram.fhnl3-1.fna.fbcdn.net&_nc_cat=101&_nc_oc=Q6cZ2gFCj8zt2VRv3kcvkrGuUSopBePDBGt9Z5jiHA-NXO3oxDDMUEhfWwtz498f-Ktj8Kk&_nc_ohc=rtywheNkyq8Q7kNvwE6QpUw&_nc_gid=mE4qPG59RfV_WjC7y0BRpQ&edm=APoiHPcBAAAA&ccb=7-5&oh=00_AQDTN005twPJ_DPWTQsdHXyvkI1FQJOgwJ4pqx9yBIaeDg&oe=6A6C791B&_nc_sid=22de04'
                }}
                className="size-14 self-center rounded-full"
              />
              <Text className="text-center font-barlow-semibold text-[#17273d] text-xs">
                Mystic Knights '25
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="w-24 h-min mx-3 my-3 justify-center"
              onPress={() => {
                Linking.openURL("https://www.instagram.com/m2n4cing.thunderbirds/",);
              }}
            >
              <Image
                source={{ uri: 
                    'https://instagram.fhnl3-1.fna.fbcdn.net/v/t51.2885-19/267593302_538795773881983_264516310421338772_n.jpg?stp=dst-jpg_s150x150_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLmRqYW5nby4xMDgwLmMyIn0&_nc_ht=instagram.fhnl3-1.fna.fbcdn.net&_nc_cat=107&_nc_oc=Q6cZ2gEJYcxgeqAIMZW3Lj7cMEpTazncWI90UCcrO9HX_HJPi1Lo-THri6VAAdKcmGfLff0&_nc_ohc=j9JrFqwaWvcQ7kNvwHCih8e&_nc_gid=68lR96BQKXwb7BbjMkamWw&edm=AP4sbd4BAAAA&ccb=7-5&oh=00_AQAASxNX45sOU4oh2Pd3wENQkRWd546tJeq5vVD1N2XTlQ&oe=6A6C6243&_nc_sid=7a9f4b'
                }}
                className="size-14 self-center rounded-full"
              />
              <Text className="text-center font-barlow-semibold text-[#17273d] text-xs">
                Menacing Thunderbirds '24
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="w-24 h-min mx-3 my-3 justify-center"
              onPress={() => {
                Linking.openURL("https://www.instagram.com/midnightwarriors23/",);
              }}
            >
              <Image
                source={{ uri: 
                    'https://instagram.fhnl3-2.fna.fbcdn.net/v/t51.2885-19/102266007_539349453406740_2399402334816829440_n.jpg?stp=dst-jpg_s150x150_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLmRqYW5nby4xMDgwLmMyIn0&_nc_ht=instagram.fhnl3-2.fna.fbcdn.net&_nc_cat=100&_nc_oc=Q6cZ2gHSG7_gH10piEVIXloutEsUPtU51xR5xrwntnFZdT1VUSzqjOrfDc-H9SijmvUw62Y&_nc_ohc=OnVQvhqSJ4IQ7kNvwGR07wm&_nc_gid=M8osRJNpA2QJVfjtFq3K9g&edm=AP4sbd4BAAAA&ccb=7-5&oh=00_AQAlHuiPSorsZN6eJBDcP5bSWTPOtkgR5nDTqKSoFLlYjw&oe=6A6C51DA&_nc_sid=7a9f4b'
                }}
                className="size-14 self-center rounded-full"
              />
              <Text className="text-center font-barlow-semibold text-[#17273d] text-xs">
                Midnight Warriors '23
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="w-24 h-min mx-3 my-3 justify-center"
              onPress={() => {
                Linking.openURL("https://www.instagram.com/fearlesshuskies",);
              }}
            >
              <Image
                source={{ uri: 
                    'https://instagram.fhnl3-1.fna.fbcdn.net/v/t51.2885-19/67086580_703096833451723_4873222223646687232_n.jpg?stp=dst-jpg_s150x150_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLmRqYW5nby42NDYuYzIifQ&_nc_ht=instagram.fhnl3-1.fna.fbcdn.net&_nc_cat=107&_nc_oc=Q6cZ2gF0BOj_bD192jPItIE9A9UyHZHRQeOn06fS2O_21vS-vYTf8GO3O4RvjJyDwhTt1po&_nc_ohc=07dtzZlE3WkQ7kNvwHOhmS7&_nc_gid=0Ssmjf8xw7qxXB_KtMqfaA&edm=AP4sbd4BAAAA&ccb=7-5&oh=00_AQAVM82Kg5YtTn4X9VVptMG-R4vQCVKBoR7t9_cnj9bn6g&oe=6A6C4ACF&_nc_sid=7a9f4b'
                }}
                className="size-14 self-center rounded-full"
              />
              <Text className="text-center font-barlow-semibold text-[#17273d] text-xs">
                Fearless Huskies '22
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="w-24 h-min mx-3 my-3 justify-center"
              onPress={() => {
                Linking.openURL("https://www.instagram.com/fearlesshuskies",);
              }}
            >
              <Image
                source={{ uri: 
                    'https://instagram.fhnl3-2.fna.fbcdn.net/v/t51.2885-19/61798693_2037912259668820_673022204211888128_n.jpg?stp=dst-jpg_s150x150_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLmRqYW5nby44MjMuYzIifQ&_nc_ht=instagram.fhnl3-2.fna.fbcdn.net&_nc_cat=104&_nc_oc=Q6cZ2gFEQjSuArQ4kuajpm-wX1GEWMvaF9eQVUCANGpDthlP_Npfq-cH1zwSBWsY9bEskc0&_nc_ohc=SzPAYnKlsw8Q7kNvwEnofL8&_nc_gid=ntsp0M9WKbrT5AvkJG3Zgg&edm=AP4sbd4BAAAA&ccb=7-5&oh=00_AQB-WClupOBv8bBMmtvLbKW8HpLjyrSbv8vQdomH7EY0RQ&oe=6A6C7A9E&_nc_sid=7a9f4b'
                }}
                className="size-14 self-center rounded-full"
              />
              <Text className="text-center font-barlow-semibold text-[#17273d] text-xs">
                Royal Rebels '21
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="w-24 h-min mx-3 my-3 justify-center"
              onPress={() => {
                Linking.openURL("https://www.instagram.com/luminouswolvess",);
              }}
            >
              <Image
                source={{ uri: 
                    'https://instagram.fhnl3-2.fna.fbcdn.net/v/t51.2885-19/65629502_387032195254424_3782364796058337280_n.jpg?stp=dst-jpg_s150x150_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLmRqYW5nby4xMDgwLmMyIn0&_nc_ht=instagram.fhnl3-2.fna.fbcdn.net&_nc_cat=108&_nc_oc=Q6cZ2gGWKysLDZ7imUFNr3SY9NAXmOHZlkOcIXr2SV_EvX8pGl8cJGbtg_IuBD1ai2xCsGU&_nc_ohc=etHd6UrZoUQQ7kNvwF5tzir&_nc_gid=Js6t-uWeK_VkqM3Hd80DGA&edm=AP4sbd4BAAAA&ccb=7-5&oh=00_AQAkRdpmq0Mw_QzLJCfaB54RMq6XogRxr7POynopU9R1LQ&oe=6A6C6081&_nc_sid=7a9f4b'
                }}
                className="size-14 self-center rounded-full"
              />
              <Text className="text-center font-barlow-semibold text-[#17273d] text-xs">
                Luminous Wolves '20
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="w-24 h-min mx-3 my-3 justify-center"
              onPress={() => {
                Linking.openURL("https://www.instagram.com/ambitiousarchers/",);
              }}
            >
              <Image
                source={{ uri: 
                    'https://instagram.fhnl3-1.fna.fbcdn.net/v/t51.2885-19/11378231_1458857461085069_1513291187_a.jpg?stp=dst-jpg_s150x150_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLmRqYW5nby44ODkuYzIifQ&_nc_ht=instagram.fhnl3-1.fna.fbcdn.net&_nc_cat=105&_nc_oc=Q6cZ2gG7RL0LpW8etozA5-OR6kfqEPEO2_FAquOV3whWbSRIO5bTmOd6qzQnacyqyqZm6fw&_nc_ohc=XwwROvKqtQkQ7kNvwHzN4f9&_nc_gid=DpqRDePzWwDqmHgcmujAiw&edm=APoiHPcBAAAA&ccb=7-5&oh=00_AQDRJ_qs5S51sSqewDUgo5DAbUyOXAUxkeSA9p_xL-j3bw&oe=6A6C6FEA&_nc_sid=22de04'
                }}
                className="size-14 self-center rounded-full"
              />
              <Text className="text-center font-barlow-semibold text-[#17273d] text-xs">
                Ambitious Archers '19
              </Text>
            </TouchableOpacity>
          </ImageBackground>
        </ScrollView>
      </View>
    </SafeAreaProvider>
  );
};

export default Legacy;
