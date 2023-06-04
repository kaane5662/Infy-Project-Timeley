import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TextInput, Image, Button, Pressable as TouchableOpacity, Alert, Pressable, Platform, RefreshControl, FlatList } from 'react-native';
import React, { useRef, useState, useEffect} from 'react';
import {NavigationContainer, useIsFocused} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { initializeApp } from 'firebase/app';

import { getFirestore, collection, getDocs, getDoc, doc, setDoc, updateDoc, arrayUnion, addDoc, query, where, Timestamp, arrayRemove } from 'firebase/firestore';
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut} from "firebase/auth";
import OneEvent from '../OneEvent';
import Task from '../Task';


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




export default HomePage = ({navigation}) => {
    
    // let isFocused = useIsFocused()
    
    
    useEffect(() => {
        console.log("Welcome back")
        setTasks([])
        setEvents([])
        isFocused = false
        onAuthStateChanged(auth, (user) => {
            // console.log(user)
            if (user) {
                // console.log(user.uid)
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/auth.user
                // console.log(user.uid)
                uid = user.uid;
                getUserData(uid)
                // ...
            } else {
                // User is signed out
                // ...
            }
        });
    }, []);


    const getUserData = async (uid) =>{
        const userDocRef = doc(db, "Accounts", uid)
        const userDocSnap = await getDoc(userDocRef)
        const userDocData = userDocSnap.data()
        const userTasks = userDocData.Tasks
        const userEvents = userDocData.Events
        const userName = userDocData.username
        let userNameCopy = userName.split("@")
        setName(userNameCopy[0])
        //get the last 3 tasks
        let tasksCopy = []
        for(var i = userTasks.length-1; i>=0; i--){
            tasksCopy.push(userTasks[i])
            if(i == userTasks.length-3){
                break;
            }
        }
        setTasks(tasksCopy)
        //get the last 3 events
        let eventsCopy = []
        for(var i = userEvents.length-1; i>=0; i--){
            eventsCopy.push(userEvents[i])
            if(i == userEvents.length-3){
                break;
            }
        }
        setEvents(eventsCopy)

    }
    // if(isFocused){
    //     getUserData(auth.currentUser.uid)
    // }

    async function removeTask(index, taskObj){
        console.log(index)
        const userDocRef = doc(db, "Accounts", auth.currentUser.uid)
        await updateDoc(userDocRef, {Tasks: arrayRemove(taskObj)})
        let TasksCopy = [...Tasks]
        TasksCopy.splice(index,1)
        setTasks(TasksCopy)
    }

    const signOutUser = async () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            console.log("Has signed out")
            navigation.navigate("Login")
          }).catch((error) => {
            // An error happened.
        });
    }

    const [getName, setName] = useState("")
    const [Tasks, setTasks] = useState([])
    const [GetEvents, setEvents] = useState([])



    return(
        
        <View style = {styles.main} onRefresh = {() => navigation.navigate("Home")}>
            <View style = {styles.top}>

            <ScrollView horizontal = {true} refreshControl={<RefreshControl refreshing = {false} onRefresh={()=> getUserData(auth.currentUser.uid)}></RefreshControl>}>
            <Text style = {styles.welcome}>Welcome {getName}!</Text>
            <TouchableOpacity style = {styles.logOutButton} onPress={()=> signOutUser()}>
                <Text style = {styles.logOutText}>🚪</Text>
            </TouchableOpacity>
            </ScrollView>

            </View>
            <Text style = {styles.taskSnap}>Recent Tasks</Text>
            
            <ScrollView style = {styles.taskScroll}>
            {
                Tasks.map((task, index)=>{
                    return(
                        <Task onPress taskText = {task.task} type = {task.type} func = {removeTask} index = {index} taskObj = {task}></Task>
                    )
                })
        }
            </ScrollView>
            <Text style = {styles.taskSnap}>Recent Events</Text>
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
            <View style = {styles.bottom}>
                <TouchableOpacity style = {styles.iconButton} onPress={()=> navigation.navigate("Tasks")}>
                    <Text style = {styles.iconText} >📝</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity style = {styles.iconButton} onPress={()=> navigation.navigate("Home")}>
                    <Text style = {styles.iconText}>🔄</Text>
                </TouchableOpacity> */}
                <TouchableOpacity style = {styles.iconButton} onPress={()=> navigation.navigate("Events")}>
                    <Text style = {styles.iconText}>📅</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        padding: 10,
      
    },
    welcome: {
        fontWeight: 'bold',
        fontSize: 32,
        padding: 10
    },
    taskSnap: {
        fontWeight: '600',
        fontSize: 20,
        padding: 10

    },
    taskScroll: {
        alignSelf: 'center',
        height: 200,
        width: 400,
        
    },
    eventScroll: {
        alignSelf: 'center',
        height: 300,
        width: 'auto',
        alignContent: 'center',
    },
    bottom: {
        flexDirection:'row',
        
        height: 'auto',
        width: 'auto',
        alignSelf: 'center',
        bottom: 0,
        alignItems: 'center',
        // backgroundColor:'red'
        padding: 20,
    },
    iconButton: {
        height: 45,
        width: 45,
        backgroundColor: 'rgb(255,165,0)',
        borderRadius: 15,
        justifyContent: 'center',
        marginLeft: 50,
        marginRight: 50,
        alignItems: 'center'
    },
    iconText: {
        fontSize: 25,
        textAlign: 'center',
        color: 'white'
    },
    top:{
        flexDirection: 'row'
    },
    logOutButton: {
        justifyContent: 'center',
        alignContent: 'center',
        width: 40,
        height: 40,
        borderRadius: 15,
        backgroundColor: "rgb(255,165,0)",
        alignSelf: 'center'
    },
    logOutText: {
        fontSize: 20,
        textAlign: 'center'
    }


})