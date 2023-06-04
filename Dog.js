import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TextInput, Image } from 'react-native';
import React, { useRef, useState} from 'react';

const Dog = (props) => {
    return(
        <View style = {styles.background}>
            <Text style = {styles.dogName}>{props.name}</Text>
            <Text style = {styles.text}>My favorite activity is {props.activity}</Text>
            <Text style = {styles.text}>My breed is {props.breed}</Text>
            
        </View>
    )
}

const styles = StyleSheet.create({
    background: {
        padding: 15,
        borderColor: "black",
        borderWidth: 2,
        borderRadius: 15
    },
    dogName: {
        fontSize: 25,
        fontWeight: "bold"
    },
    text: {
        marginLeft: 15,
        marginTop: 10,
        fontSize:18,
    }
})

export default Dog;