module.exports = {
  expo: {
    name: "WaipahuHighSchoolApp",
    slug: "WaipahuHighSchoolApp",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "waipahuhighschoolapp",
    userInterfaceStyle: "automatic",
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.altronx.WaipahuHighSchoolApp",
      infoPlist: {
        ITSAppUsesNonExemptEncryption: false
      }
    },
    android: {
      adaptiveIcon: {
        backgroundColor: "#E6F4FE",
        // foregroundImage: "./assets/images/android-icon-foreground.png",
        // backgroundImage: "./assets/images/android-icon-background.png",
        // monochromeImage: "#assets/images/android-icon-monochrome.png"
      },
      predictiveBackGestureEnabled: false,
      package: "com.altronx.WaipahuHighSchoolApp",
      // REMOVE "config.googleMaps" from here completely to prevent conflicts
    },
    plugins: [
      "expo-router",
      // MOVE the Google Maps configuration here into the plugin configuration block 👇
      [
        "react-native-maps",
        {
          "androidGoogleMapsApiKey": process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY
        }
      ],
      [
        "expo-splash-screen",
        {
          image: "./assets/images/splash-icon.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff",
          dark: {
            backgroundColor: "#000000"
          }
        }
      ],
      [
        "expo-location",
        {
          locationWhenInUsePermission: "Allow this app to access your location while in use.",
          locationAlwaysPermission: "Allow this app to access your location at all times.",
          isAndroidBackgroundLocationEnabled: false
        }
      ],
      "expo-font",
      "expo-web-browser",
      "expo-asset",
      "expo-image",
      "expo-status-bar"
    ],
    experiments: {
      typedRoutes: true,
      reactCompiler: true
    },
    extra: {
      router: {},
      eas: {
        projectId: "45415bfb-cf50-4064-a418-644d4c842109"
      }
    }
  }
};
