import React, { useState, useEffect, useReducer } from 'react';
import { render } from 'react-dom';
import { ScrollView, Text, Button, TouchableOpacity, View, StyleSheet } from 'react-native';
import * as firebase from 'firebase'
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

export default function MonthSelector(props) {

    const [monthIntMap, setMonthIntMap] = useState({
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
    const [monthsAndYears, setMonthsAndYears] = useState([])
    const [firebaseArray, setFirebaseArray] = useState([])
    const [user, setUser] = useState(firebase.auth().currentUser)
    const [sadFace, setSadFace] = useState(true)

    const initialState = {sadFacex: true};
    
    function reducer(state, action) {
        switch (action.type) {
          case 'sad':
            return {sadFacex: true};
          case 'happy':
            return {sadFacex: false};
          default:
            throw new Error();
        }
      }

    useEffect(() => {
        getFirebaseData()

        // How to listen for changes to firebase doc
        //
        //
        let unsubscribe = firebase.firestore().collection('Recordings').doc(user.uid).collection('Recordings').onSnapshot(function (snapshot) {
            setSadFace(false)
            getFirebaseData()
        });
        


    }, [])



    const getFirebaseData = async () => {
        console.log("FIre")
        console.log(monthsAndYears.length)
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
                arrayToSet.push([monthYear, doc.data().textEntry, doc.data().categories, doc.data().date, doc.data().uri, doc.data().colour, doc.data().textColour, doc.data().title])
            })
        })


        var arrayWithKeys = []
        i = 0;
        while (i < monthYearArray.length) {
            arrayWithKeys.push([i, monthYearArray[i]])
            i++
        }

        setMonthsAndYears(arrayWithKeys)
        if (monthsAndYears.length > 0) {
            //set sad face
            console.log("CONSOLE LOG")
            setSadFace(false)
        }else{
            setSadFace(true)
        }
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
        props.navigation.navigate("Reflections", { firebaseArray: copyTo, monthYear: monthYear });
    }








    return (
        <View style={{flex:1}}>
            {!monthsAndYears.length ?
                <View style={{alignItems:"center",justifyContent:"center", flex:1}}>
                    <Entypo name="emoji-flirt" size={38} color="black" />
                    <Text style={{paddingVertical:20}}>You have no reflections... yet!</Text>
                </View>
                :
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
            }
        </View>
    );


};


const styles = StyleSheet.create({
    button: {
        padding: 20,
        backgroundColor: "white",
        borderRadius: 4,
        margin: 20
    },
    titleText: {
        fontSize: 32,
        padding: 20
    },
    buttonText: {
        fontSize: 18,
        paddingLeft: 20
    }
})
