import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TextInput, Image, Button, Pressable as TouchableOpacity, Alert, Pressable } from 'react-native';
import React, { useRef, useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, getDoc, doc, setDoc, updateDoc, arrayUnion, addDoc, query, where } from 'firebase/firestore';
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged} from "firebase/auth";

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
const db = getFirestore(app)



export default SignUp = ({navigation}) => {

    const [getPass, setPass] = useState("")
    const [getRePass, setRePass] = useState("")
    const [getEmail, setEmail] = useState("")
    const [errMsg, setErrMsg] = useState('')

    
    async function createUserDocument(userID){
        const userObject = {
            username: getEmail,
            password: getPass,
            Tasks: [],
            Events: []
        }
        const colRef = doc(db, "Accounts", userID)
        await setDoc(colRef, userObject)
        navigation.navigate("Home")
    }
    
    function createAccount(){
        setErrMsg("")
        if(getPass != getRePass){
            setErrMsg("Passwords must match")
            return
        }
        createUserWithEmailAndPassword(auth, getEmail, getPass)
        .then((cred) => {
        // Signed in 
            const userID = cred.user.uid;
            console.log("Created user: "+userID)
            createUserDocument(userID)
        })
        .catch((error) => {
            console.log(error.message)
            if(error.message == "Firebase: Error (auth/email-already-in-use)."){
                setErrMsg("Email already in use")
            }
            if(error.message == "Firebase: Error (auth/invalid-email)."){
                setErrMsg("Invalid Email")
            }
            if(error.message == "Firebase: Password should be at least 6 characters (auth/weak-password)."){
                setErrMsg("Password must be at least 6 characters")
            }

        });
    }

    return (
        <View style = {styles.main}>
            <Text style = {styles.errorMessage}>{errMsg}</Text>
            <TextInput style = {styles.inputs} onChangeText={text => setEmail(text)} defaultValue='' placeholder='Email' ></TextInput>
            <TextInput style = {styles.inputs} secureTextEntry={true} onChangeText={text => setPass(text)} defaultValue='' placeholder='Password' ></TextInput>
            <TextInput style = {styles.inputs} secureTextEntry={true} onChangeText={text => setRePass(text)} defaultValue='' placeholder='Confirm Password' ></TextInput>
            <Text style = {styles.logIn} onPress={() => navigation.navigate('Login')}>Login</Text>
            <Pressable style = {styles.button} onPress={()=> createAccount()}>
                <Text style = {styles.signUpText}>Sign Up</Text>
            </Pressable>
            
        </View>
    );
};

const styles = StyleSheet.create({
    main:{
        padding: 20,
        alignContent: 'center',
        alignItems: 'center'
    },
    inputs: {
    backgroundColor: "white", 
    borderColor:"rgba(0,0,0,.2)", 
    borderWidth: 2, 
    height: 40, 
    width: "100%",
    borderRadius: 5,
    fontSize: 18,
    marginBottom: 15,
    marginTop: 15,
    paddingLeft: 10
    },
    button: {
        height: 40,
        width: '100%',
        backgroundColor: 'rgb(255,165,0)',
        borderRadius: 10,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    signUpText: {
        color: 'white',
        fontSize: 22.5,
        textAlignVertical: 'center',
    },
    errorMessage: {
        fontSize: 17.5,
        color: 'red',
        fontWeight: 'bold'
    },
    logIn: {
        fontSize: 17.5,
        marginBottom: 10,
        textDecorationLine: 'underline',
        color: 'rgb(255,165,0)'
    }
  })