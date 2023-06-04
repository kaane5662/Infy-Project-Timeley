import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TextInput, Image, Button, Pressable as TouchableOpacity, Alert } from 'react-native';
import React, { useRef, useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import signUp from './screens/SignUp';
import { initializeApp } from 'firebase/app';

import { getFirestore, collection, getDocs, getDoc, doc, setDoc, updateDoc, arrayUnion, addDoc, query, where } from 'firebase/firestore';
import Login from './screens/Login'
import TasksPage from './screens/TasksPage';
import EventsPage from './screens/EventsPage';
import HomePage from './screens/HomePage';







//Define your object model



const Stack = createNativeStackNavigator();
export default function App( {navigation }) {



  return (
    <NavigationContainer>
    
      <Stack.Navigator >
        <Stack.Screen
          name="Login"
          component={Login}
        />
        <Stack.Screen
          name="SignUp"
          component={signUp}
          options={{title: 'Welcome'}}
        />
        
        <Stack.Screen
          name="Tasks"
          component={TasksPage}
        />

        <Stack.Screen
          name="Events"
          component={EventsPage}
        />
        <Stack.Screen
          name="Home"
          component={HomePage}
        />
        
      </Stack.Navigator>

    </NavigationContainer>
    
    


  );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: "20%",
    paddingLeft: "10%",
    paddingRight: "10%",
  },
  header: {
    color: "black",
    fontSize: 40,
    fontWeight: "bold",

  },
  scrollView: {
    maxHeight: 25,
  },
  addTaskButton: {
    backgroundColor: "red",
    borderRadius: 50,
    width: 50,
    height: 100,
  }, 
  inputs: {
    backgroundColor: "white", 
    borderColor:"gray", 
    borderWidth: 2, 
    height: 40, 
    width: "100%",
    borderRadius: 5,
    marginRight: 10,
    fontSize: 18,
    marginBottom: 15,
    marginTop: 15
  }
});
