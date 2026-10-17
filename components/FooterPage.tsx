import { Image, Text, View } from "react-native";

export function FooterPage() {
    return (
        <>
            <View
            className="w-full h-[15rem]"
            />
            <View
            className="w-full h-[18rem] bg-whs-blue absolute bottom-0 flex flex-row flex-wrap justify-center pt-7"
            >
            <View
                className="w-[45%] pl-3"
            >
                <Text className="z-20 w-full font-roboto-bold text-4xl/none text-white text-left">
                    WAIPAHU 
                </Text>
                <Text className="z-20 w-full font-roboto-regular text-xl/none text-white text-left  border-b-2 border-whs-gold pb-2">
                    High School
                </Text>
                <Text className="z-20 w-full font-roboto-regular text-base/none text-white text-left pt-3">
                    94-1211 Farrington Hwy
                    Waipahu, HI 96797
                </Text>         
                <Text className="z-20 w-full font-roboto-regular text-base/none text-white text-left pt-2">
                    P: (808) 307-9555{'\n'}
                    F: (808) 675-0257
                </Text>   
            </View>
            <View
                className="w-[50%] flex flex-row flex-wrap justify-end"
            >
                <Text className="z-20 w-full font-source-serif-italic text-sm text-whs-gold text-right relative right-3">
                    A Nationally Recognized{'\n'}
                    Wall-to-Wall Academy High School{'\n'}
                    WASC – Accredited till 2031
                </Text>
                <Image
                source={require("@/assets/images/whs-logo.png")}
                className="size-11 float-right m-1 mx-0"
                />
                <Image
                source={require("@/assets/images/DOE.png")}
                className="size-11 float-right m-1 mr-3"
                />
                <Text className="z-20 w-full font-roboto-regular text-base text-white text-right mr-3">
                    Powered by
                </Text>
                <Text className="z-20 font-roboto-bold text-base/none text-white text-right mr-3">
                    Students & Alumni
                </Text>
            </View>
            </View>
            <View
            className="w-full h-[15rem] bg-whs-blue absolute bottom-[-120px]"
            >
            </View>
        </>
    );
}