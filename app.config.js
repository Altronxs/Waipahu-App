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
      },
      predictiveBackGestureEnabled: false,
      package: "com.altronx.WaipahuHighSchoolApp",
    },
    plugins: [
      "expo-router",
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
      // 👇 ADDED THIS BLOCK TO ENABLE GIFS FOR REACT-NATIVE IMAGE COMPONENT ON ANDROID
      [
        "expo-build-properties",
        {
          "android": {
            "frescoVersion": "2.5.0"
          }
        }
      ],
      "expo-font",
      "expo-web-browser",
      "expo-asset",
      "expo-image", // Note: This library renders GIFs natively without needing fresco!
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
