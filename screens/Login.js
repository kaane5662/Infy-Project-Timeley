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


export default Login = ({navigation}) => {


    const [getPass, setPass] = useState("")
    const [getEmail, setEmail] = useState("")
    const [errMsg, setErrMsg] = useState('')
    
    
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            // console.log(user)
            
            if (user) {
                console.log(user.uid)
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/auth.user
                // console.log(user.uid)
                navigation.navigate("Home")
                // ...
            } else {
                // User is signed out
                // ...
            }
        });
    }, []);

    const loginUser = async ()=>{
        setErrMsg('')
        signInWithEmailAndPassword(auth, getEmail, getPass)
        .then((userCredential) => {
            // Signed in 
            navigation.navigate('Home')
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            if(errorMessage == "Firebase: Error (auth/wrong-password)."){

                setErrMsg("Incorrect email or password")
            }
            if(errorMessage == "Firebase: Error (auth/invalid-email)."){
                setErrMsg("Invalid Email")
            }
            if(errorMessage == "Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests)."){
                setErrMsg("Too many failed login attempts. Come back later.")
            }
            if(error.message == "Firebase: Error (auth/user-not-found)."){
                setErrMsg("User does not exist")
            }
            console.log(errorMessage)
        });
    }

    return (
        <View style = {styles.main}>
            <Text style = {styles.errorMessage}>{errMsg}</Text>
            <TextInput style = {styles.inputs} onChangeText={text => setEmail(text)} defaultValue='' placeholder='Email' ></TextInput>
            <TextInput style = {styles.inputs} secureTextEntry={true} onChangeText={text => setPass(text)} defaultValue='' placeholder='Password' ></TextInput>
            <Text style = {styles.signUp} onPress={() => navigation.navigate('SignUp')}>Sign Up</Text>
            <Pressable style = {styles.button} onPress={()=> loginUser()}>
                <Text style = {styles.loginText}>Login</Text>
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
    loginText: {
        color: 'white',
        fontSize: 22.5,
        textAlignVertical: 'center',
    },
    errorMessage: {
        fontSize: 17.5,
        color: 'red',
        fontWeight: 'bold'
    },
    signUp: {
        fontSize: 17.5,
        marginBottom: 10,
        textDecorationLine: 'underline',
        color: 'rgb(255,165,0)'
    }
  })