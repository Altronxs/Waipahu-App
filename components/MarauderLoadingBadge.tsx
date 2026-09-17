import { FocusGate } from "@/components/FocusGate";
import { Image as ExpoImage } from "expo-image";
import { Image, Text, View } from "react-native";

export function MarauderLoadingBadge() {
  return (
    <>
      <FocusGate>
        <View>
          {/* Kept as standard React Native Image */}
          <Image
            source={require("@/assets/images/marauder-script.png")}
            className="self-center object-contain "
            style={{
              height: 50,
              width: "auto",
              aspectRatio: 198 / 50,
              position: "absolute",
              opacity: 0.5,
            }}
          />

          {/* Swapped to Expo Image using the alias */}
          <ExpoImage
            source={require("@/assets/images/gif/marauder-script-loop.gif")}
            style={{ height: 52, width: "auto", aspectRatio: 202 / 52 }}
            contentFit="contain" // Needed for expo-image instead of object-contain
            priority={"normal"}
            cachePolicy={"memory"}
          />
        </View>
      </FocusGate>

      <Text className="text-white mt-4 mb-4 font-barlow-italic text-center self-center">
        LOADING...
      </Text>
    </>
  );
}