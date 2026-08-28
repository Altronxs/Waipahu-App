import React from "react";
import { NativeTabs } from 'expo-router/unstable-native-tabs';

const ACTIVE_COLOR = "#b28d3e";
const INACTIVE_COLOR = "#ffffff";
const BAR_BACKGROUND = "#17273d";

const _Layout = () => {
  return (
    <NativeTabs 
      backgroundColor={BAR_BACKGROUND} // Works on Android and older iOS
      iconColor={{ default: INACTIVE_COLOR, selected: ACTIVE_COLOR }}
      labelStyle={{ color: INACTIVE_COLOR }}
      tintColor={ACTIVE_COLOR}
    >
      {/* Students Tab */}
      <NativeTabs.Trigger 
        name="student" 
        contentStyle={{ backgroundColor: BAR_BACKGROUND }} // Forces the dark color on iOS
      >
        <NativeTabs.Trigger.Label>Students</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="info.circle" md="info" />
      </NativeTabs.Trigger>

      {/* Home Tab */}
      <NativeTabs.Trigger 
        name="index" 
        contentStyle={{ backgroundColor: BAR_BACKGROUND }} // Forces the dark color on iOS
      >
        <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="house" md="home" />
      </NativeTabs.Trigger>

      {/* Campus Tab */}
      <NativeTabs.Trigger 
        name="map" 
        contentStyle={{ backgroundColor: BAR_BACKGROUND }} // Forces the dark color on iOS
      >
        <NativeTabs.Trigger.Label>Campus</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="map" md="map" />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
};

export default _Layout;
