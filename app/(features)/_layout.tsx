import { Stack, useRouter } from "expo-router";
import { TouchableOpacity, Text, View } from "react-native";
import { Image } from "expo-image"; // Optimized image component

export default function FeaturesLayout() {
  const router = useRouter();

  // Helper to generate a universal, memory-safe back arrow
  const renderBackButton = () => (
    <TouchableOpacity 
      onPress={() => router.navigate("/(tabs)")} // Always cleanly returns to the Home tabs hub
      className="flex-row items-center gap-1 p-2 -ml-2"
      accessibilityRole="button"
      accessibilityLabel="Go back to Home"
    >
      {/* Universal thin back arrow using system font styling */}
      <Text className="text-white text-2xl font-light">‹</Text>
      <Text className="text-white text-base font-barlow-semibold">Home</Text>
    </TouchableOpacity>
  );

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerShadowVisible: false,   // Keeps design clean and flat
        animation: "slide_from_right", // Native high-performance translation animation
        gestureEnabled: true,         // Allows iOS swipe-to-back functionality
      }}
    >
      {/* Register each feature file explicitly to handle individual page titles cleanly */}
      <Stack.Screen name="academy" options={{ title: "Career Academies" }} />
      <Stack.Screen name="athletics" options={{ title: "Athletics" }} />
      <Stack.Screen name="bell" options={{ title: "Bell Schedule" }} />
      <Stack.Screen name="cafe" options={{ title: "Cafe Menu" }} />
      <Stack.Screen name="calendar" options={{ title: "School Calendar" }} />
      <Stack.Screen name="clubs" options={{ title: "Student Clubs" }} />
      <Stack.Screen name="contacts" options={{ title: "Campus Contacts" }} />
      <Stack.Screen name="events" options={{ title: "Events & Activities" }} />
      <Stack.Screen name="legacy" options={{ title: "Social Media" }} />
      <Stack.Screen name="news" options={{ title: "Marauder News" }} />
      <Stack.Screen name="registrar" options={{ title: "Registrar Office" }} />
      <Stack.Screen name="staff" options={{ title: "Staff Directory" }} />
      <Stack.Screen name="vision" options={{ title: "Mission & Vision" }} />
    </Stack>
  );
}
