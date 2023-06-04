import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TextInput, Image, Button, Pressable as TouchableOpacity, Alert, Pressable, Platform } from 'react-native';
import React, { useRef, useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { initializeApp } from 'firebase/app';

import { getFirestore, collection, getDocs, getDoc, doc, setDoc, updateDoc, arrayUnion, addDoc, query, where, Timestamp } from 'firebase/firestore';
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged} from "firebase/auth";
import OneEvent from '../OneEvent';
// import DateTimePickerModal from "react-native-modal-datetime-picker";


//const birthday = new Date("1995-12-17T03:24:00");
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

export default EventsPage = ({navigation})=>{

    const [GetEvents, setEvents] = useState([])
    const [getTitle, setTitle] = useState("")
    const [getDesc, setDesc] = useState("")
    const [getDate, setDate] = useState("")
    const [getTime, setTime] = useState("")


    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            // console.log(user)
            if (user) {
                console.log(user.uid)
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/auth.user
                // console.log(user.uid)
                uid = user.uid;
                getUserEvents(uid)
                // ...
            } else {
                // User is signed out
                // ...
            }
        });
    }, []);

    const getUserEvents = async (uid) => {
        const userDocRef = doc(db, "Accounts", uid)
        const userDocSnap = await getDoc(userDocRef)
        const userDocData = userDocSnap.data()
        const userEvents = userDocData.Events
        console.log(userEvents)
        setEvents(userEvents)
        
    }

    const addUserEvent = async () =>{
        const userDocRef = doc(db,"Accounts", auth.currentUser.uid)
        const date = new Date(getDate+"T"+getTime+":00")
        const newEventObj = {
            title: getTitle,
            description: getDesc,
            time: Timestamp.fromDate(date)
        }
        setEvents([...GetEvents, newEventObj])
        await updateDoc(userDocRef, {Events: arrayUnion(newEventObj)})
    }

    return(
        
        <View style = {styles.main}>
            <View style = {styles.top}>

            
            <TextInput style = {styles.dateInput} defaultValue='' onChangeText= {text => setDate(text)} placeholder='Date: ####-##-##'></TextInput>
            <TextInput style = {styles.timeInput} defaultValue='' onChangeText= {text => setTime(text)} placeholder='Time: ##:##'></TextInput>
            </View>
            <TextInput style = {styles.taskTitle} defaultValue='' onChangeText= {text => setTitle(text)} placeholder='Title'></TextInput>
            <TextInput style = {styles.taskDesc} defaultValue='' onChangeText= {text => setDesc(text)} placeholder='Description'></TextInput>
            <TouchableOpacity style = {styles.addButton} onPress = {()=> addUserEvent()}>
                <Text style = {styles.plus}>+</Text>
            </TouchableOpacity>
            <ScrollView style = {styles.eventScroll}>
                {
                    GetEvents.map((oneEvent, index)=>{
                        //#region times
                        let date = oneEvent.time.toDate().toLocaleDateString().split("/")
                        let time = oneEvent.time.toDate().toLocaleTimeString().split(":")
                        let timeZo = oneEvent.time.toDate().toLocaleTimeString().split(" ")
                        //#endregion times
                        return(
                            <OneEvent eventTitle = {oneEvent.title} eventDescription = {oneEvent.description} eventDate = {date[0]+"/"+date[1]} eventTime = {time[0]+":"+time[1]+" "+timeZo[1]}></OneEvent>
                        )
                        
                    })
                }
            </ScrollView>
        </View>
       
    )
}

const styles = StyleSheet.create({
    main: {
        padding: 20,
        alignContent: "center",
        alignItems: "center"
    }, 
    top: {
        flexDirection: 'row'
    },
    dateInput: {
        justifyContent: 'center',
        width: '50%',
        borderColor: 'rgba(0,0,0,0.1)',
        borderStyle: 'solid',
        height: 50,
        backgroundColor: 'white',
        borderWidth: 2,
        borderRadius: 15,
        fontSize: 18,
        paddingLeft: 10,
        marginRight: 10,
        marginBottom: 10
    },
    timeInput: {
        justifyContent: 'center',
        width: '35%',
        borderColor: 'rgba(0,0,0,0.1)',
        borderStyle: 'solid',
        height: 50,
        backgroundColor: 'white',
        borderWidth: 2,
        borderRadius: 15,
        fontSize: 18,
        paddingLeft: 10,
    },
    taskTitle: {
        justifyContent: 'center',
        width: '50%',
        borderColor: 'rgba(0,0,0,0.1)',
        borderStyle: 'solid',
        height: 50,
        backgroundColor: 'white',
        borderWidth: 2,
        borderRadius: 15,
        fontSize: 18,
        paddingLeft: 10,
        marginBottom: 10
    },
    taskDesc: {
        justifyContent: 'center',
        width: '100%',
        borderColor: 'rgba(0,0,0,0.1)',
        borderStyle: 'solid',
        height: 50,
        backgroundColor: 'white',
        borderWidth: 2,
        borderRadius: 15,
        fontSize: 18,
        paddingLeft: 10,
        marginBottom: 10
    },
    addButton:{
        justifyContent: 'center',
        width: 50,
        height: 50,
        backgroundColor: 'rgb(255,165,0)',
        marginBottom: 10,
        borderRadius: 15
    },
    plus: {
        textAlign: 'center',
        fontSize: 30,
        color: 'white'
    },
    eventScroll: {
        height: 450,
        width: 'auto'
    }
  })