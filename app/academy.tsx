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
import { Button } from "expo-router/build/react-navigation";
import React, { useState, useCallback, useEffect } from "react";
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
  Linking,
  ScrollView,
  ImageBackground,
  RefreshControl,
  useWindowDimensions,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";


const openLink = (url: string) => {
  Linking.openURL(url).catch((error) => {
    console.error("Failed to open URL:", error);
  });
};
const Academy = () => {
  const { height } = useWindowDimensions();
  const router = useRouter();



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

      <View className="justify-center items-center bg-whs-gold">
        <TouchableOpacity
            className="w-10 h-10 left self-start pt-3 z-30"
            onPress={() => router.push("/")}
            accessibilityRole="button"
            accessibilityLabel="Go back"
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
            Academies of Waipahu High School
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
          <View 
            className="flex flex-row justify-center items-center pt-3 pb-20 flex-wrap w-full gap-2"
            //style={{ height: height * 10}}  
          >
            
            <Text className="z-20 font-barlow-semibold text-3xl/none text-whs-blue w-full text-center !pt-5">
              ACADEMIES OF
            </Text>
            <Text className="z-20 font-barlow-semibold text-3xl/none text-whs-blue w-[90%] text-center pb-5 border-b-2 border-black/10">
              WAIPAHU HIGH SCHOOL
            </Text>
            
            <ImageBackground
              source={require("@/assets/images/ql-bg1.png")}
              className="w-[45%] self-center overflow-hidden mt-6 aspect-[549/766] mx-1"
            >
              <TouchableOpacity className="absolute w-full h-full" onPress={() => openLink("https://www.waipahuhigh.org/apps/pages/index.jsp?uREC_ID=555316&type=d")}></TouchableOpacity>
            </ImageBackground>
            <ImageBackground
              source={require("@/assets/images/ql-bg2.png")}
              className="w-[45%] self-center overflow-hidden mt-6 aspect-[549/766] mx-1 translate-y-5"
            >
              <TouchableOpacity className="absolute w-full h-full" onPress={() => openLink("https://www.waipahuhigh.org/apps/pages/index.jsp?uREC_ID=555305&type=d")}></TouchableOpacity>
            </ImageBackground>
            <ImageBackground
              source={require("@/assets/images/ql-bg3.png")}
              className="w-[45%] self-center overflow-hidden mt-6 aspect-[549/766] mx-1"
            >
              <TouchableOpacity className="absolute w-full h-full" onPress={() => openLink("https://www.waipahuhigh.org/apps/pages/index.jsp?uREC_ID=555317&type=d")}></TouchableOpacity>
            </ImageBackground>
            <ImageBackground
              source={require("@/assets/images/ql-bg4.png")}
              className="w-[45%] self-center overflow-hidden mt-6 aspect-[549/766] mx-1 translate-y-5"
            >
              <TouchableOpacity className="absolute w-full h-full" onPress={() => openLink("https://www.waipahuhigh.org/apps/pages/index.jsp?uREC_ID=555312&type=d")}></TouchableOpacity>
            </ImageBackground>
            <ImageBackground
              source={require("@/assets/images/ql-bg5.png")}
              className="w-[45%] self-center overflow-hidden mt-6 aspect-[549/766] mx-1"
            >
              <TouchableOpacity className="absolute w-full h-full" onPress={() => openLink("https://www.waipahuhigh.org/apps/pages/index.jsp?uREC_ID=555318&type=d")}></TouchableOpacity>
            </ImageBackground>
            <ImageBackground
              source={require("@/assets/images/ql-bg6.png")}
              className="w-[45%] self-center overflow-hidden mt-6 aspect-[549/766] mx-1 translate-y-5"
            >
              <TouchableOpacity className="absolute w-full h-full" onPress={() => openLink("https://www.waipahuhigh.org/apps/pages/index.jsp?uREC_ID=555345&type=d")}></TouchableOpacity>
            </ImageBackground>
            <Text className="z-20 font-source-serif-bold text-whs-blue text-base ml-9 mr-9 pt-5 self-start text-start">
              What is an Academy?
            </Text>
            <Text className="z-20 font-source-serif-regular text-whs-blue text-sm pl-9 pr-9 text-center">
              An academy is a thematic course of study that each student can pick as a freshman. Each academy offers courses specific to their theme, allowing students to have a more meaningful education that is fixed on their interests.
            </Text>
            <View className="w-[90%] justify-center pt-10 mt-20 border-t-2 border-black/10">
              <Image
                className="h-[100px] self-center overflow-hidden aspect-square object-center"
                source={require('@/assets/images/ql-link-logo1.png')}
              ></Image>
              <Text className="z-20 font-source-serif-bold text-whs-blue text-3xl/tight text-center pl-8 pr-8 self-center pt-5">
                Academy of Arts & Communication
              </Text>
              <Text className="z-20 font-source-serif-bold text-whs-blue text-base text-center pl-8 pr-8 self-center">
                2020 & 2025 NCAC Model Academy
              </Text>
              <Text className="z-20 font-source-serif-bold text-whs-blue text-base text-center ml-9 mr-9 pt-3 mt-3 border-t-2 border-whs-blue/20">
                <Text className="text-[#d74100]">E</Text>ngage. <Text className="text-[#d74100]">E</Text>xploration. <Text className="text-[#d74100]">E</Text>xperiences. Self-<Text className="text-[#d74100]">E</Text>xpression
              </Text>
              <Text className="z-20 font-source-serif-bold text-whs-blue text-base ml-9 mr-9 pt-3">
                Our Vision
              </Text>
              <Text className="z-20 font-source-serif-regular text-whs-blue text-sm pl-9 pr-9">
                The 21st Century Academy of Arts & Communication will prepare all students to be college/career ready and to transform challenges into opportunities through creative, innovative solutions.
              </Text>
              <Text className="z-20 font-source-serif-bold text-whs-blue text-base ml-9 mr-9 pt-5">
                Our Mission
              </Text>
              <Text className="z-20 font-source-serif-regular text-whs-blue text-sm pl-9 pr-9">
                The 21st Century Academy of Arts & Communication will prepare all students to be college/career ready and to transform challenges into opportunities through creative, innovative solutions.
              </Text>
              <Text className="z-20 font-source-serif-bold text-whs-blue text-base ml-9 mr-9 pt-5">
                Pathways
              </Text>
              <Text className="z-20 font-source-serif-regular text-whs-blue text-sm pl-9 pr-9">
                Digital Design{'\n'}Fashion & Artisan Design{'\n'}Film & Production
              </Text>
              <Text className="z-20 font-source-serif-bold text-whs-blue text-base ml-9 mr-9 pt-5">
                Electives
              </Text>
              <Text className="z-20 font-source-serif-regular text-whs-blue text-sm pl-9 pr-9">
                Band, Choir, Ceramics, Creative, Dance, AP Drawing & Painting, Photography, Yearbook
              </Text>
            </View>
            <View className="w-[90%] justify-center pt-10 mt-10 border-t-2 border-black/10">
              <Image
                className="h-[100px] self-center overflow-hidden aspect-square object-center"
                source={require('@/assets/images/ql-link-logo2.png')}
              ></Image>
              <Text className="z-20 font-source-serif-bold text-whs-blue text-3xl/tight text-center pl-8 pr-8 self-center pt-5">
                Academy of Health & Sciences
              </Text>
              <Text className="z-20 font-source-serif-bold text-whs-blue text-base text-center pl-8 pr-8 self-center">
                2019 & 2023 NCAC Model Academy With Distinction
              </Text>
              <Text className="z-20 font-source-serif-bold text-whs-blue text-base text-center ml-9 mr-9 pt-3 mt-3 border-t-2 border-whs-blue/20">
                <Text className="text-[#ee0000]">A</Text>dvocate. <Text className="text-[#ee0000]">C</Text>oncentrate. <Text className="text-[#ee0000]">E</Text>levate.
              </Text>
              <Text className="z-20 font-source-serif-bold text-whs-blue text-base ml-9 mr-9 pt-3">
                Our Vision
              </Text>
              <Text className="z-20 font-source-serif-regular text-whs-blue text-sm pl-9 pr-9">
                Academy of Health & Sciences students are equipped with the skills, values, and behaviors that develop them into thoughtful,   responsible, and confident community members who are prepared to excel in  both their post secondary education and careers. Students are motivated to meet the health care needs of the community while fostering partnerships with medical centers, educational institutions, and businesses.
              </Text>
              <Text className="z-20 font-source-serif-bold text-whs-blue text-base ml-9 mr-9 pt-5">
                Our Mission
              </Text>
              <Text className="z-20 font-source-serif-regular text-whs-blue text-sm pl-9 pr-9">
                The mission of the Academy of Health & Sciences is to create a nurturing environment that encourages high expectations for success through relevant and rigorous interdisciplinary learning experiences as it prepares all students for college and career success.
              </Text>
              <Text className="z-20 font-source-serif-bold text-whs-blue text-base ml-9 mr-9 pt-5">
                Pathways
              </Text>
              <Text className="z-20 font-source-serif-regular text-whs-blue text-sm pl-9 pr-9">
                Diagnostic Services & Medical Biotechnology{'\n'}Human Performance & Kinesiology{'\n'}Nursing Services
              </Text>
            </View>
            <View className="w-[90%] justify-center pt-10 mt-10 border-t-2 border-black/10">
              <Image
                className="h-[100px] self-center overflow-hidden aspect-square object-center"
                source={require('@/assets/images/ql-link-logo3.png')}
              ></Image>
              <Text className="z-20 font-source-serif-bold text-whs-blue text-3xl/tight text-center  self-center pt-5">
                Academy of Industrial & Engineering Technology
              </Text>
              <Text className="z-20 font-source-serif-bold text-whs-blue text-base text-center pl-8 pr-8 self-center">
                2024 NCAC Model Academy With Distinction
              </Text>
              <Text className="z-20 font-source-serif-bold text-whs-blue text-base text-center ml-9 mr-9 pt-3 mt-3 border-t-2 border-whs-blue/20">
                <Text className="text-whs-gold">I</Text>NSPIRE. <Text className="text-whs-gold">E</Text>MPOWER. <Text className="text-whs-gold">T</Text>HRIVE.
              </Text>
              <Text className="z-20 font-source-serif-bold text-whs-blue text-base ml-9 mr-9 pt-3">
                Our Vision
              </Text>
              <Text className="z-20 font-source-serif-regular text-whs-blue text-sm pl-9 pr-9">
                The Academy of Industrial & Engineering Technology's vision is to provide student-centered educational programs that challenge all students to perform at their highest potential.
              </Text>
              <Text className="z-20 font-source-serif-bold text-whs-blue text-base ml-9 mr-9 pt-5">
                Our Mission
              </Text>
              <Text className="z-20 font-source-serif-regular text-whs-blue text-sm pl-9 pr-9">
                The Academy of Industrial & Engineering Technology's mission is to Inspire & Empower all to Thrive in college, career, and life.
              </Text>
              <Text className="z-20 font-source-serif-bold text-whs-blue text-base ml-9 mr-9 pt-5">
                Our Goals
              </Text>
              <Text className="z-20 font-source-serif-regular text-whs-blue text-sm pl-9 pr-9">
                1. Students will complete a minimum of one IET program of study.{'\n'}
                2. Students will complete college/career continuum experiences by graduation.{'\n'}
                3. Students will receive a minimum of two industry valued certifications by graduation.{'\n'}
                4. Students will complete a professional portfolio by graduation.{'\n'}
              </Text>
              <Text className="z-20 font-source-serif-bold text-whs-blue text-base ml-9 mr-9">
                Pathways
              </Text>
              <Text className="z-20 font-source-serif-regular text-whs-blue text-sm pl-9 pr-9">
                Architectural Design{'\n'}Automation & Robotics Technology{'\n'}Automotive Maintenance & Light Repair{'\n'}Cybersecurity{'\n'}Engineering{'\n'}Residential & Commercial Construction{'\n'}Welding
              </Text>
            </View>
            <View className="w-[90%] justify-center pt-10 mt-10 border-t-2 border-black/10">
              <Image
                className="h-[100px] self-center overflow-hidden aspect-square object-center"
                source={require('@/assets/images/ql-link-logo4.png')}
              ></Image>
              <Text className="z-20 font-source-serif-bold text-whs-blue text-3xl/tight text-center  self-center pt-5">
                Academy of Natural Resources
              </Text>
              <Text className="z-20 font-source-serif-bold text-whs-blue text-base text-center pl-8 pr-8 self-center">
                2023 NCAC Model Academy With Distinction
              </Text>
              <Text className="z-20 font-source-serif-bold text-whs-blue text-base text-center ml-9 mr-9 pt-3 mt-3 border-t-2 border-whs-blue/20">
                Mālama 'Āina. Conservation. Sustainability.
              </Text>

              <Text className="z-20 font-source-serif-bold text-whs-blue text-base ml-9 mr-9 pt-5">
                Our Mission
              </Text>
              <Text className="z-20 font-source-serif-regular text-whs-blue text-sm pl-9 pr-9">
                The Academy of Natural Resources prepares all students to become environmentally conscious practitioners of aloha 'āina* who contribute personally and professionally to a sustainable world.
              </Text>
              <Text className="z-20 font-source-serif-bold text-whs-blue text-base ml-9 mr-9 pt-5">
                Our Goals
              </Text>
              <Text className="z-20 font-source-serif-regular text-whs-blue text-sm pl-9 pr-9">
                <Text className="font-source-serif-bold">Goal 1:</Text> 75% of students will complete a minimum of one Natural Resources Pathway course, per year enrolled, with a grade of C or higher for Natural Resources Pathway courses.{'\n'}
                <Text className="font-source-serif-bold">Goal 2:</Text> Natural Resources students will develop knowledge about careers and work related opportunities in Hawaii where they may best utilize their talents and aptitudes. 75% of students will complete a minimum of 25 hours per year of work-based/practical learning experience (as listed on the College and Career Continuum), on and off campus, by graduation.{'\n'}
                <Text className="font-source-serif-bold">Goal 3:</Text> 85% of the Academy of Natural Resources seniors will be accepted into post-secondary education, military, college, technical school, Natural Resources work-based internships, paid or unpaid training programs and/or a combination of these options.{'\n'}
              </Text>
              <Text className="z-20 font-source-serif-bold text-whs-blue text-base ml-9 mr-9">
                Pathways
              </Text>
              <Text className="z-20 font-source-serif-regular text-whs-blue text-sm pl-9 pr-9">
                Food Systems{'\n'}Natural Resources Business{'\n'}Natural Resources Management
              </Text>
            </View>
            <View className="w-[90%] justify-center pt-10 mt-10 border-t-2 border-black/10">
              <Image
                className="h-[100px] self-center overflow-hidden aspect-square object-center"
                source={require('@/assets/images/ql-link-logo5.png')}
              ></Image>
              <Text className="z-20 font-source-serif-bold text-whs-blue text-3xl/tight text-center  self-center pt-5">
                Ohana of Excellence Academy
              </Text>
              <Text className="z-20 font-source-serif-bold text-whs-blue text-base text-center pl-8 pr-8 self-center">
                2025 NCAC Model Academy With Distinction
              </Text>
              <Text className="z-20 font-source-serif-bold text-whs-blue text-base ml-9 mr-9 pt-3 mt-3 border-t-2 border-whs-blue/20">
                Our Vision
              </Text>
              <Text className="z-20 font-source-serif-regular text-whs-blue text-sm pl-9 pr-9">
                Ohana of Excellence Academy graduates: Owning futures. Empowering voices. Active community members.
              </Text>
              <Text className="z-20 font-source-serif-bold text-whs-blue text-base ml-9 mr-9 pt-5">
                Our Mission
              </Text>
              <Text className="z-20 font-source-serif-regular text-whs-blue text-sm pl-9 pr-9">
                Ohana of Excellence Academy, in partnership with all stakeholders, provides innovative hands-on learning opportunities for all students to cultivate independence and self-advocacy. 
              </Text>
            </View>
            <View className="w-[90%] justify-center pt-10 mt-10 border-t-2 border-black/10">
              <Image
                className="h-[100px] self-center overflow-hidden aspect-square object-center"
                source={require('@/assets/images/ql-link-logo6.png')}
              ></Image>
              <Text className="z-20 font-source-serif-bold text-whs-blue text-3xl/tight text-center  self-center pt-5">
                Academy of Professional & Public Services
              </Text>
              <Text className="z-20 font-source-serif-bold text-whs-blue text-base text-center pl-8 pr-8 self-center">
                2024 NCAC Model Academy With Distinction
              </Text>
              <Text className="z-20 font-source-serif-bold text-whs-blue text-base text-center ml-9 mr-9 pt-3 mt-3 border-t-2 border-whs-blue/20">
                Dedicated to Excellence - Caring. Commitment. Character.

              </Text>
              <Text className="z-20 font-source-serif-bold text-whs-blue text-base ml-9 mr-9 pt-3">
                Our Vision
              </Text>
              <Text className="z-20 font-source-serif-regular text-whs-blue text-sm pl-9 pr-9">
                Academy of Professional and Public Services students perform at the highest levels through authentic experiences that create positive change for themselves, their communities, and the world.
              </Text>
              <Text className="z-20 font-source-serif-bold text-whs-blue text-base ml-9 mr-9 pt-5">
                Our Mission
              </Text>
              <Text className="z-20 font-source-serif-regular text-whs-blue text-sm pl-9 pr-9">
                Academy of Professional Public Services, with partnerships, will increase student achievement geared toward college and career readiness through authentic and rigorous experiences. The Academy will develop personal and academic growth to ensure all students are successful contributors to society.
              </Text>
              <Text className="z-20 font-source-serif-bold text-whs-blue text-base ml-9 mr-9">
                Pathways
              </Text>
              <Text className="z-20 font-source-serif-regular text-whs-blue text-sm pl-9 pr-9">
                Business{'\n'}Culinary Arts{'\n'}Law & Justice{'\n'}Teacher Education
              </Text>
            </View>
          </View>
          
        </ScrollView>
      </View>
      
      
    </SafeAreaProvider>
  );
};


export default Academy;