import { Stack, useRouter } from "expo-router";
import { TouchableOpacity, Text } from "react-native";

export default function SettingsLayout() {
  const router = useRouter();

  // Helper to safely navigate back to the main tabs hub without stacking memory
  const renderBackButton = () => (
    <TouchableOpacity 
      onPress={() => router.replace("/(tabs)")} 
      className="flex-row items-center gap-1 p-2 -ml-2"
      accessibilityRole="button"
      accessibilityLabel="Close settings and return Home"
    >
      <Text className="text-white text-2xl font-light">‹</Text>
      <Text className="text-white text-base font-barlow-semibold">Home</Text>
    </TouchableOpacity>
  );

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
