import React from 'react';
import { View, Text, Button, ImageBackground, TouchableOpacity } from 'react-native';
import tw from 'tailwind-react-native-classnames'

const SenderMessage = ({message}) => {
    return (
        <View 
        style={tw`bg-indigo-500 rounded-lg rounded-tr-none px-5 py-3 mx-3 my-2 ` }
        >
        <Text style={tw`text white`}>{message.message}</Text>
        </View>
    );
}

export default SenderMessage; 