import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import { ScrollView, Text, Button, TouchableOpacity, View, StyleSheet } from 'react-native';
import * as firebase from 'firebase'
import { AntDesign } from '@expo/vector-icons';


export default function MonthSelector (props) {

    const[monthIntMap, setMonthIntMap] = useState({
        "01": "January",
        "02": "February",
        "03": "March",
        "04": "April",
        "05": "May",
        "06": "June",
        "07": "July",
        "08": "August",
        "09": "September",
        "10": "October",
        "11": "November",
        "12": "December"
    })
    const[monthsAndYears, setMonthsAndYears] = useState([])
    const[firebaseArray, setFirebaseArray] = useState([])




    useEffect(()=>{
        getFirebaseData()
    },[])

    const getFirebaseData = async() =>{
        var uid = firebase.auth().currentUser.uid
        var arrayToSet = []
        var monthYearArray = []
        var i = 0;

        var monthYear
        let firebaseRef = await firebase.firestore().collection("Recordings").doc(uid).collection("Recordings").get().then(snapshot => {
            snapshot.forEach(doc => {
                monthYear = doc.data().date.slice(4, 11);
                if (monthYearArray.indexOf(monthYear) === -1) {
                    monthYearArray.push(monthYear);
                    i++;
                }
                arrayToSet.push([monthYear, doc.data().textEntry, doc.data().categories, doc.data().date, doc.data().uri,doc. data().colour, doc.data().textColour, doc.data().title])
            })
        })


        var arrayWithKeys = []
        i = 0;
        while (i < monthYearArray.length) {
            arrayWithKeys.push([i, monthYearArray[i]])
            i++
        }

        setMonthsAndYears(arrayWithKeys)
        setFirebaseArray(arrayToSet)
    }


    const handleButtonPress = (monthYear) => {
        console.log(monthYear)
        console.log("yooo we out here")
        var copyFrom = firebaseArray;
        var i = 0;
        var copyTo = []
        while (i < copyFrom.length) {
            if (copyFrom[i][0] === monthYear) {
                copyTo.push([i, copyFrom[i]]);
            }
            console.log(copyFrom[i][0] === monthYear);
            i++;

        }
        // console.log("We're breaking up, its not me its you")
        // console.log(copyTo)
        props.navigation.navigate("Reflections", { firebaseArray: copyTo, monthYear:monthYear });
    }








        return (

            <ScrollView contentContainerStyle={{
            }}>
                <Text style={styles.titleText}>View your recordings across {monthsAndYears.length} month{monthsAndYears.length > 1 ? "s" : ""}</Text>

                {monthsAndYears.map((item) => (
                    <TouchableOpacity style={styles.button} key={item[0]} onPress={() => handleButtonPress(item[1])}>
                        <Text style={styles.buttonText}>{monthIntMap[item[1].slice(0, 2)] + " " + item[1].slice(3,)}</Text>
                    </TouchableOpacity>
                ))
                }
            </ScrollView>
        );


    };


const styles = StyleSheet.create({
    button:{
        padding:20,
        backgroundColor: "white",
        borderRadius: 4,
        margin: 20
    },
    titleText:{
        fontSize:32,
        padding: 20
    },
    buttonText:{
        fontSize:18,
        paddingLeft:20
    }
})
