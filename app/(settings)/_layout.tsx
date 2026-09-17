import { Stack, useRouter } from "expo-router";
import { TouchableOpacity, Text } from "react-native";

export default function SettingsLayout() {
  const router = useRouter();


  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerShadowVisible: false,
        animation: "slide_from_right", // Changes transition style to signify utility configurations layout context
        gestureEnabled: true,
      }}
    >
      {/* Configure structural options for metadata and author detail sheets */}
      <Stack.Screen name="author" options={{ title: "App Creators & Credits" }} />
      <Stack.Screen name="settings" options={{ title: "Settings" }} />
      <Stack.Screen name="license" options={{ title: "License" }} />
    </Stack>
  );
}
