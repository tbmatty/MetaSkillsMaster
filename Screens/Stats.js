import React, { Component } from 'react';
import { render } from 'react-dom';
import { View, Text, Button, StyleSheet } from 'react-native';
import * as firebase from "firebase";
import { AntDesign } from '@expo/vector-icons';
import { format, startOfWeek } from 'date-fns';
import { ECharts } from "react-native-echarts-wrapper";
import {Chart,
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,} from "expo-chart-kit";

export default class Stats extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displaySelfManagement: "5",
            weekMonthYear: "week",
            weekStats: [],
            monthStats: [],
            yearStats: [],
            threeWeekly: [],
            threeMonthly: [],
            threeYearly: [],
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
            }
        }
    }

    componentDidMount() {
        this.getFirebaseDataAsync()
    }


    getFirebaseDataAsync = async () => {
        this.test
        var statArray
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
                }
                if (doc.data().date.slice(3, 5) === thisMonth) {
                    i = 0
                    while (i < doc.data().statArray.length) {
                        monthStats[i] += doc.data().statArray[i]
                        i++
                    }
                }
                i = 0
                while (i < doc.data().statArray.length) {
                    yearStats[i] += doc.data().statArray[i]
                    i++
                }
            })
        })
        this.setState({
            monthStats: monthStats,
            yearStats: yearStats
        })



        var threeWeekly = []
        console.log(weekStats)
        console.log(monthStats)
        console.log(yearStats)


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
            mostRecordedWeekly: weeklyRecorded
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



    render() {
        const chartConfig = {
            backgroundGradientFrom: "#1E2923",
            backgroundGradientFromOpacity: 0,
            backgroundGradientTo: "#08130D",
            backgroundGradientToOpacity: 0.5,
            color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
            strokeWidth: 2, // optional, default 3
            barPercentage: 0.5,
            decimalPlaces: 0,
            fromZero:true,
            useShadowColorFromDataset: false // optional
        };
        const data = {
            labels: ["January", "February", "March"],
            datasets: [
                {
                    data: [20, 45, 28]
                }
            ]
        };
        return (

            <View style={styles.chart}>

                <BarChart
                    style={{margin:8}}
                    data={data}
                    showValuesOnTopOfBars={true}
                    fromZero={true}
                    width={380}
                    height={380}
                    yAxisLabel="$"
                    chartConfig={chartConfig}
                    verticalLabelRotation={30}
                />
                {/* <ECharts
                        legacyMode
                        option={{
                            xAxis: {
                                type: "category",
                                data: ["Self Management", "Socnce", "Innovation"]
                            },
                            yAxis: {
                                type: "value"
                            },
                            series: [
                                {
                                    data: [this.state.threeMonthly[0], this.state.threeMonthly[1], this.state.threeMonthly[2]],
                                    type: "bar"
                                }
                            ]
                        }
                        }>
                    </ECharts> */}

                {/* <Text style={styles.midText}>{this.state.threeWeekly[0]+ " Reflections on Self Management this "+this.state.weekMonthYear}</Text>
                <Text style={styles.midText}>{this.state.threeWeekly[1]+ " Reflections on Social Intelligence this "+this.state.weekMonthYear}</Text>
                <Text style={styles.midText}>{this.state.threeWeekly[2]+ " Reflections on Innovation this "+this.state.weekMonthYear}</Text>
                <Text style={styles.midText}>{this.state.weeklyPlural? "Your most reflected skills this week: "+ this.state.mostRecordedWeekly:"Your most reflected skill this week: " + this.state.mostRecordedWeekly}</Text> */}
            </View>


        );
    };
}
const styles = StyleSheet.create({
    midText: {
        fontSize: 20,
        padding: 20
    },
    chart: {
        flex: 1
    },
    big: {
        flex: 2
    }
})