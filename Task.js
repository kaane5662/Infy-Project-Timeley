import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TextInput, Image, Pressable} from 'react-native';
import React, { useRef, useState} from 'react';

const Task = (props) => {
    const [getCheckMark, setCheckMark] = useState(false)
    return(
    <View style = {styles.background}>
        <View style = {styles.col1}>
        <Text style = {styles.task}>{props.taskText}</Text>
        <Text onPress={() => {setCheckMark(!getCheckMark); props.func(props.index, props.taskObj)} } style = {{backgroundColor: getCheckMark ? "rgb(255,165,0)" : "rgba(0,0,0,0)", 
        borderRadius:5,
        width: 25,
        height: 25, borderColor: "rgba(255,165,0,.5)", borderWidth: 2, marginLeft: 10}}></Text>
        </View>
        <Pressable style = {styles.taskType}>
            <Text style = {styles.taskTypeText}>{props.type}</Text>
        </Pressable>
        

    </View>
    
    )
}

const styles = StyleSheet.create({
    task:{
        fontSize: 18,
        alignContent: "center",
        width: 300, 
        paddingLeft: 15,
        paddingRight: 10
    },
    background: {
        padding: 15,
        borderColor: "rgba(0,0,0,.1)",
        borderWidth: 3,
        borderRadius: 15,
        minHeight: 75,
        marginTop: 15,
        
    },
    col1:{
       flexDirection: 'row' 
    },
    taskType: {
        backgroundColor: 'rgb(255,165,0)',
        height: 25,
        width: 'auto',
        borderRadius: 10,
        marginTop: 10,
        marginLeft: 10,
    },
    taskTypeText: {
        color: 'white',
        paddingLeft: 10,
        paddingRight: 10,
        fontSize: 17,
        
    }
})

export default Task;