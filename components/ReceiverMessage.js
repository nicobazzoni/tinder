import React from 'react';
import { View, Text,  Image } from 'react-native';
import tw from 'tailwind-react-native-classnames';


const ReceiverMessage = ({ message }) => {
    return (
        <View 
        style={tw`bg-blue-500 rounded-lg rounded-tl-none px-5 py-3 mx-3 ml-14 `}
        >
        <Text style={tw`text white`}>{message.message}</Text>
        
        <Image 
        style={tw`rounded-full h-16 w-16 mr-4`}
        source={{uri: message.photoURL}}
        
        />
        </View>
    );
}

export default ReceiverMessage;