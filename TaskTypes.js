import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TextInput, Image, Button, Pressable as TouchableOpacity, Alert, Pressable } from 'react-native';
import React, { useRef, useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import signUp from './screens/SignUp';
import { initializeApp } from 'firebase/app';

import { getFirestore, collection, getDocs, getDoc, doc, setDoc, updateDoc, arrayUnion, addDoc, query, where } from 'firebase/firestore';
import Login from './screens/Login'
import TasksPage from './screens/TasksPage';

export default TaskTypes = (props) =>{

    return(
        <Pressable style = {styles.main} onPress = {()=> props.func(props.type)}>
            <Text style = {styles.taskText}>{props?.type}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    main: {
        backgroundColor: 'rgb(255,165,0)',
        width: 'auto',
        height: 30,
        borderRadius: 10,
        marginRight: 10
        
    },
    taskText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 20,
        paddingLeft: 10,
        paddingRight: 10
        
    }
})