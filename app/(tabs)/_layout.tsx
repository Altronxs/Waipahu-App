import { Tabs } from "expo-router";
import React from "react";
import { Image, Text } from "react-native";
import { NativeTabs } from 'expo-router/unstable-native-tabs';

const ACTIVE_COLOR = "#ae8c52";
const INACTIVE_COLOR = "#ffffff";
const BAR_BACKGROUND = "#17273d";

const _Layout = () => {
  return (
    <NativeTabs
      backgroundColor={BAR_BACKGROUND}
      iconColor={{ default: INACTIVE_COLOR, selected: ACTIVE_COLOR }}
      labelStyle={{ color: INACTIVE_COLOR }}
    >
      <NativeTabs.Trigger name="student">
        <NativeTabs.Trigger.Label>Students</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon src={require("@/assets/images/whs-info-resized.png")} />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon src={require("@/assets/images/whs-home-resized.png")} />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="map">
        <NativeTabs.Trigger.Label>Campus</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon src={require("@/assets/images/whs-map-resized.png")} />
      </NativeTabs.Trigger>
    </NativeTabs>
    // <Tabs
    //   screenOptions={{
    //     headerShown: false,
    //     tabBarActiveTintColor: ACTIVE_COLOR,
    //     tabBarInactiveTintColor: INACTIVE_COLOR,
    //     tabBarShowLabel: false,
    //     tabBarStyle: {
    //       position: "absolute",
    //       bottom: 30,
    //       height: 60,
          
    //       // --- THE CENTER FIX ---
    //       width: "70%",                            // 1. Explicit pixel width for the 3 tabs                           // 2. Push left edge to exactly the screen center
    //       transform: [{ translateX: "22%"}],     // 3. Move it back by exactly HALF the width (-280 / 2)
          
    //       borderRadius: 50,
    //       backgroundColor: BAR_BACKGROUND,
    //       borderTopWidth: 0,
    //       // shadow (iOS)
    //       shadowColor: "#000",
    //       shadowOffset: { width: 0, height: 8 },
    //       shadowOpacity: 0.35,
    //       shadowRadius: 12,
    //       // elevation (Android)
    //       elevation: 10,
    //       paddingHorizontal: 12,
    //     },
    //     tabBarItemStyle: {
    //       borderRadius: 20,
    //       height: 48,
    //       marginTop: 8,
    //     },
    //   }}
    // >
    //   <Tabs.Screen
    //     name="student"
    //     options={{
    //       title: "Students",
    //       tabBarIcon: ({ focused }) => (
    //         <Image
    //           source={require("@/assets/images/whs-info.png")}
    //           tintColor={focused ? ACTIVE_COLOR : INACTIVE_COLOR}
    //           className="size-7"
    //         />
    //       ),
    //     }}
    //   />
    //   <Tabs.Screen
    //     name="index"
    //     options={{
    //       title: "Home",
    //       tabBarIcon: ({ focused }) => (
    //         <Image
    //           source={require("@/assets/images/whs-home.png")}
    //           tintColor={focused ? ACTIVE_COLOR : INACTIVE_COLOR}
    //           className="size-7"
    //         />
    //       ),
    //     }}
    //   />
    //   <Tabs.Screen
    //     name="map"
    //     options={{
    //       title: "Campus",
    //       tabBarIcon: ({ focused }) => (
    //         <Image
    //           source={require("@/assets/images/whs-map.png")}
    //           tintColor={focused ? ACTIVE_COLOR : INACTIVE_COLOR}
    //           className="size-7"
    //         />
    //       ),
    //     }}
    //   />
    //   <Tabs.Screen name="cafe" options={{ title: "Cafe", href: null }} />
    //   <Tabs.Screen name="contacts" options={{ title: "Contacts", href: null }} />
    //   <Tabs.Screen name="bell" options={{ title: "Bell", href: null }} />
    //   <Tabs.Screen name="calender" options={{ title: "Calender", href: null }} />
    //   <Tabs.Screen name="vision" options={{ title: "Vision", href: null }} />
    //   <Tabs.Screen name="news" options={{ title: "News", href: null }} />
    //   <Tabs.Screen name="athletics" options={{ title: "Athletics", href: null }} />
    //   <Tabs.Screen name="clubs" options={{ title: "Clubs", href: null }} />
    //   <Tabs.Screen name="registrar" options={{ title: "Registrar", href: null }} />
    //   <Tabs.Screen name="author" options={{ title: "Author", href: null }} />
    // </Tabs>
  );
};

export default _Layout;