import { View, Text, 
  SafeAreaView, TextInput, Button, 
  KeyboardAvoidingView, TouchableWithoutFeedback, 
  FlatList, Keyboard, Animated} from 'react-native'

  import React, {useEffect, useRef, useState} from 'react'
import  Header  from '../components/Header'
import useAuth from '../hooks/useAuth'
import getMatchedUserInfo from '../lib/getMatchedUserInfo'
import { useRoute } from '@react-navigation/native'
import tw from 'tailwind-react-native-classnames'

import SenderMessage from '../components/SenderMessage'
import ReceiverMessage from '../components/ReceiverMessage'
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase'



const MessageScreen = () => {

  
    
  
    const { params } = useRoute();
    const { user} = useAuth();
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    
   const { matchDetails } = params;

   useEffect(
    () => 
    onSnapshot(
      query(
      collection(db, "matches", matchDetails.id, "messages"), 
      orderBy('timestamp', 'desc' )
      ), 
      (snapshot) => 
        setMessages(
         snapshot.docs.map((doc) => ({
           id: doc.id,
          ...doc.data(),
        }))
      
       )
    ),
      [matchDetails, db]
      
      );
   

    const sendMessage = () => {  
      addDoc(collection(db, 'matches', matchDetails.id, 'messages'), {
        timestamp: serverTimestamp(),
        userId: user.uid,
        displayName: user.displayName,
        photoURL: matchDetails.users[user.uid].photoURL,
        message: input,
      });

      setInput("")

    }
  

return (
  
    <SafeAreaView style={tw`flex-1 `} > 
        <Header 
       
        title={getMatchedUserInfo(matchDetails?.users, user.uid).displayName} 
        />
         
       
        <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={tw`flex-1`}
        keyboardVerticalOffset={10}
        
        
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}> 
          
          <FlatList 
          
          
          data={messages}
          inverted={-1}
          style={tw`pl-4`}
          keyExtractor={(item) => item.id}
          renderItem={({ item: message }) => 
          message.userId === user.uid ? (
            <SenderMessage key={message.id} message={message} />
          ) : (
            <ReceiverMessage key={message.id} message={message} />
          )} 

          
          />
          </TouchableWithoutFeedback>
      
  

      <View style={tw`flex-row justify-between bg-white items-center border-t border-gray-200 px-5 py-2`} >
        <TextInput 
        style={tw`h-10 text-lg`}
        placeholder="Send Message..."  
        onChangeText={setInput}
        onSubmitEditing={sendMessage}
        value={input}
        
        

        />
        <Button onPress={sendMessage} title="Send" />
      </View>
      </KeyboardAvoidingView>
     
    </SafeAreaView>

    
  )
}

export default MessageScreen