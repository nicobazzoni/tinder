import { View, Text } from 'react-native'
import React, { createContext, useContext, useEffect, useState, useMemo } from 'react'
import * as Google from 'expo-google-app-auth';
import {
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithCredential,
    signOut,
} from '@firebase/auth'
import { auth } from '../firebase';

const config = {
    androidClientId: '1022600936103-4v43jts22c86is1ts1kumbgn0r0j05a1.apps.googleusercontent.com',
    iosClientId: '1022600936103-06pdn27vb61g2pdfnthmelmdhfb4tk29.apps.googleusercontent.com',
    scopes: ['profile', 'email'],
    permissions: ["public_profile", "email", "gender", "location"],
}
const AuthContext = createContext({});

export const AuthProvider = ({ children }) => { 

    const [error, setError] =useState(null)
    const [user, setUser] = useState(null)
    const [loadingInitial, setLoadingInitial] = useState(true)
    const [loading, setLoading] = useState(false)
    
    
    useEffect(
        () =>
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user)
            } else {
                setUser(null)
            }
            setLoadingInitial(false)
            }),
            
        []
    )
       const logout = () => {
        setLoading(true)
        signOut(auth).catch((error) => setError(error))
        .finally(() => setLoading(false))
    }
       

     const signInWithGoogle = async () => { 

        setLoading(true)
         await Google.logInAsync(config).then(async (logInResult) => {
            if(logInResult.type === 'success') {
                const { idToken, accessToken} = logInResult;
                const credential = GoogleAuthProvider.credential(idToken, accessToken)
                  await signInWithCredential(auth, credential)
            }

           return Promise.reject()
        }).catch(error => setError(error))
        .finally(() => setLoading(false))
    }
    //cache the user object in a memoized variable to avoid re-rendering the whole app when the user changes
    const memoedValue = useMemo(() => ({
        user,
        loading,
        error,
        
        signInWithGoogle,
        logout,
    }), [user, loading, error,])

  return (
    <AuthContext.Provider 
    value={memoedValue}>
    
      {!loadingInitial && children}
    </AuthContext.Provider>
  )
}
//hook pattern to access the context
export default function useAuth() {
    return useContext(AuthContext);
}