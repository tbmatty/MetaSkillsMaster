import React, { Component } from 'react';
import { render } from 'react-dom';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import * as firebase from "firebase";
import DateTimePicker from '@react-native-community/datetimepicker';
import { format, startOfWeek } from 'date-fns';


export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            mode: 'time',
            show: false,
            loading: true,
            weekMonthYear: "week",
            consecutive: 0,
            consecutiveAllTime: 0,
            weekStats: [], //Array for every skill at each i
            monthStats: [], //Array for every skill at each i
            yearStats: [], //Array for every skill at each i
            threeWeekly: [],
            threeMonthly: [],
            threeYearly: [],
            weekCount: 0,
            monthlyCount: 0,
            yearlyCount:0,
            reflectionStatsWeekly: [],   //For pie chart
            reflectionStatsMonthly: [],  //for pie chart
            reflectionStatsYearly: [],   //for pie chart
            mostRecordedWeekly: "",
            mostRecordedMonthly: "",
            mostRecordedYearly: "",
            weeklyPlural: true,
            skillCategories: {
                0: "Self Management",
                1: "Focussing",
                2: "Integrity",
                3: "Adapting",
                4: "Initiative",
                5: "Social Intelligence",
                6: "Communicating",
                7: "Feeling",
                8: "Collaborating",
                9: "Leading",
                10: "Innovation",
                11: "Curiosity",
                12: "Creativity",
                13: "Sense Making",
                14: "Critical Thinking"
            },
            displayData: [],
            color: ['#4677D6', '#FF5D60', '#FFC530']
        }
    }

    componentDidMount() {
        this.getFirebaseDataAsync()
    }


    getFirebaseDataAsync = async () => {
        var statArray
        var reflectionStatsWeekly
        var reflectionStatsMonthly = new Array(3).fill(0)
        var reflectionStatsYearly = new Array(3).fill(0)
        var weekStats
        var monthStats = new Array(15).fill(0)
        var yearStats = new Array(15).fill(0)
        var uid = firebase.auth().currentUser.uid
        var thisWeek = format(startOfWeek(new Date(), { weekStartsOn: 1 }), "dd-MM-yyyy")
        var thisMonth = thisWeek.slice(3, 5)
        var thisYear = thisWeek.slice(6, 10)
        var i
        var weekCount
        var monthlyCount = 0
        var yearlyCount = 0

        let firebaseRef = await firebase.firestore().collection("Stats").doc(uid).collection("Weeks").get().then(snapshot => {
            snapshot.forEach(doc => {
                statArray = doc.data().statArray
                if (doc.data().date === thisWeek) {
                    weekCount = doc.data().reflectionCount
                    weekStats = statArray
                    reflectionStatsWeekly = doc.data().reflectionStatArray
                }
                if (doc.data().date.slice(3, 5) === thisMonth) {
                    i = 0
                    monthlyCount += doc.data().reflectionCount
                    while (i < doc.data().statArray.length) {
                        monthStats[i] += doc.data().statArray[i]
                        if (i < 3) {
                            reflectionStatsMonthly[i] += doc.data().reflectionStatArray[i]
                        }
                        i++
                    }
                }
                if (doc.data().date.slice(6, 10) === thisYear) {
                    i = 0
                    yearlyCount += doc.data().reflectionCount
                    while (i < doc.data().statArray.length) {
                        yearStats[i] += doc.data().statArray[i];
                        if (i < 3) {
                            reflectionStatsYearly[i] += doc.data().reflectionStatArray[i]
                        }
                        i++;
                    }
                }
            })
        })

        var consecutive
        let getConsec = await firebase.firestore().collection("Users").doc(uid).get().then(doc => {
            consecutive = doc.data().ConsecutiveDays;
        })

        var consecutiveAllTime
        let getAllTimeConsec = await firebase.firestore().collection("BadgeProgress").doc(uid).get().then(doc => {
            consecutiveAllTime = doc.data().Consistency;
        })


        this.setState({
            weekStats: weekStats,
            monthStats: monthStats,
            yearStats: yearStats,
            reflectionStatsWeekly: reflectionStatsWeekly,
            reflectionStatsMonthly: reflectionStatsMonthly,
            reflectionStatsYearly: reflectionStatsYearly,
            consecutive: consecutive,
            consecutiveAllTime: consecutiveAllTime,
            weekCount:weekCount,
            monthlyCount:monthlyCount,
            yearlyCount:yearlyCount
        })
        console.log(reflectionStatsWeekly)

    }

    getAllIndexes = (arr, val) => {
        var indexes = [], i = -1;
        while ((i = arr.indexOf(val, i + 1)) != -1) {
            indexes.push(i);
        }
        return indexes;
    }

    arrayAllMaxIndexes = (array) => {
        return this.getAllIndexes(array, Math.max.apply(null, array));
    }



    onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;

        this.setState({
            show: Platform.OS === 'ios',
            date: currentDate
        })
        var dateStr = JSON.stringify(currentDate)
        var hour = dateStr.slice(12, 14)
        var minute = dateStr.slice(15, 17)
        console.log(hour)
        console.log(minute)
        var user = firebase.auth().currentUser


        let setDoc = firebase.firestore().collection("Users").doc(user.uid).set({
            notificationTime: parseInt(hour),
            notificationTimeMinutes: parseInt(minute),
            email: user.email
        })
        alert("New notification time set to " + hour + ":" + minute)
    };


    showDatePicker = () => {
        this.setState({
            show: true,
        })
    };

    hideDatePicker = () => {
        this.setState({
            show: false,
        })
    }

    render() {
        return (
            <View style={{ flex: 5 }}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.titleText}>Hey You!</Text>
                </View>
                <View style={{ flex: 4 }}>
                    <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate("Stats", {
                                                                                                                    pieDataWeekly:this.state.reflectionStatsWeekly,
                                                                                                                    pieDataMonthly:this.state.reflectionStatsMonthly,
                                                                                                                    pieDataYearly:this.state.reflectionStatsYearly,
                                                                                                                    detailedWeeklyStats:this.state.weekStats,
                                                                                                                    detailedMonthlyStats:this.state.monthStats,
                                                                                                                    detailedYearlyStats:this.state.yearStats,
                                                                                                                    weeklyCount:this.state.weekCount,
                                                                                                                    monthlyCount:this.state.monthlyCount,
                                                                                                                    yearlyCount:this.state.yearlyCount
                                                                                                                    })}>
                        <Text style={styles.buttonText}>Your Stats</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate("Trophies")}>
                        <Text style={styles.buttonText}>Your Trophies</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.showDatePicker()} style={styles.button}>
                        <Text style={styles.buttonText}>Set notification time</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => firebase.auth().signOut()}>
                        <Text style={styles.buttonText}>Sign out</Text>
                    </TouchableOpacity>

                    {this.state.show ?
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={this.state.date}
                            mode={this.state.mode}
                            is24Hour={true}
                            display="default"
                            onChange={this.onChange}
                        /> : null
                    }
                </View>
            </View>
        );
    };
}

const styles = StyleSheet.create({
    button: {
        padding: 20,
        backgroundColor: "white",
        borderRadius: 4,
        margin: 20
    },
    titleText: {
        fontSize: 32,
        paddingTop: 20,
        textAlign:"center"
    },
    buttonText: {
        fontSize: 18,
        paddingLeft: 20
    }
})