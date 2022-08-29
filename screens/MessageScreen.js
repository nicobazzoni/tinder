import { View, Text, SafeAreaView } from 'react-native'
import React, {useState} from 'react'
import  Header  from '../components/Header'
import useAuth from '../hooks/useAuth'
import getMatchedUserInfo from '../lib/getMatchedUserInfo'
import { useRoute } from '@react-navigation/native'

const MessageScreen = () => {
    const { params } = useRoute();
    const { user} = useAuth();
    const [input, setInput] = useState('');
    
   const { matchDetails } = params;

   
console.log(getMatchedUserInfo( matchDetails.users, user.uid).displayName)
  return (
    <SafeAreaView> 
        <Header 
        title={getMatchedUserInfo(matchDetails?.users, user.uid).displayName} />
      <Text>MessageScreen</Text>
    </SafeAreaView>
  )
}

export default MessageScreen