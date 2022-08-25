import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import tw from 'tailwind-react-native-classnames';
import  useAuth from '../hooks/useAuth'
const ModalScreen = () => {

    const { user } = useAuth()
    const [image, setImage] = useState()
    const [job, setJob] = useState()
    const [age, setAge] = useState()

    const incompleteForm = !image || !job || !age;
  return (
    <View  style={tw`flex-1 items-center pt-1`}>
        <Image 
        style={tw`h-20 w-full`}
        resizeMode="contain"
        source={{uri: user.photoURL}}
        
        />
        
        
      <Text style={tw`text-xl text-gray-500  p-2 font-bold`} >
        Hi {user.displayName}
      </Text>

      <Text style={tw`text-2xl p-4 text-red-500 font-bold`} >
      Profile Pic
      </Text>
      <TextInput
     
      onChangeText={text => setImage(text)}
       style={tw`text-center text-xl pb-2`}
      placeholder= "Enter a profile pic URL"  
      />

      <Text style={tw`text-2xl p-4 text-red-500 font-bold`} >
       Job
      </Text>
      <TextInput
      value={job}
      onChangeText={text => setJob(text)}
      placeholder= "What do you do?"
      />
       
       <Text style={tw`text-2xl p-4 text-red-500 font-bold`} >
      Age
      </Text>
      <TextInput
      value={age}
        onChangeText={text => setAge(text)}
      style={tw`text-center text-xl pb-2 font-bold`} 
      placeholder="Enter your age"
      maxLength={2}

       />
      

      <TouchableOpacity 
      disabled={incompleteForm}
      style={tw`w-64 p-3 rounded-xl absolute bottom-10 `}>
        <Text style={[tw`text-center p-4 text-black font-bold`, 
        incompleteForm ? (tw`bg-gray-400 `) : (tw`bg-red-400`)]} > UPDATE PROFILE</Text>
      </TouchableOpacity>

    
    </View>
  )
}

export default ModalScreen