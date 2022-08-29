import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import useAuth from '../hooks/useAuth'
import getMatchedUserInfo from '../lib/getMatchedUserInfo'
import tw from 'tailwind-react-native-classnames'
import { onSnapshot, orderBy, query, collection } from 'firebase/firestore'
import { db } from '../firebase'


const ChatRow = ({ matchDetails}) => {

    const navigation = useNavigation();
    const { user } = useAuth();
    const [matchedUserInfo, setMatchedUserInfo] = useState(null)
    const [lastMessage, setLastMessage] = useState('')

    useEffect(() => {
        setMatchedUserInfo(getMatchedUserInfo( matchDetails.users, user.uid))
    }, [matchDetails, user])

    useEffect(() => onSnapshot(
      query(
        collection(db, 'matches', matchDetails.id, 'messages')),
        orderBy('timestamp', 'desc'),
        snapshot => setLastMessage(snapshot.docs[0]?.data()?.message)
    ),
    
    [matchDetails, db]
    )

  return (
    <TouchableOpacity 
    style={tw`flex-row items-center bg-indigo-200  mx-3 px-5 py-3 shadow-xl `} 
    onPress={() => navigation.navigate('Message', {
        matchDetails,
      })}
    >
      
      <Image  
        style={tw`rounded-full h-16 w-16 mr-4`}
        source={{uri: matchedUserInfo?.photoURL}}
        />

        <View>
            <Text style={tw`text-xl font-bold`}>{matchedUserInfo?.displayName}</Text>
           <Text>{lastMessage || 'say hi'}</Text>
        </View>
    </TouchableOpacity>
  )
}

export default ChatRow