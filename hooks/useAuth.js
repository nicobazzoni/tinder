import { View, Text } from 'react-native'
import React, { createContext, useContext } from 'react'
import * as Google from 'expo-google-app-auth';
import {
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithCredential,
    signOut,
} from 'firebase/compat/auth'
import { auth } from '../firebase';

const config = {
    androidClientId: '1022600936103-4v43jts22c86is1ts1kumbgn0r0j05a1.apps.googleusercontent.com',
    iosClientId: '1022600936103-06pdn27vb61g2pdfnthmelmdhfb4tk29.apps.googleusercontent.com',
    scopes: ['profile', 'email'],
    permissions: ["public_profile", "email", "gender", "location"],
}
const AuthContext = createContext({});

export const AuthProvider = ({ children }) => { 

    const signInWithGoogle = async () => { 
        await Google.logInAsync(config).then(async (logInResult) => {
            if(logInResult.type === 'success') {
                const { idToken, accessToken} = logInResult;
                const credential = GoogleAuthProvider.credential(idToken, accessToken)
                  await signInWithCredential(auth, credential)
            }

           return Promise.reject()
        })
    }

  return (
    <AuthContext.Provider 
    value={{
        user: null,
        signInWithGoogle,
    }}
    >
      {children}
    </AuthContext.Provider>
  )
}
//hook pattern to access the context
export default function useAuth() {
    return useContext(AuthContext);
}