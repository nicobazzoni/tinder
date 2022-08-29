import { View, Text, SafeAreaView } from 'react-native'
import React, {useState} from 'react'
import  Header  from '../components/Header'
import useAuth from '../hooks/useAuth'
import getMatchedUserInfo from '../lib/getMatchedUserInfo'
import { useRoute } from '@react-navigation/native'

const MessageScreen = ({matchDetails}) => {
    const { params } = useRoute();
    const { user} = useAuth();
    const [input, setInput] = useState('');
    


   
 
  return (
    <SafeAreaView> 
        <Header 
        title={getMatchedUserInfo(matchDetails?.users, user.uid).displayName} />
      <Text>MessageScreen</Text>
    </SafeAreaView>
  )
}

export default MessageScreen