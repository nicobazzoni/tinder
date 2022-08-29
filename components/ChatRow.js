import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import useAuth from '../hooks/useAuth'
import getMatchedUserInfo from '../lib/getMatchedUserInfo'
import tw from 'tailwind-react-native-classnames'


const ChatRow = ({ matchDetails }) => {

    const navigation = useNavigation()
    const {user} = useAuth()
    const [matchedUserInfo, setMatchedUserInfo]= useState(null)

    useEffect(() => {
        setMatchedUserInfo(getMatchedUserInfo( matchDetails.users, user.uid))
    }, [matchDetails, user])


  return (
    <TouchableOpacity 
    style={tw`flex-row items-center bg-indigo-200  mx-3 px-5 py-3 shadow-xl `} 
    onPress={() => navigation.navigate('Message', {
      })}
    >
      
      <Image  
        style={tw`rounded-full h-16 w-16 mr-4`}
        source={{uri: matchedUserInfo?.photoURL}}
        />

        <View>
            <Text style={tw`text-xl font-bold`}>{matchedUserInfo?.displayName}</Text>
           <Text>Say Hi!</Text>
        </View>
    </TouchableOpacity>
  )
}

export default ChatRow