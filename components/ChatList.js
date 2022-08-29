import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import tw from 'tailwind-react-native-classnames'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import useAuth from '../hooks/useAuth'
import { db } from '../firebase'
import ChatRow from './ChatRow'


const ChatList = () => {

    const  [matches, setMatches] = useState([]);
    const  {user} = useAuth()
 
    useEffect(
        () => 
        onSnapshot(
            query( 
                collection(db,'matches'),
                where('usersMatched', 'array-contains', user.uid)
            ),
            (snapshot) => 
            setMatches(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }))

            )
        ),
     [user]
     );

     
  return matches.length > 0 ? (
        <FlatList 
        data={matches}
        keyExtractor={(item) => item.id} 
        renderItem={({ item }) => <ChatRow matchDetails={item} /> }
        />
    ) : (
        <View style={tw`p-5`}>
            <Text style={tw`text-xl text-gray-500  text-lg p-2 font-bold`}>
                No matches at the moment</Text>
        </View>
    )
}
    



export default ChatList