// app/_layout.tsx
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Baseline tabs interface */}
      <Stack.Screen name="(tabs)" /> 
      <Stack.Screen 
        name="(features)" 
        options={{ 
          animation: "slide_from_right",
          gestureEnabled: true,

        }} 
      />
      <Stack.Screen 
        name="(settings)" 
        options={{ 
          animation: "slide_from_right",
          gestureEnabled: true,

        }} 
      />
    </Stack>
  );
}
