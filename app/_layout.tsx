import { Stack } from "expo-router";
import './globals.css';

const HIDDEN_ROUTE_TITLES: Record<string, string> = {
  cafe: "Cafe",
  contacts: "Contacts",
  bell: "Bell",
  calendar: "Calendar", // fixed the "Calender" typo, rename the file too
  vision: "Vision",
  news: "News",
  athletics: "Athletics",
  clubs: "Clubs",
  registrar: "Registrar",
  author: "Author",
  legacy: "Legacy"
};

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      {Object.entries(HIDDEN_ROUTE_TITLES).map(([name, title]) => (
        <Stack.Screen
          key={name}
          name={name}
          options={{ title, headerShown: false }}
        />
      ))}
    </Stack>
  );
}
