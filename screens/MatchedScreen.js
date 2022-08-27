import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import tw from 'tailwind-react-native-classnames';
const MatchedScreen = () => { 
    const navigation = useNavigation()
    const { params } = useRoute()

    const {loggedInProfile, matchedProfile} = params
    
    return (
        <View style={tw`h-full bg-red-500 pt-20 opacity-5`  }>
            <View style={tw`flex-1 flex justify-center items-center`}></View>
       
        </View>
    );
    }

export default MatchedScreen;
 