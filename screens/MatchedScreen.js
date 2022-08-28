import React from 'react';
import { View, Text, TouchableOpacity, Image} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/core';

import tw from 'tailwind-react-native-classnames';
const MatchedScreen = () => { 
    const navigation = useNavigation()
    const { params } = useRoute()

    const {loggedInProfile, userSwiped,} = params
    
    return (
        <View style={tw`h-full bg-red-500 pt-20 opacity-0.5`  }>
            <View style={tw`flex-1 flex justify-evenly mt-5`}> 
                <Image  style={tw`h-14 w-14 rounded-full pt-2`} 
                
                source={{uri: 'https://links.papareact/mg9'}} />
            
            </View>

            <Text>
                you and {userSwiped.displayName} have matched!
            </Text>

            <View>
                <Image 
                style={tw`h-32 w-32 rounded-full`}  
                source={{
                    uri: loggedInProfile.photoURL,
                }} 
                
                />

               <Image 
               style={tw`h-32 w-32 rounded-full`}
                source={{
                    uri: userSwiped.photoURL, 
                }}
               />

            </View>

            <TouchableOpacity
            style={tw`bg-white m-5 px-10 py-8 rounded-full mt-20`}
            onPress={() => {
            navigation.goBack()
            navigation.navigate("Chat")
            }}
              
            >
                <Text style={tw`text-center`} >Send a Message</Text>

            </TouchableOpacity>
       
        </View>
    );
    }

export default MatchedScreen;
 