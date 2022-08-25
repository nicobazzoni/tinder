import { StyleSheet, Text, View, Button, SafeAreaView, TouchableOpacity, Image } from 'react-native'
import React, {useLayoutEffect, useRef} from 'react'
import { useNavigation } from '@react-navigation/native'
import useAuth from '../hooks/useAuth'
import tw from 'tailwind-react-native-classnames'
import  Swiper from 'react-native-deck-swiper'
import {antDesign, Entypo, Ionicons} from '@expo/vector-icons'


const DUMMY_DATA = [
  {
    FirstName: "Nico",
    LastName: "Sanchez",
    job: "the dude",
    photoURL: "https://i.scdn.co/image/ab6761610000e5eb2456028aa8bc6583accf3790",
    age: 40,
    id: 123,
  },
  {
    FirstName: "Tina",
    LastName: "Turner",
    job: "singer",
    photoURL: "https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTgwNTMwNjYzNjg0ODQyODU2/tina-turner.jpg",
    age: 40,
    id: 456,
  },

];




const HomeScreen = () => {
    const {user,logout} = useAuth()

    const navigation = useNavigation()

    const swipeRef = useRef(null)

    console.log(user)

    useLayoutEffect(() => { 
        navigation.setOptions({
        headerShown: false,
    })
}, [])

  return (
    <SafeAreaView  style={tw`flex-1`}  >
       <View style={tw` flex-row items-center justify-between px-5`}>
        <TouchableOpacity   onPress={logout} >
          <Image 
          style={tw`h-10 w-10 rounded-full `}
          source={{uri: user.photoURL}} />
        </TouchableOpacity>
      

       <TouchableOpacity>
        <Image  style={tw`h-14 w-14 rounded-full`} source={require("../tinder.jpeg")} />
       </TouchableOpacity> 

       <TouchableOpacity style={tw``} onPress={() => navigation.navigate("Chat")} >
        <Ionicons name="chatbubbles-sharp" size={30} color="#FF5864" />
       </TouchableOpacity>
       </View>

        <View style={tw`flex-1 -mt-6`}> 
        
          <Swiper  
          ref={swipeRef}
          containerStyle={{ backgroundColor: "transparent"}}
          cards={DUMMY_DATA} 
          cardIndex={0}
          stackSize={5}
          animateCardOpacity={true}
          verticalSwipe={false}
          backgroundColor={'#4FD0E9'}
          onSwipedLeft={() => {
            console.log("swipe pass")
          }}
          onSwipedRight={() => {
            console.log("swipe MATCH")
          }}
          overlayLabels={{
            left: {
              title: 'NOPE',
              style: {
                label: {
                  textAlign: "right",
                  color: "red",
                },
            },
          },
          right: { 
           title: 'MATCH',
          style: {
            label: {
              color: "#4DED30"
            },
          },
        },
      }}

          renderCard={(card) => (
        <View 
        key={card.id} style={tw`relative bg-white h-3/4 rounded-xl`} >
          <Text>{card.FirstName}</Text>
          <Image  
          style={tw`absolute top-0 h-full w-full rounded-xl`}
          source={{ uri: card.photoURL}} 
          />

          <View style={tw`absolute bg-white bottom-0 w-full flex-row 
          justify-between items-center h-20 px-6 py-2 rounded-b-xl shadow-xl`} >
            <View>
                  <Text style={tw`text-xl font-bold`} >
                      {card.FirstName} {card.LastName}
                  </Text>
                
                <Text>{card.job}</Text>
            </View>
                <Text style={tw`text-2xl font-bold`} >{card.age}</Text>
            
            </View>

            </View>

          )} />
        </View>
     

         
    </SafeAreaView>
  )
}

export default HomeScreen

