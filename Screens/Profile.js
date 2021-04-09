import React, { useEffect, useState } from 'react';
import { render } from 'react-dom';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
import * as firebase from "firebase";
import DateTimePicker from '@react-native-community/datetimepicker';
import { format, startOfWeek } from 'date-fns';
import Emoji from 'react-native-emoji';


export default function Profile(props) {

    const [uid, setUID] = useState()
    const [date, setDate] = useState(new Date())
    const mode = 'time'
    const [show, setShow] = useState(false)
    const [consecutive, setConsecutive] = useState(0)
    const [consecutiveAllTime, setConsecutiveAllTime] = useState(0)
    const [profilePicURI, setProfilePicURI] = useState()
    const [weekStats, setWeekStats] = useState([])//Array for every skill at each i
    const [monthStats, setMonthStats] = useState([])//Array for every skill at each i
    const [yearStats, setYearStats] = useState([])//Array for every skill at each i
    const [weekCount, setWeekCount] = useState(0)//Number of reflections for the week
    const [monthlyCount, setMonthlyCount] = useState(0)//Number of reflections for the month
    const [yearlyCount, setYearlyCount] = useState(0)//Number of reflections for the year
    const [reflectionStatsWeekly, setReflectionStatsWeekly] = useState([])//For pie chart
    const [reflectionStatsMonthly, setReflectionStatsMonthly] = useState([])//For pie chart
    const [reflectionStatsYearly, setReflectionStatsYearly] = useState([])//For pie chart
    const skillCategories = {
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
    }
    const color = ['#4677D6', '#FF5D60', '#FFC530']



    useEffect(() => {
        var uid = firebase.auth().currentUser.uid

        async function getFirebaseDataAsync() {
            var statArray = new Array(15).fill(0)
            var reflectionStatsWeekly = new Array(3).fill(0)
            var reflectionStatsMonthly = new Array(3).fill(0)
            var reflectionStatsYearly = new Array(3).fill(0)
            var weekStats = new Array(15).fill(0)
            var monthStats = new Array(15).fill(0)
            var yearStats = new Array(15).fill(0)
            var uid = firebase.auth().currentUser.uid
            var thisWeek = format(startOfWeek(new Date(), { weekStartsOn: 1 }), "dd-MM-yyyy")
            var thisMonth = thisWeek.slice(3, 5)
            var thisYear = thisWeek.slice(6, 10)
            var i
            var weekCount = 0
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
            var profilePicURI
            let getConsec = await firebase.firestore().collection("Users").doc(uid).get().then(doc => {
                consecutive = doc.data().ConsecutiveDays;
                profilePicURI = doc.data().profilePicURI;
            })

            var consecutiveAllTime
            let getAllTimeConsec = await firebase.firestore().collection("BadgeProgress").doc(uid).get().then(doc => {
                consecutiveAllTime = doc.data().Consistency;
            })



            setProfilePicURI(profilePicURI)
            setWeekStats(weekStats)
            setMonthStats(monthStats)
            setYearStats(yearStats)
            setReflectionStatsWeekly(reflectionStatsWeekly)
            setReflectionStatsMonthly(reflectionStatsMonthly)
            setReflectionStatsYearly(reflectionStatsYearly)
            setConsecutive(consecutive)
            setConsecutiveAllTime(consecutiveAllTime)
            setWeekCount(weekCount)
            setMonthlyCount(monthlyCount)
            setYearlyCount(yearlyCount)
        }

        async function getNewProfilePic(){
            var profilePicURI
            let getProfilePicURI = await firebase.firestore().collection("Users").doc(uid).get().then(doc => {
                profilePicURI = doc.data().profilePicURI;
            })
            setProfilePicURI(profilePicURI)
        }

        getFirebaseDataAsync()



        let unsubscribe = firebase.firestore().collection('Stats').doc(uid).collection('Weeks').onSnapshot(function (snapshot) {
            getFirebaseDataAsync()
        });

        let anotherUnsubscribe = firebase.firestore().collection("Users").doc(uid).onSnapshot(function (snapshot) {
            getNewProfilePic()
        })

    }, [])

    const handleNavToProfile = async() => {
        var userBadgeProgressNumbers
        var userName
        var userDescription
        var userProfilePicURI
        var userXP
        var uid = firebase.auth().currentUser.uid
        await firebase.firestore().collection("BadgeProgress").doc(uid).get().then(doc => {
            userBadgeProgressNumbers=[doc.data().SelfManagement, doc.data().SocialAwareness, doc.data().Innovation, doc.data().Consistency]
        })
        await firebase.firestore().collection("Users").doc(uid).get().then(doc => {
            userName = doc.data().name
            userDescription = doc.data().description
            userProfilePicURI = doc.data().profilePicURI
            userXP = doc.data().xp
        })

        var i = 0
        var badges = []
        var x
        for (x in userBadgeProgressNumbers) {
            i = 0;
            if (x >= 10) {
                i++;
                if (x >= 50) {
                    i++;
                    if (x >= 100) {
                        i++;
                    }
                }
            }
            badges.push(i)
        }

        props.navigation.navigate("UserProfile", 
        {userName: userName,
        userDescription: userDescription,
        userProfilePicURI: userProfilePicURI,
        userXP:userXP,
        badges:badges,
        profileID:uid})

    }
   

    const getAllIndexes = (arr, val) => {
        var indexes = [], i = -1;
        while ((i = arr.indexOf(val, i + 1)) != -1) {
            indexes.push(i);
        }
        return indexes;
    }

    const arrayAllMaxIndexes = (array) => {
        return getAllIndexes(array, Math.max.apply(null, array));
    }



    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;

        setShow(Platform.OS === 'ios')
        setDate(currentDate)
        var dateStr = JSON.stringify(currentDate)
        var hour = dateStr.slice(12, 14)
        var minute = dateStr.slice(15, 17)
   
        var user = firebase.auth().currentUser


        let setDoc = firebase.firestore().collection("Users").doc(user.uid).set({
            notificationTime: parseInt(hour),
            notificationTimeMinutes: parseInt(minute),
            email: user.email
        })
        alert("New notification time set to " + hour + ":" + minute)
    };


    const showDatePicker = () => {
        setShow(true)
    };

    const hideDatePicker = () => {
        setShow(false)
    }

    return (
        <View style={{ flex: 5 }}>
            <View style={{ flex: 1, alignItems: "center" }}>
                {/* <Text style={styles.titleText}>Hey You!</Text> */}
                <TouchableOpacity onPress={()=>handleNavToProfile()}>
                <Image
                    source={{
                        uri: profilePicURI
                    }}
                    style={{ width: 120, height: 120, borderRadius: 120 / 2 }}
                />
                </TouchableOpacity>
                <Text style={styles.consecutiveText}>Current Streak: {consecutive} Days {<Emoji name="fire" />}</Text>
            </View>
            <View style={{ flex: 4, paddingTop: 20 }}>
                <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate("Leaderboard")}>
                    <Text style={styles.buttonText}>Leaderboard</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate("Stats", {
                    pieDataWeekly: reflectionStatsWeekly,
                    pieDataMonthly: reflectionStatsMonthly,
                    pieDataYearly: reflectionStatsYearly,
                    detailedWeeklyStats: weekStats,
                    detailedMonthlyStats: monthStats,
                    detailedYearlyStats: yearStats,
                    weeklyCount: weekCount,
                    monthlyCount: monthlyCount,
                    yearlyCount: yearlyCount
                })}>
                    <Text style={styles.buttonText}>Your Stats</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate("Trophies")}>
                    <Text style={styles.buttonText}>Your Trophies</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity onPress={() => showDatePicker()} style={styles.button}>
                    <Text style={styles.buttonText}>Set notification time</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => firebase.auth().signOut()}>
                    <Text style={styles.buttonText}>Sign out</Text>
                </TouchableOpacity> */}
                <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate("Settings")}>
                    <Text style={styles.buttonText}>Settings</Text>
                </TouchableOpacity>
                {show ?
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={mode}
                        is24Hour={true}
                        display="default"
                        onChange={onChange}
                    /> : null
                }
            </View>
        </View>
    );

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
        textAlign: "center"
    },
    consecutiveText: {
        fontSize: 18,
        paddingVertical: 20,
        textAlign: "center"
    },
    buttonText: {
        fontSize: 18,
        paddingLeft: 20
    }
})