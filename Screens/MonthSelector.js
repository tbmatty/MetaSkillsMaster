import React, { Component } from 'react';
import { render } from 'react-dom';
import { ScrollView, Text, Button, Touchable } from 'react-native';
import * as firebase from 'firebase'


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
                arrayToSet.push([monthYear, doc.data().textEntry, doc.data().categories, doc.data().date, doc.data().uri])
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
            if (copyFrom[i][0]===monthYear) {
                copyTo.push([i,copyFrom[i]]);
            }
            console.log(copyFrom[i][0]===monthYear);
            i++;
            
        }
        console.log("We're breaking up, its not me its you")
        console.log(copyTo)
        this.props.navigation.navigate("Reflections" , { firebaseArray: copyTo });


    }


    test = async () => {
        var uid = firebase.auth().currentUser.uid
        var arrayToSet = []
        var monthYearArray = []
        var i = 0;

        var monthYear
        let firebaseRef = await firebase.firestore().collection("Recordings").doc(uid).collection("Recordings").get().then(snapshot => {
            snapshot.forEach(doc => {
                monthYear = doc.data().date.slice(4, 11);
                if (monthYearArray.indexOf(monthYear) === -1) {
                    monthYearArray.push([i, monthYear]);
                    i++;
                }
                arrayToSet.push([monthYear, doc.data().textEntry, doc.data().categories, doc.data().date, doc.data().uri])
            })
        })
        this.setState({
            monthsAndYears: monthYearArray,
            firebaseArray: arrayToSet,
        })

    }


    heh = () =>{
        console.log("WHAT WHAT WHAT!")
    }

    render() {
        return (
            <ScrollView contentContainerStyle={{
                flex: -1,
                justifyContent: 'space-between'
            }}>
                {this.state.monthsAndYears.map((item) => (
                    
                    <Button
                        key={item[0]}
                        title={this.state.monthIntMap[item[1].slice(0, 2)] + " " + item[1].slice(3,)}
                        value={item[1]}
                        onPress={() => this.handleButtonPress(item[1])}
                    />

                ))
                }
            </ScrollView>
        );
    };

}