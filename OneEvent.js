import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TextInput, Image, Pressable} from 'react-native';
import React, { useRef, useState} from 'react';

let getTheme = 'rgb(255, 165, 0)'

const OneEvent = (props) => {
    let date = props.s
    return(
    <View style = {styles.main}>
        <View style = {styles.top}>
            <Text style = {styles.eventTitle}>{props.eventTitle}</Text>
            <Text style = {styles.eventDate}>{props.eventDate}</Text>
        
        </View>
        
        <Text style = {styles.eventDescripton}>{props.eventDescription}</Text>
        <Text style = {styles.eventTime}>{props.eventTime}</Text>
    </View>
    )
}

const styles = StyleSheet.create({
    main:{
        height: 'auto',
        width: 365,
        backgroundColor: getTheme,
        borderStyle: 'solid',
        borderWidth: 3,
        boxSizing: "border-box",
        borderColor: 'rgba(0,0,0,.1)',
        borderRadius: 15,
        marginBottom: 10,
    },
    top:{
        flexDirection: 'row'
    },
    eventTitle: {
        color: 'white',
        fontWeight: 'bold',
        padding: 10,
        fontSize: 22
    },
    eventDescripton: {
        color: 'white',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 0,
        fontSize: 15,
        paddingBottom: 10
    },
    eventDate:{
        padding: 10,
        textAlign: 'right',
        fontSize: 20,
        
        color: 'white',
        fontWeight: '600'
    },
    eventTime: {
        paddingLeft: 10,
        fontSize: 20,
        paddingBottom: 10,
        fontWeight: '600',
        color: 'white'
    }
    

})

export default OneEvent