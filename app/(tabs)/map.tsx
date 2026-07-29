import {
    BarlowSemiCondensed_400Regular,
    BarlowSemiCondensed_400Regular_Italic,
    BarlowSemiCondensed_600SemiBold,
} from "@expo-google-fonts/barlow-semi-condensed";
import {
    NotoSerif_400Regular,
    NotoSerif_700Bold,
    NotoSerif_700Bold_Italic,
} from "@expo-google-fonts/noto-serif";
import {
    Roboto_400Regular,
    Roboto_700Bold,
    useFonts,
} from "@expo-google-fonts/roboto";
import {
    SourceSerifPro_400Regular,
    SourceSerifPro_400Regular_Italic,
    SourceSerifPro_600SemiBold,
    SourceSerifPro_700Bold,
    SourceSerifPro_700Bold_Italic,
} from "@expo-google-fonts/source-serif-pro";
import { Asset } from "expo-asset";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
    ActivityIndicator,
    Dimensions,
    Image,
    Modal,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import MapView, { Callout, Marker, Polygon } from "react-native-maps";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";
import type { WebView as WebViewType } from "react-native-webview";
 

const { width, height } = Dimensions.get("window");

const WAIPAHU_CAMPUS_MAP_NAME = "Waipahu High Campus Map";

const INITIAL_REGION = {
  latitude: 21.3888,
  longitude: -157.9923,
  latitudeDelta: 0.005,
  longitudeDelta: 0.005,
};

const INITIAL_CAMERA = {
  center: {
    latitude: 21.38912945,
    longitude: -157.99326913,
  },
  pitch: 45,
  heading: 180,
  altitude: 1000,
  zoom: 17,
};

const CAMERA_ZOOM_RANGE = {
  maxCenterCoordinateDistance: 1300,
  minCenterCoordinateDistance: 100,
};

const icons = {
  gym: require("@/assets/images/gym.png"),
  marker: require("@/assets/images/map-marker.png"),
  library: require("@/assets/images/library.png"),
  cafe: require("@/assets/images/cafe.png"),
  band: require("@/assets/images/band.png"),
  whs: require("@/assets/images/whs-icon.png"),
  campusMap: require("@/assets/images/whs-campus-map.png"),
  // add more as needed
};

type Coordinate = [number, number];
type Floor = [string, string?, string?, string?, string?, string?];

interface MapFeature {
  name: string;
  polygon: Coordinate[];
  marker: Coordinate;
  iconNeed: boolean;
  textNeed?: boolean;
  iconName?: string;
  markerText?: string;
  firstFloor?: Floor;
  secondFloor?: Floor;
  thirdFloor?: Floor;
  layoutNeed?: boolean;
  image?: string;
}

interface MapDataResponse {
  mapData: MapFeature[];
}

/** Renders one row of rooms for a floor, sized to fit evenly within the sheet. */
const FloorRow = ({
  rooms,
  variant,
}: {
  rooms: Floor;
  variant: "first" | "second" | "third";
}) => {
  const containerClassName =
    variant === "second"
      ? "flex-row flex-wrap justify-around flex-1"
      : "flex-row items-center justify-start self-center";

  const cellClassName =
    variant === "third"
      ? "text-gray-700 text-[0.5rem] text-center text-nowrap border-2 border-black self-center p-2 bg-gray-300"
      : variant === "second"
        ? "text-gray-700 text-[0.5rem] text-center text-nowrap border-2 border-black self-center pt-2 pb-2 pl-1 pr-1 bg-gray-200"
        : "text-gray-700 text-[0.5rem] text-center border-2 border-black self-center pt-2 pb-2 pl-1 pr-1";

  const cellWidth = (width * 0.8) / rooms.length;

  return (
    <View className={containerClassName}>
      {rooms.map((room, idx) => (
        <Text key={idx} className={cellClassName} style={{ width: cellWidth }}>
          {room}
        </Text>
      ))}
    </View>
  );
};

