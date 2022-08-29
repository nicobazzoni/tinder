import React, { useRef } from 'react';
import { View, Text, Animated,  Image, StyleSheet, Button, SafeAreaView} from 'react-native';
import tw from 'tailwind-react-native-classnames';


const ReceiverMessage = ({ message }) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;

    const fadeIn = () => {
      // Will change fadeAnim value to 1 in 5 seconds
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 5000,
      }).start();
    };
  
    const fadeOut = () => {
      // Will change fadeAnim value to 0 in 3 seconds
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 3000,
      }).start();
    };
    return (
        <View 
        style={tw.style(`bg-blue-500 rounded-lg rounded-tl-none px-3 py-4 mx-3 ml-14 p-5 mb-5
        
         `, 
        {alignSelf: 'flex-start' , borderRadius: 10}) }
        >
        <Text style={tw`text-white`}>{message.message}</Text>
        
        <Image 
        style={tw`h-12 w-12 rounded-full absolute top-0 -left-14 `}
        source={{uri: message.photoURL}}
        
        /> 
        </View>
    );
}

export default ReceiverMessage;