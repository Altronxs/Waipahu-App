import {
    BarlowSemiCondensed_400Regular,
    BarlowSemiCondensed_400Regular_Italic,
    BarlowSemiCondensed_600SemiBold_Italic,
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
import { useFocusEffect, useRouter } from "expo-router";
import React, { useState, useEffect, useCallback, useRef } from "react";
import {
    ActivityIndicator,
    Image,
    ImageBackground,
    Linking,
    RefreshControl,
    ScrollView,
    Modal,
    Text,
    TouchableOpacity,
    useWindowDimensions,
    View,
    Switch,
} from "react-native";
import { GlassView } from 'expo-glass-effect';
import { SafeAreaProvider } from "react-native-safe-area-context"; 

export default function License() {
  const router = useRouter(); // Get the router instance
  const { height, width } = useWindowDimensions();

  const [selectedSchedule, setSelectedSchedule] = useState<string>('');
  const [isFocus, setIsFocus] = useState(false);


  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    NotoSerif_400Regular,
    NotoSerif_700Bold,
    NotoSerif_700Bold_Italic,
    BarlowSemiCondensed_400Regular,
    BarlowSemiCondensed_400Regular_Italic,
    BarlowSemiCondensed_600SemiBold_Italic,
    BarlowSemiCondensed_600SemiBold,
    SourceSerifPro_400Regular,
    SourceSerifPro_400Regular_Italic,
    SourceSerifPro_700Bold,
    SourceSerifPro_700Bold_Italic,
    SourceSerifPro_600SemiBold,
  });

  if (!fontsLoaded) {
    return (
      <View className="flex-1 justify-center items-center bg-[#17273d]">
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
  } else {
    return (
      <SafeAreaProvider className="flex-col">
        <View className="bg-white w-[100vw] h-[100vh] justify-center items-center ">
            <View className="flex flex-row flex-nowrap items-center bg-whs-blue w-full pt-16">
                <GlassView
                    style={{alignSelf: 'flex-start', zIndex: 30, borderRadius: 1000, alignItems: 'center', padding: 6, margin: 20}}
                    glassEffectStyle="clear"
                    isInteractive
                >
                    <TouchableOpacity
                        className="items-center"
                        onPress={() => router.canGoBack() ? router.back() : router.navigate("/(tabs)")}
                    >
                        <Image
                        source={require("@/assets/images/back.png")}
                        style={{
                            tintColor: "#ffffff",
                        }}
                        className="size-10 self-center block m-auto pr-1"
                        />
                    </TouchableOpacity>
                </GlassView>
                
                <Text className="z-20 font-roboto-bold text-white text-center text-xl pb-2">
                    License
                </Text>
                <Image
                    source={require("@/assets/images/whs-logo.png")}
                    className="w-16 h-16 ml-auto mr-7"
                />
            </View> 
            <ScrollView
                className="w-[100vw] flex-1 flex-col bg-black/10"
                style={{ height: height * 0.5}}
                bounces={true}                
                overScrollMode="never"          
                scrollEventThrottle={16}       
                decelerationRate="normal"
            >
                <View className="w-[92%] self-center mt-5 px-3">
    
                  {/* 1. Clear Section Header Structure */}
                  <Text className="font-barlow-semibold text-2xl text-center text-[#333333] mb-1">
                    Apache License
                  </Text>
                  <Text className="font-barlow-regular text-sm text-center text-[#666666] mb-1">
                    Version 2.0, January 2004
                  </Text>
                  <Text className="font-barlow-regular text-xs text-center text-blue-600 mb-6">
                    http://www.apache.org/licenses/
                  </Text>

                  <Text className="font-barlow-semibold text-sm text-center text-[#444444] tracking-wide mb-6 uppercase">
                    Terms and Conditions for Use, Reproduction, and Distribution
                  </Text>

                  {/* 2. Structured Body Paragraph Layouts */}
                  <View className="flex-col gap-y-4">
                    
                    {/* Section 1 block */}
                    <View className="flex-col">
                      <Text className="font-barlow-semibold text-base text-[#444444] mb-2">
                        1. Definitions.
                      </Text>
                      
                      <View className="flex-col gap-y-3 pl-3">
                        <Text className="font-roboto-regular text-sm text-[#5b5b5b] leading-5">
                          <Text className="font-roboto-bold">"License"</Text> shall mean the terms and conditions for use, reproduction, and distribution as defined by Sections 1 through 9 of this document.
                        </Text>
                        
                        <Text className="font-roboto-regular text-sm text-[#5b5b5b] leading-5">
                          <Text className="font-roboto-bold">"Licensor"</Text> shall mean the copyright owner or entity authorized by the copyright owner that is granting the License.
                        </Text>
                        
                        <Text className="font-roboto-regular text-sm text-[#5b5b5b] leading-5">
                          <Text className="font-roboto-bold">"Legal Entity"</Text> shall mean the union of the acting entity and all other entities that control, are controlled by, or are under common control with that entity. For the purposes of this definition, "control" means (i) the power, direct or indirect, to cause the direction or management of such entity, whether by contract or otherwise, or (ii) ownership of fifty percent (50%) or more of the outstanding shares, or (iii) beneficial ownership of such entity.
                        </Text>
                        
                        <Text className="font-roboto-regular text-sm text-[#5b5b5b] leading-5">
                          <Text className="font-roboto-bold">"You" (or "Your")</Text> shall mean an individual or Legal Entity exercising permissions granted by this License.
                        </Text>
                        
                        <Text className="font-roboto-regular text-sm text-[#5b5b5b] leading-5">
                          <Text className="font-roboto-bold">"Source"</Text> form shall mean the preferred form for making modifications, including but not limited to software source code, documentation source, and configuration files.
                        </Text>
                        
                        <Text className="font-roboto-regular text-sm text-[#5b5b5b] leading-5">
                          <Text className="font-roboto-bold">"Object"</Text> form shall mean any form resulting from mechanical transformation or translation of a Source form, including but not limited to compiled object code, generated documentation, and conversions to other media types.
                        </Text>
                        
                        <Text className="font-roboto-regular text-sm text-[#5b5b5b] leading-5">
                          <Text className="font-roboto-bold">"Work"</Text> shall mean the work of authorship, whether in Source or Object form, made available under the License, as indicated by a copyright notice that is included in or attached to the work (an example is provided in the Appendix below).
                        </Text>
                        
                        <Text className="font-roboto-regular text-sm text-[#5b5b5b] leading-5">
                          <Text className="font-roboto-bold">"Derivative Works"</Text> shall mean any work, whether in Source or Object form, that is based on (or derived from) the Work and for which the editorial revisions, annotations, elaborations, or other modifications represent, as a whole, an original work of authorship. For the purposes of this License, Derivative Works shall not include works that remain separable from, or merely link (or bind by name) to the interfaces of, the Work and Derivative Works thereof.
                        </Text>
                        
                        <Text className="font-roboto-regular text-sm text-[#5b5b5b] leading-5">
                          <Text className="font-roboto-bold">"Contribution"</Text> shall mean any work of authorship, including the original version of the Work and any modifications or additions to that Work or Derivative Works thereof, that is intentionally submitted to Licensor for inclusion in the Work by the copyright owner or by an individual or Legal Entity authorized to submit on behalf of the copyright owner. For the purposes of this definition, "submitted" means any form of electronic, verbal, or written communication sent to the Licensor or its representatives, including but not limited to communication on electronic mailing lists, source code control systems, and issue tracking systems that are managed by, or on behalf of, the Licensor for the purpose of discussing and improving the Work, but excluding communication that is conspicuously marked or otherwise designated in writing by the copyright owner as "Not a Contribution."
                        </Text>
                        
                        <Text className="font-roboto-regular text-sm text-[#5b5b5b] leading-5">
                          <Text className="font-roboto-bold">"Contributor"</Text> shall mean Licensor and any individual or Legal Entity on behalf of whom a Contribution has been received by Licensor and subsequently incorporated within the Work.
                        </Text>
                      </View>
                    </View>

                    {/* Section 2 block */}
                    <View className="flex-col">
                      <Text className="font-barlow-semibold text-base text-[#444444] mb-1">
                        2. Grant of Copyright License.
                      </Text>
                      <Text className="font-roboto-regular text-sm text-[#5b5b5b] leading-5 pl-3">
                        Subject to the terms and conditions of this License, each Contributor hereby grants to You a perpetual, worldwide, non-exclusive, no-charge, royalty-free, irrevocable copyright license to reproduce, prepare Derivative Works of, publicly display, publicly perform, sublicense, and distribute the Work and such Derivative Works in Source or Object form.
                      </Text>
                    </View>

                    {/* Section 3 block */}
                    <View className="flex-col">
                      <Text className="font-barlow-semibold text-base text-[#444444] mb-1">
                        3. Grant of Patent License.
                      </Text>
                      <Text className="font-roboto-regular text-sm text-[#5b5b5b] leading-5 pl-3">
                        Subject to the terms and conditions of this License, each Contributor hereby grants to You a perpetual, worldwide, non-exclusive, no-charge, royalty-free, irrevocable (except as stated in this section) patent license to make, have made, use, offer to sell, sell, import, and otherwise transfer the Work, where such license applies only to those patent claims licensable by such Contributor that are necessarily infringed by their Contribution(s) alone or by combination of their Contribution(s) with the Work to which such Contribution(s) was submitted. If You institute patent litigation against any entity (including a cross-claim or counterclaim in a lawsuit) alleging that the Work or a Contribution incorporated within the Work constitutes direct or contributory patent infringement, then any patent licenses granted to You under this License for that Work shall terminate as of the date such litigation is filed.
                      </Text>
                    </View>
                    {/* Section 4 block (continued) */}
                    <View className="flex-col">
                      <Text className="font-barlow-semibold text-base text-[#444444] mb-2">
                        4. Redistribution.
                      </Text>
                      <Text className="font-roboto-regular text-sm text-[#5b5b5b] leading-5 pl-3 mb-2">
                        You may reproduce and distribute copies of the Work or Derivative Works thereof in any medium, with or without modifications, and in Source or Object form, provided that You meet the following conditions:
                      </Text>

                      <View className="flex-col gap-y-2 pl-6">
                        <Text className="font-roboto-regular text-sm text-[#5b5b5b] leading-5">
                          <Text className="font-roboto-bold">(a)</Text> You must give any other recipients of the Work or Derivative Works a copy of this License; and
                        </Text>
                        <Text className="font-roboto-regular text-sm text-[#5b5b5b] leading-5">
                          <Text className="font-roboto-bold">(b)</Text> You must cause any modified files to carry prominent notices stating that You changed the files; and
                        </Text>
                        <Text className="font-roboto-regular text-sm text-[#5b5b5b] leading-5">
                          <Text className="font-roboto-bold">(c)</Text> You must retain, in the Source form of any Derivative Works that You distribute, all copyright, patent, trademark, and attribution notices from the Source form of the Work, excluding those notices that do not pertain to any part of the Derivative Works; and
                        </Text>
                        <Text className="font-roboto-regular text-sm text-[#5b5b5b] leading-5">
                          <Text className="font-roboto-bold">(d)</Text> If the Work includes a "NOTICE" text file as part of its distribution, then any Derivative Works that You distribute must include a readable copy of the attribution notices contained within such NOTICE file, excluding those notices that do not pertain to any part of the Derivative Works, in at least one of the following places: within a NOTICE text file distributed as part of the Derivative Works; within the Source form or documentation, if provided along with the Derivative Works; or, within a display generated by the Derivative Works, if and wherever such third-party notices normally appear. The contents of the NOTICE file are for informational purposes only and do not modify the License. You may add Your own attribution notices within Derivative Works that You distribute, alongside or as an addendum to the NOTICE text from the Work, provided that such additional attribution notices cannot be construed as modifying the License.
                        </Text>
                      </View>

                      <Text className="font-roboto-regular text-sm text-[#5b5b5b] leading-5 pl-3 mt-2">
                        You may add Your own copyright statement to Your modifications and may provide additional or different license terms and conditions for use, reproduction, or distribution of Your modifications, or for any such Derivative Works as a whole, provided Your use, reproduction, and distribution of the Work otherwise complies with the conditions stated in this License.
                      </Text>
                    </View>

                    {/* Section 5 block */}
                    <View className="flex-col">
                      <Text className="font-barlow-semibold text-base text-[#444444] mb-1">
                        5. Submission of Contributions.
                      </Text>
                      <Text className="font-roboto-regular text-sm text-[#5b5b5b] leading-5 pl-3">
                        Unless You explicitly state otherwise, any Contribution intentionally submitted for inclusion in the Work by You to the Licensor shall be under the terms and conditions of this License, without any additional terms or conditions. Notwithstanding the above, nothing herein shall supersede or modify the terms of any separate license agreement you may have executed with Licensor regarding such Contributions.
                      </Text>
                    </View>

                    {/* Section 6 block */}
                    <View className="flex-col">
                      <Text className="font-barlow-semibold text-base text-[#444444] mb-1">
                        6. Trademarks.
                      </Text>
                      <Text className="font-roboto-regular text-sm text-[#5b5b5b] leading-5 pl-3">
                        This License does not grant permission to use the trade names, trademarks, service marks, or product names of the Licensor, except as required for reasonable and customary use in describing the origin of the Work and reproducing the content of the NOTICE file.
                      </Text>
                    </View>

                    {/* Section 7 block */}
                    <View className="flex-col">
                      <Text className="font-barlow-semibold text-base text-[#444444] mb-1">
                        7. Disclaimer of Warranty.
                      </Text>
                      <Text className="font-roboto-regular text-sm text-[#5b5b5b] leading-5 pl-3">
                        Unless required by applicable law or agreed to in writing, Licensor provides the Work (and each Contributor provides its Contributions) on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied, including, without limitation, any warranties or conditions of TITLE, NON-INFRINGEMENT, MERCHANTABILITY, or FITNESS FOR A PARTICULAR PURPOSE. You are solely responsible for determining the appropriateness of using or redistributing the Work and assume any risks associated with Your exercise of permissions under this License.
                      </Text>
                    </View>

                    {/* Section 8 block */}
                    <View className="flex-col">
                      <Text className="font-barlow-semibold text-base text-[#444444] mb-1">
                        8. Limitation of Liability.
                      </Text>
                      <Text className="font-roboto-regular text-sm text-[#5b5b5b] leading-5 pl-3">
                        In no event and under no legal theory, whether in tort (including negligence), contract, or otherwise, unless required by applicable law (such as deliberate and grossly negligent acts) or agreed to in writing, shall any Contributor be liable to You for damages, including any direct, indirect, special, incidental, or consequential damages of any character arising as a result of this License or out of the use or inability to use the Work (including but not limited to damages for loss of goodwill, work stoppage, computer failure or malfunction, or any and all other commercial damages or losses), even if such Contributor has been advised of the possibility of such damages.
                      </Text>
                    </View>

                    {/* Section 9 block */}
                    <View className="flex-col">
                      <Text className="font-barlow-semibold text-base text-[#444444] mb-1">
                        9. Accepting Warranty or Additional Liability.
                      </Text>
                      <Text className="font-roboto-regular text-sm text-[#5b5b5b] leading-5 pl-3">
                        While redistributing the Work or Derivative Works thereof, You may choose to offer, and charge a fee for, acceptance of support, warranty, indemnity, or other liability obligations and/or rights consistent with this License. However, in accepting such obligations, You may act only on Your own behalf and on Your sole responsibility, not on behalf of any other Contributor, and only if You agree to indemnify, defend, and hold each Contributor harmless for any liability incurred by, or claims asserted against, such Contributor by reason of your accepting any such warranty or additional liability.
                      </Text>
                    </View>

                    <Text className="font-barlow-semibold text-sm text-center text-[#444444] tracking-wide mt-4 mb-4 uppercase">
                      End of Terms and Conditions
                    </Text>

                    {/* Appendix block */}
                    <View className="flex-col">
                      <Text className="font-barlow-semibold text-base text-[#444444] mb-2">
                        APPENDIX: How to apply the Apache License to your work.
                      </Text>
                      <Text className="font-roboto-regular text-sm text-[#5b5b5b] leading-5 pl-3 mb-3">
                        To apply the Apache License to your work, attach the following boilerplate notice, with the fields enclosed by brackets "[]" replaced with your own identifying information. (Don't include the brackets!) The text should be enclosed in the appropriate comment syntax for the file format. We also recommend that a file or class name and description of purpose be included on the same "printed page" as the copyright notice for easier identification within third-party archives.
                      </Text>

                      <View className="flex-col bg-[#f5f5f5] rounded-md p-3 gap-y-2">
                        <Text className="font-roboto-regular text-xs text-[#5b5b5b] leading-5">
                          Copyright 2026 Kyle Alexander Baldovi
                        </Text>
                        <Text className="font-roboto-regular text-xs text-[#5b5b5b] leading-5">
                          Licensed under the Apache License, Version 2.0 (the "License");
                          you may not use this file except in compliance with the License.
                          You may obtain a copy of the License at
                        </Text>
                        <Text className="font-roboto-regular text-xs text-blue-600 leading-5">
                          http://www.apache.org/licenses/LICENSE-2.0
                        </Text>
                        <Text className="font-roboto-regular text-xs text-[#5b5b5b] leading-5">
                          Unless required by applicable law or agreed to in writing, software
                          distributed under the License is distributed on an "AS IS" BASIS,
                          WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
                          See the License for the specific language governing permissions and
                          limitations under the License.
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
            </ScrollView>
        </View>
      </SafeAreaProvider>
    );
  } 
}