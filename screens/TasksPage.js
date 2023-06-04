import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TextInput, Image, Button, Pressable as TouchableOpacity, Alert, Pressable } from 'react-native';
import React, { useRef, useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, getDoc, doc, setDoc, updateDoc, arrayUnion, addDoc, query, where, arrayRemove } from 'firebase/firestore';
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged} from "firebase/auth";

import Task from '../Task';
import SignOutIcon from './SignOutIcon';
import TaskTypes from '../TaskTypes';

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


export default TasksPage = ({navigation}) =>{



    const [Tasks, setTasks] = useState([])
    const [getTask, addTask] = useState("")
    const [getType, addType] = useState("")
    const [taskTypes, setTaskTypes] = useState([])

    const [getCurrentType, setCurrentType] = useState('')

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            // console.log(user)
            // console.log(user.uid)
            if (user) {
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


    const getUserData = async(uid)=>{
        // console.log("Here is the other uid"+ uid)
        const userDocRef = doc(db, "Accounts", uid)
        const userDocSnap = await getDoc(userDocRef)
        const userDocData = userDocSnap.data()
        const allUserTasks = userDocData.Tasks
        let fetchTypes = {}
        allUserTasks.forEach(element => {
            if(!fetchTypes[element.type]){
                fetchTypes[element.type] = ""
            }
        });
        fetchTypes = Object.keys(fetchTypes)
        // console.log(fetchTypes)
        setTasks(allUserTasks)
        setTaskTypes(fetchTypes)
    }

    const addUserTasks = async()=>{
        console.log("ID: "+auth.currentUser.uid)
        const userDocRef = doc(db, "Accounts", auth.currentUser.uid)
        const taskObject = {
            task: getTask,
            type: getType
        }
        if(getType == getCurrentType || getCurrentType == ""){
            setTasks([...Tasks, taskObject])
            // Unity
        }
        
        await updateDoc(userDocRef, {Tasks: arrayUnion(taskObject)})
    }

    async function setType(type){
        console.log(type)
        console.log("Recent:"+getCurrentType)
        const userDocRef = doc(db, "Accounts", auth.currentUser.uid)
        const userDocSnap = await getDoc(userDocRef)
        const userDocTasks = userDocSnap.data().Tasks
        if(type == getCurrentType){
            setTasks(userDocTasks)
            setCurrentType('')
            return
        }
        const typeArray = []
        userDocTasks.forEach(element => {
            if(element.type.toLowerCase() == type.toLowerCase()){
                typeArray.push(element)
            }
        });
        setCurrentType(type)
        setTasks(typeArray)
    }

    async function removeTask(index, taskObj){
        console.log(index)
        const userDocRef = doc(db, "Accounts", auth.currentUser.uid)
        await updateDoc(userDocRef, {Tasks: arrayRemove(taskObj)})
        let TasksCopy = [...Tasks]
        TasksCopy.splice(index,1)
        setTasks(TasksCopy)
    }

    // 

    return(
        <View style = {styles.main}>
            {/* <SignOutIcon></SignOutIcon> */}
            <TextInput style = {styles.typeInput} placeholder= 'Type' onChangeText={text => addType(text)} defaultValue='' ></TextInput>
            <View style  = {styles.top}>
                <TextInput style = {styles.taskInput} onChangeText={text => addTask(text)} 
                placeholder= 'Insert Task' defaultValue='' ></TextInput>
                <Pressable style = {styles.addButton} title = "Add Task" onPress={()=> addUserTasks() 
            
                }>
                    <Text style = {styles.plus}>+</Text>
                </Pressable>
            </View>
            
            <ScrollView horizontal = {true} style = {styles.taskTypes} isVisible = {false}>
                {
                    taskTypes.map((type)=>{
                        return(
                            <TaskTypes type = {type} func = {setType}></TaskTypes>
                        )
                    })
                }
            </ScrollView>
            
            
            <ScrollView style = {styles.taskScroll}>
                {
                    Tasks.map((task, index)=>{
                        return(
                            <Task taskText = {task.task} type = {task.type} func = {removeTask} index = {index} taskObj = {task}></Task>
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
    },
    taskInput: {
        backgroundColor: "rgba(255,255,255,0)", 
        borderColor:"rgba(0,0,0,.1)", 
        borderWidth: 2, 
        height: 40, 
        width: "85%",
        borderRadius: 15,
        marginRight: 10,
        fontSize: 18,
        marginBottom: 15,
        marginTop: 15,
        flexDirection: 'row',
        paddingLeft: 10
    },
    typeInput: {
        backgroundColor: "rgba(255,255,255,0)", 
        borderColor:"rgba(0,0,0,.1)", 
        borderWidth: 2, 
        height: 40, 
        width: "35%",
        borderRadius: 15,
        marginRight: 10,
        fontSize: 18,
        marginBottom: 15,
        marginTop: 15,
        paddingLeft: 10
    },
    top: {
    flexDirection: 'row',
    },
    addButton:{
        textAlignVertical: 'center',
        borderRadius: 15,
        width: 45,
        height: 45,
        backgroundColor:"rgb(255,165,0)",
        alignSelf: 'center',
        justifyContent: 'center'
    },
    plus: {
        color: 'white',
        textAlignVertical: 'bottom',
        alignSelf: 'center',
        fontSize: 30,
        justifyContent: "center"
    },
    taskTypes: {
        flexDirection: 'row',
        padding: 10,
        
    },
    taskScroll: {
        height: 475,
        width: 'auto'
    },
  })