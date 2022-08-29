import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import tw from 'tailwind-react-native-classnames'
import { Foundation } from '@expo/vector-icons'
import { Ionicons} from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/core'


const Header = ({ title, callEnabled}) => {
    navigation = useNavigation()
  return (
    <View style={tw.style('p-2 flex-row items-center justify-between bg-opacity-50 ', {opacity: 80})}>
    <View style={tw`flex flex-row items-center`}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={tw`p-2`}>
            <Ionicons name="ios-arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={tw`text-2xl font-bold pl-2`}>{title}</Text>
    </View>
    </View>
  )
}

export default Header