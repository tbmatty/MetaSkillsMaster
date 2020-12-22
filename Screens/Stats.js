import React, { Component } from 'react';
import { render } from 'react-dom';
import { View, Text, Button, StyleSheet } from 'react-native';
import * as firebase from "firebase";
import { AntDesign } from '@expo/vector-icons';
import { format, startOfWeek } from 'date-fns';
import { PieChart } from "react-native-svg-charts";



export default class Stats extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            weekMonthYear: "week",
            weekStats: [],
            monthStats: [],
            yearStats: [],
            threeWeekly: [],
            threeMonthly: [],
            threeYearly: [],
            reflectionStatsWeekly: [],
            reflectionStatsMonthly: [],
            reflectionStatsYearly: [],
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
        this.test
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
        var i
        let firebaseRef = await firebase.firestore().collection("Stats").doc(uid).collection("Weeks").get().then(snapshot => {
            snapshot.forEach(doc => {
                statArray = doc.data().statArray
                if (doc.data().date === thisWeek) {
                    weekStats = statArray
                    reflectionStatsWeekly = doc.data().reflectionStatArray
                }
                if (doc.data().date.slice(3, 5) === thisMonth) {
                    i = 0
                    while (i < doc.data().statArray.length) {
                        monthStats[i] += doc.data().statArray[i]
                        if (i < 3) {
                            reflectionStatsMonthly[i] += doc.data().reflectionStatArray[i]
                        }
                        i++
                    }
                }
                i = 0
                while (i < doc.data().statArray.length) {
                    yearStats[i] += doc.data().statArray[i];
                    if (i < 3) {
                        reflectionStatsYearly[i] += doc.data().reflectionStatArray[i]
                    }
                    i++;
                }
            })
        })

        this.setState({
            weekStats: weekStats,
            monthStats: monthStats,
            yearStats: yearStats,
            reflectionStatsWeekly: reflectionStatsWeekly,
            reflectionStatsMonthly: reflectionStatsMonthly,
            reflectionStatsYearly: reflectionStatsYearly,
            displayData: reflectionStatsWeekly,
        })



        var threeWeekly = []
        console.log(reflectionStatsWeekly)
        console.log(reflectionStatsMonthly)
        console.log(reflectionStatsYearly)


        var threeWeekly = [0, 0, 0]
        i = 0
        while (i < weekStats.length) {
            if (i < 5) {
                threeWeekly[0] += weekStats[i]
            } else if (i > 5 && i < 10) {
                threeWeekly[1] += weekStats[i]
            } else {
                threeWeekly[2] += weekStats[i]
            }
            i++
        }

        var threeMonthly = [0, 0, 0]
        i = 0
        while (i < yearStats.length) {
            if (i < 5) {
                threeMonthly[0] += monthStats[i]
            } else if (i > 5 && i < 10) {
                threeMonthly[1] += monthStats[i]
            } else {
                threeMonthly[2] += monthStats[i]
            }
            i++
        }

        var threeYearly = [0, 0, 0]
        i = 0
        while (i < yearStats.length) {
            if (i < 5) {
                threeYearly[0] += yearStats[i]
            } else if (i > 5 && i < 10) {
                threeYearly[1] += yearStats[i]
            } else {
                threeYearly[2] += yearStats[i]
            }
            i++
        }

        this.setState({
            threeWeekly: threeWeekly,
            threeMonthly: threeMonthly,
            threeYearly: threeYearly
        })

        var maxes = []
        maxes = this.arrayAllMaxIndexes(weekStats)
        console.log(this.state.skillCategories[maxes])
        i = 0
        var weeklyRecorded = ""
        while (i < maxes.length) {
            weeklyRecorded += this.state.skillCategories[maxes[i]]
            weeklyRecorded += ", "
            i++
        }
        this.setState({
            mostRecordedWeekly: weeklyRecorded,
            loading: false
        })

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

    handleCalendarPress = () => {
        var toggle = this.state.weekMonthYear
        switch(toggle){
            case "week":
                this.setState({weekMonthYear: "month", displayData: this.state.reflectionStatsMonthly})
                break;
            case "month":
                this.setState({weekMonthYear: "year", displayData: this.state.reflectionStatsYearly})
                break;
            case "year":
                this.setState({weekMonthYear: "week", displayData: this.state.reflectionStatsWeekly})
                break;
        }
    }

    render() {
        return (
            <View style={styles.chart}>
                {this.state.loading ? <Text>2 seconds brother</Text> :
                    <PieChart
                        style={{ height: 200 }}
                        data={this.state.displayData
                            .filter((value) => value >= 0)
                            .map((value, index) => ({
                                value,
                                svg: {
                                    fill: this.state.color[index],
                                    onPress: () => console.log('press', index),
                                },
                                key: `pie-${index}`,
                            }))}
                    />
                }
                <Text style={styles.midText1}>{this.state.displayData[0] + " Reflections on Self Management this " + this.state.weekMonthYear}</Text>
                <Text style={styles.midText2}>{this.state.displayData[1] + " Reflections on Social Intelligence this " + this.state.weekMonthYear}</Text>
                <Text style={styles.midText3}>{this.state.displayData[2] + " Reflections on Innovation this " + this.state.weekMonthYear}</Text>
                <Text style={styles.midText}>{this.state.weeklyPlural ? "Your most reflected skills this week: " + this.state.mostRecordedWeekly : "Your most reflected skill this week: " + this.state.mostRecordedWeekly}</Text>
                <AntDesign name="calendar" size={62} color="black" style={{ alignSelf: 'center' }} onPress={() => this.handleCalendarPress()} />
            </View>


        );
    };
}
const styles = StyleSheet.create({
    midText: {
        fontSize: 20,
        padding: 20
    },
    midText1: {
        fontSize: 20,
        padding: 20,
        color: '#4677D6'
    },
    midText2: {
        fontSize: 20,
        padding: 20,
        color: '#FF5D60'
    },
    midText3: {
        fontSize: 20,
        padding: 20,
        color: '#FFC530'
    },
    chart: {
        flex: 1
    },
    big: {
        flex: 2
    }
})