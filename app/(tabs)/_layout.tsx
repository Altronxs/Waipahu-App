import React from "react";
import { Platform } from "react-native";
import { Tabs } from "expo-router";
import { NativeTabs } from 'expo-router/unstable-native-tabs';
import { Image } from "react-native";

const ACTIVE_COLOR = "#ae8c52";
const INACTIVE_COLOR = "#ffffff";
const BAR_BACKGROUND = "#17273d";


const _Layout = () => {
  // Use NativeTabs only on iOS 26 or newer
  const useNativeTabs = Platform.OS === 'ios' && Number(Platform.Version) >= 26;

  if (useNativeTabs) {
    return (
      <NativeTabs 
        backgroundColor={BAR_BACKGROUND} 
        tintColor={ACTIVE_COLOR}
        iconColor={{ default: INACTIVE_COLOR, selected: ACTIVE_COLOR }}
        labelStyle={{ 
          default: { color: INACTIVE_COLOR }, 
          selected: { color: ACTIVE_COLOR } 
        }}
      >
        {/* Visible Native Tabs */}
        <NativeTabs.Trigger name="student" contentStyle={{ backgroundColor: BAR_BACKGROUND }}>
          <NativeTabs.Trigger.Label>Students</NativeTabs.Trigger.Label>
          <NativeTabs.Trigger.Icon sf="info.circle" md="info" />
        </NativeTabs.Trigger>

        <NativeTabs.Trigger name="index" contentStyle={{ backgroundColor: BAR_BACKGROUND }}>
          <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
          <NativeTabs.Trigger.Icon sf="house" md="home" />
        </NativeTabs.Trigger>

        <NativeTabs.Trigger name="map" contentStyle={{ backgroundColor: BAR_BACKGROUND }}>
          <NativeTabs.Trigger.Label>Campus</NativeTabs.Trigger.Label>
          <NativeTabs.Trigger.Icon sf="map" md="map" />
        </NativeTabs.Trigger>
      </NativeTabs>
    );
  }

  // --- FALLBACK DESIGN FOR ANDROID & OLDER iOS ---
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: ACTIVE_COLOR,
        tabBarInactiveTintColor: INACTIVE_COLOR,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 20,
          height: 60,
          width: "70%",
          transform: [{ translateX: "22%" }],
          borderRadius: 50,
          backgroundColor: BAR_BACKGROUND,
          borderTopWidth: 0,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.35,
          shadowRadius: 12,
          elevation: 10,
          paddingHorizontal: 12,
        },
        tabBarItemStyle: {
          borderRadius: 20,
          height: 48,
          marginTop: 8,
        },
      }}
    >
      <Tabs.Screen
        name="student"
        options={{
          title: "Students",
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("@/assets/images/whs-info.png")}
              tintColor={focused ? ACTIVE_COLOR : INACTIVE_COLOR}
              className="size-7"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("@/assets/images/whs-home.png")}
              tintColor={focused ? ACTIVE_COLOR : INACTIVE_COLOR}
              className="size-7"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: "Campus",
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("@/assets/images/whs-map.png")}
              tintColor={focused ? ACTIVE_COLOR : INACTIVE_COLOR}
              className="size-7"
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default _Layout;
