import {
    ActivityIndicator,
    Image,
    ImageBackground,
    Dimensions,
    Linking,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function TitleBar() {
    return (
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
    )
}