const Map = () => {
  const webViewRef = useRef<WebViewType>(null);
  const router = useRouter();
  const mapRef = useRef<MapView>(null);
  const [appIsReady, setAppIsReady] = useState(false);
  const [interestPoint, setInterestPoint] = useState<string>("");
  const [pdfUri, setPdfUri] = useState<string | null>(null);
  const [isSheetVisible, setIsSheetVisible] = useState(false);
  const [region, setRegion] = useState(INITIAL_REGION);

  const [mapData] = useState<MapDataResponse>(
    require("@/assets/json/mapdata.json"),
  );

  useFocusEffect(
    React.useCallback(() => {
      webViewRef.current?.reload();
    }, []),
  );

  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    NotoSerif_400Regular,
    NotoSerif_700Bold,
    NotoSerif_700Bold_Italic,
    BarlowSemiCondensed_400Regular,
    BarlowSemiCondensed_400Regular_Italic,
    BarlowSemiCondensed_600SemiBold,
    SourceSerifPro_400Regular,
    SourceSerifPro_400Regular_Italic,
    SourceSerifPro_700Bold,
    SourceSerifPro_700Bold_Italic,
    SourceSerifPro_600SemiBold,
  });

  useEffect(() => {
    async function loadMapAsset() {
      try {
        const asset = await Asset.fromModule(
          require("@/assets/pdf/campusMap.pdf"),
        ).downloadAsync();
        setPdfUri(asset.localUri);
      } catch (error) {
        console.error("Failed to load local PDF asset:", error);
      }
    }
    loadMapAsset();
    setAppIsReady(true)
  }, []);

  const openSheetFor = (name: string) => {
    setInterestPoint(name);
    setIsSheetVisible(true);
  };

  const selectedFeature = mapData.mapData.find(
    (feature) => feature.name === interestPoint,
  );

  if ((appIsReady == false) || !fontsLoaded) {
    return (
      <View className="flex-1 justify-center items-center bg-[#0b0b49]">
        <Image
          source={require("@/assets/images/whs-logo.png")}
          className="size-32 mb-6 self-center"
        />
        <ActivityIndicator size="large" color="#ffffff" />
        <Text className="text-white mt-4 font-barlow-semibold text-center self-center">
          Loading...
        </Text>
      </View>
    );
  }


  return (
    <SafeAreaProvider className="flex-col">
      <View className="flex-row bg-[#0b0b49] h-[13rem] z-10 pt-44">
            <Image
                source={require("@/assets/images/whs-logo.png")}
                className="w-32 h-32 relative bottom-28 left-11"
            />
            <View className="w-48 h-28 bottom-20 left-14 items-start z-40 relative">
                <Text className="text-white font-barlow-semibold">MY VOICE</Text>
                <Text className="text-white ml-5 font-barlow-semibold"> MY CHOICE</Text>
                <Text className="text-white ml-12 font-barlow-semibold"> MY FUTURE</Text>
            </View>
        </View>

      <View className="justify-center items-center bg-whs-gold">
        <TouchableOpacity
          className="w-10 h-10 left self-start pt-3 z-30"
          onPress={() => router.push("/")}
        >
          <Image
            source={require("@/assets/images/back.png")}
            style={{ tintColor: "#0b0b49" }}
            className="size-10 self-center"
          />
        </TouchableOpacity>
        <Text className="z-20 font-barlow-semibold text-white w-full bg-whs-gold text-center relative bottom-5">
          Campus Map 2025-2026
        </Text>
      </View>

      <View className="bg-white w-[100vw] h-[75%] justify-center items-center">
        <MapView
          ref={mapRef}
          style={{ width: "100%", height: "100%", zIndex: 20 }}
          region={region}
          onRegionChangeComplete={setRegion}
          initialCamera={INITIAL_CAMERA}
          cameraZoomRange={CAMERA_ZOOM_RANGE}
          mapType="standard"
          userInterfaceStyle="dark"
        >
          {mapData.mapData.map((feature, index) => (
            <React.Fragment key={index}>
              <Polygon
                fillColor="#00008050"
                strokeColor="#ae8c52"
                strokeWidth={1}
                coordinates={feature.polygon.map(([latitude, longitude]) => ({
                  latitude,
                  longitude,
                }))}
              />
              <Marker
                coordinate={{
                  latitude: feature.marker[0],
                  longitude: feature.marker[1],
                }}
                title={feature.name}
                description=""
                tracksViewChanges={false}
                onPress={() => {
                  if (feature.layoutNeed && feature.name !== WAIPAHU_CAMPUS_MAP_NAME) {
                    openSheetFor(feature.name);
                  }
                }}
              >
                <View
                  className="items-center justify-center"
                  style={{ minWidth: 18, minHeight: 18 }}
                >
                  {feature.iconNeed ? (
                    <>
                      {feature.textNeed && (
                        <Text
                          className="text-center justify-center self-center text-[#ffffff] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] font-barlow-semibold text-base"
                          style={{ minWidth: 12 }}
                        >
                          {feature.markerText}
                        </Text>
                      )}
                      <Image
                        source={icons[feature.iconName as keyof typeof icons]}
                        style={{ width: 15, height: 15, tintColor: "#ffffff" }}
                        resizeMode="contain"
                      />
                    </>
                  ) : (
                    <Text
                      className="text-center justify-center self-center text-[#ffffff] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] font-barlow-semibold text-base"
                      style={{ minWidth: 12 }}
                    >
                      {feature.markerText}
                    </Text>
                  )}
                </View>

                <Callout tooltip>
                  <View className="flex flex-col items-center bg-white p-1 rounded-lg shadow-lg border border-gray-300 text-nowrap w-32">
                    <Text className="font-barlow-semibold text-xs mb-1 text-gray-800 w-30">
                      {feature.name}
                    </Text>
                  </View>
                </Callout>
              </Marker>
            </React.Fragment>
          ))}
        </MapView>

        <TouchableOpacity
          className="w-5 h-5 self-center justify-center absolute bottom-[10rem] z-50"
          onPress={() => openSheetFor(WAIPAHU_CAMPUS_MAP_NAME)}
        >
          <Image
            source={require("@/assets/images/whs-icon.png")}
            style={{ tintColor: "#ffffff" }}
            className="size-10 self-center"
          />
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent
          visible={isSheetVisible}
          onRequestClose={() => setIsSheetVisible(false)}
        >
          {/* Dimmed background area that closes the sheet when tapped */}
          <TouchableOpacity
            className="flex-1 justify-end items-center bg-black/1"
            activeOpacity={1}
            onPressOut={() => setIsSheetVisible(false)}
          />

          <View className="w-full bg-white rounded-t-2xl p-4 shadow-2xl">
            <ScrollView>
              {selectedFeature?.layoutNeed &&
                selectedFeature.name !== WAIPAHU_CAMPUS_MAP_NAME && (
                  <View className="mb-4">
                    <Text className="mb-4 text-xl font-bold text-gray-800 text-center font-source-serif-italic">
                      {selectedFeature.name}
                    </Text>
                    <View className="self-center items-center w-[80vw]">
                      {selectedFeature.thirdFloor && (
                        <FloorRow rooms={selectedFeature.thirdFloor} variant="third" />
                      )}
                      {selectedFeature.secondFloor && (
                        <FloorRow rooms={selectedFeature.secondFloor} variant="second" />
                      )}
                      {selectedFeature.firstFloor && (
                        <FloorRow rooms={selectedFeature.firstFloor} variant="first" />
                      )}
                    </View>
                  </View>
                )}

              {selectedFeature?.name === WAIPAHU_CAMPUS_MAP_NAME && (
                <View className="mb-[5rem] h-max">
                  <Text className="mb-4 text-xl font-bold text-gray-800 text-center font-source-serif-italic">
                    {selectedFeature.name}
                  </Text>
                  <View className="self-center m-auto block">
                    <WebView
                      ref={webViewRef}
                      source={{ uri: pdfUri ?? undefined }}
                      style={{ width: width * 0.8, height: height * 0.15 }}
                      className="self-center m-auto block"
                      // Critical security and file flags needed for local URIs
                      originWhitelist={["*"]}
                      allowFileAccess
                      allowFileAccessFromFileURLs
                      allowUniversalAccessFromFileURLs
                      // Enables standard pinch-to-zoom controls inside the viewer
                      scalesPageToFit
                    />
                  </View>
                </View>
              )}
            </ScrollView>
          </View>
        </Modal>
      </View>
    </SafeAreaProvider>
  );
};

export default Map;