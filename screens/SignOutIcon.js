import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TextInput, Image, Button, Pressable as TouchableOpacity, Alert } from 'react-native';
import React, { useRef, useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, getDoc, doc, setDoc, updateDoc, arrayUnion, addDoc, query, where } from 'firebase/firestore';
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBuE6TDCS9KQw5XlsbPPfbxnBalE71yWek",
    authDomain: "timeleyapp.firebaseapp.com",
    projectId: "timeleyapp",
    storageBucket: "timeleyapp.appspot.com",
    messagingSenderId: "373925263620",
    appId: "1:373925263620:web:49531ab9f022bbb1b27851",
    measurementId: "G-9JL86RB90E"
  };

const app = initializeApp(firebaseConfig)
const auth = getAuth()





export default SignOutIcon = ({navigation})=>{

    const signOutUser =() =>{
        console.log("Very cool thing:"+auth.currentUser.email)
        signOut(auth).then(() => {
            // Sign-out successful.
            console.log("Has signed out")
            navigation.navigate("Login")
          }).catch((error) => {
            // An error happened.
          });
    }

    return(
        <View>
            <Button style = {styles.button} onPress={()=> signOutUser()} title = "Sign Out"></Button>
        </View>
    )
}

const styles = StyleSheet.create({
  button: {
    textAlign: 'right',
    
  }
})