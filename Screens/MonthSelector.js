import React, { Component } from 'react';
import { render } from 'react-dom';
import { ScrollView, Text, Button, TouchableOpacity, View, StyleSheet } from 'react-native';
import * as firebase from 'firebase'
import { AntDesign } from '@expo/vector-icons';


export default class MonthSelector extends Component {
    constructor(props) {
        super(props);
        this.state = {
            monthsAndYears: [],
            monthIntMap: {
                "1": "January",
                "2": "February",
                "3": "March",
                "4": "April",
                "5": "May",
                "6": "June",
                "7": "July",
                "8": "August",
                "9": "September",
                "10": "October",
                "11": "November",
                "12": "December"
            },
            firebaseArray: [],
        }
    }

    componentDidMount = async () => {
        console.log("OIFSDBGF")
        // this.props.navigation.setOptions({
        //     headerRight: () => (
        //         <TouchableOpacity onPress={() =>  this.props.navigation.navigate("Profile") }>
        //             <AntDesign name="save" size={32} color="black" paddingRight="50" />
        //         </TouchableOpacity>),
        // })

        var uid = firebase.auth().currentUser.uid
        var arrayToSet = []
        var monthYearArray = []
        var i = 0;

        var monthYear
        let firebaseRef = await firebase.firestore().collection("Recordings").doc(uid).collection("Recordings").get().then(snapshot => {
            snapshot.forEach(doc => {
                monthYear = doc.data().date.slice(4, 11);
                if (monthYearArray.indexOf(monthYear) === -1) {
                    console.log("twice")
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



        this.setState({
            monthsAndYears: arrayWithKeys,
            firebaseArray: arrayToSet,
        })
    }


    handleButtonPress = async (monthYear) => {
        console.log(monthYear)
        console.log("yooo we out here")
        var copyFrom = this.state.firebaseArray;
        var i = 0;
        var copyTo = []
        while (i < copyFrom.length) {
            if (copyFrom[i][0] === monthYear) {
                copyTo.push([i, copyFrom[i]]);
            }
            console.log(copyFrom[i][0] === monthYear);
            i++;

        }
        console.log("We're breaking up, its not me its you")
        console.log(copyTo)
        this.props.navigation.navigate("Reflections", { firebaseArray: copyTo, monthYear:monthYear });


    }







    render() {
        return (

            <ScrollView contentContainerStyle={{
            }}>
                <Text style={styles.titleText}>View your recordings across {this.state.monthsAndYears.length} month{this.state.monthsAndYears.length > 1 ? "s" : ""}</Text>

                {this.state.monthsAndYears.map((item) => (
                    <TouchableOpacity style={styles.button} key={item[0]} onPress={() => this.handleButtonPress(item[1])}>
                        <Text style={styles.buttonText}>{this.state.monthIntMap[item[1].slice(0, 2)] + " " + item[1].slice(3,)}</Text>
                    </TouchableOpacity>
                ))
                }
            </ScrollView>
        );
    };
}

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
