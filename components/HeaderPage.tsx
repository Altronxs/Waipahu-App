import { Image, Text, View } from "react-native";

export function HeaderPage() {
    return (
        <>
            <View className="flex-row justify-center bg-[#17273d] h-[13rem] z-10 pt-44 gap-5 relative pl-10">
                <Image
                    source={require("@/assets/images/whs-logo.png")}
                    className="w-32 h-32 relative bottom-28"
                />
                <View className="w-48 h-28 bottom-20 items-start z-40 relative">
                    <Text className="text-white text-xl font-barlow-semibold">MY VOICE</Text>
                    <Text className="text-white text-xl ml-5 font-barlow-semibold"> MY CHOICE</Text>
                    <Text className="text-white text-xl ml-12 font-barlow-semibold"> MY FUTURE</Text>
                </View>
            </View>
        </>
    );
}