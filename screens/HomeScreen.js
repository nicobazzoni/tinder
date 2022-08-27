import { StyleSheet, Text, View, Button, SafeAreaView, TouchableOpacity, Image } from 'react-native'
import React, {useEffect, useLayoutEffect, useRef, useState} from 'react'
import { useNavigation } from '@react-navigation/native'
import useAuth from '../hooks/useAuth'
import tw from 'tailwind-react-native-classnames'
import  Swiper from 'react-native-deck-swiper'
import {AntDesign, Entypo, Ionicons} from '@expo/vector-icons'
import { collection, doc, onSnapshot, query ,setDoc, where, getDocs} from 'firebase/firestore'
import { db } from '../firebase'

 
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
     const [profiles, setProfiles] = useState([])
    const navigation = useNavigation()

    const swipeRef = useRef(null)

    console.log(user)
    const cardIndex = useRef(0)

    useLayoutEffect(() => { 
      const unsub = onSnapshot(doc(db, 'users', user.uid), (snapshot) => {
        console.log(snapshot)
      if (!snapshot.exists()) {
        navigation.navigate("Modal")
      }
    })
    return unsub()
     
}, []
);

   useEffect(() => {
    let unsub;
   
    const fetchCards = async () => {

      const passes = await getDocs(collection(db, 'users', user.uid, 'passes')).
      then((snapshot) => snapshot.docs.map((doc) => doc.id)) 

      const swipes = await getDocs(collection(db, 'users', user.uid, 'swipes')).then(
        (snapshot) => snapshot.docs.map((doc) => doc.id)
      )

      const passedUserIds = passes.length > 0 ? passes : ['test'];
      const swipedUserIds = swipes.length > 0 ? swipes : ['test'];
      unsub = onSnapshot(
        //only shows poeple you havent passed on by excluding ones
        query(collection(db, 'users'), where('id', 'not-in', [...passedUserIds, ...swipedUserIds] ) ),
        (snapshot) => {
        setProfiles(
          snapshot.docs
          .filter((doc) => doc.id !== user.uid)
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
        
          })) 
       )
        }
      )
    }
  

    fetchCards()
    return unsub
   }, [db])

const swipeLeft = (cardIndex) => { 
  if (!profiles[cardIndex]) return

  const userSwiped = profiles[cardIndex]
  console.log(`you swiped pass on ${userSwiped.displayName}`)

  setDoc(doc(db, 'users', user.uid,'passes', userSwiped.id),  //users swiped data is loggede in firebase
  userSwiped)
}
const swipeRight = async (cardIndex) => { 
  if (!profiles[cardIndex]) return
  const userSwiped = profiles[cardIndex]
  console.log(`you swiped match on ${userSwiped.displayName}`)
  setDoc(doc(db, 'users', user.uid,'swipes', userSwiped.id),  //users swiped data is loggede in firebase
  userSwiped)
}

  return (
    <SafeAreaView  style={tw`flex-1`}  >
       <View style={tw` flex-row items-center justify-between px-5`}>
        <TouchableOpacity onPress={logout} >
          <Image  
          style={tw`h-10 w-10 rounded-full `}
          source={{uri: user.photoURL}} />
        </TouchableOpacity>
      

       <TouchableOpacity onPress={() => navigation.navigate("Modal")} >
        <Image  style={tw`h-14 w-14 rounded-full pt-2`} source={require("../tinder.jpeg")} />
       </TouchableOpacity> 

       <TouchableOpacity style={tw``} onPress={() => navigation.navigate("Chat")} >
        <Ionicons name="chatbubbles-sharp" size={30} color="#FF5864" />
       </TouchableOpacity>
       </View>

        <View style={tw`flex-1 -mt-6`}> 
        
          <Swiper  
          ref={swipeRef}
          containerStyle={{ backgroundColor: "transparent"}}
          cards={profiles} 
          cardIndex={0}
          stackSize={5}
          animateCardOpacity={true}
          verticalSwipe={false}
          backgroundColor={'#4FD0E9'}
          onSwipedLeft={(cardIndex) => {
            console.log("swipe pass")
            swipeLeft(cardIndex)
          }}
          onSwipedRight={(cardIndex) => {
            console.log("swipe MATCH")
            swipeRight(cardIndex)
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

          renderCard={(card) => card ? (
        <View 
        key={card.id} style={tw`relative bg-white h-3/4 rounded-xl`} >
          <Text>{card.id}</Text>
          <Image  
          style={tw`absolute top-0 h-full w-full rounded-xl`}
          source={{ uri: card.photoURL}} 
          />

          <View style={tw`absolute bg-white bottom-0 w-full flex-row 
          justify-between items-center h-20 px-6 py-2 rounded-b-xl shadow-xl`} >
            <View>
                  <Text style={tw`text-xl font-bold`} >
                      {card.displayName}
                  </Text>
                
                <Text>{card.job}</Text>
            </View>
                <Text style={tw`text-2xl font-bold`} >{card.age}</Text>
            
            </View>
        </View>
         //ternirary = otherwise show 'no profile cards'
          ) : ( 
            <View
              style={tw`relative bg-white h-3/4 rounded-xl justify-center items-center`}
              > 
              <Text style={tw`font-bold pb-5`} > No More profiles </Text>
              <Image 
              style={tw`h-20 w-full`}
              height={100}
              width={100}
              source={{ uri: "https://links.papareact.com/6gb"}} 
              />
              
              
            </View>

          )
          } 
          />
        </View>

        <View style={tw`flex flex-row justify-evenly`}>
          <TouchableOpacity  
          onPress={() => swipeRef.current.swipeLeft()}  
          style={tw`items-center justify-center rounded-full w-16 h-16 bg-red-200`}>
            <Entypo name="cross" size={24} color='red' /> 
          </TouchableOpacity>

          <TouchableOpacity 
           onPress={() => swipeRef.current.swipeRight()}
          
          style={tw`items-center justify-center rounded-full w-16 h-16 bg-green-200`}>
            <AntDesign name="heart" size={24} color='green' />
          </TouchableOpacity>
          
          </View>     

         
    </SafeAreaView>
  )
}

export default HomeScreen

