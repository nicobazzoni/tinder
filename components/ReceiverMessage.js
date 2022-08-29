import React from 'react';
import { View, Text,  Image } from 'react-native';
import tw from 'tailwind-react-native-classnames';


const ReceiverMessage = ({ message }) => {
    return (
        <View 
        style={tw.style(`bg-blue-500 rounded-lg rounded-tl-none px-5 py-3 mx-3 ml-14 `, 
        {alignSelf: 'flex-start'}) }
        >
        <Text style={tw`text white`}>{message.message}</Text>
        
        <Image 
        style={tw`h-12 w-12 rounded-full absolute top-0 -left-14`}
        source={{uri: message.photoURL}}
        
        />
        </View>
    );
}

export default ReceiverMessage;