import React, { Component } from 'react';
import { render } from 'react-dom';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import * as firebase from "firebase";
import { AntDesign, Entypo } from '@expo/vector-icons';
import { format, startOfWeek } from 'date-fns';
import { PieChart } from "react-native-svg-charts";



export default class Stats extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
            sadFace1: false,
            sadFace2: false,
            sadFace3: false,
            displayData: [],
            color: ['#4677D6', '#FF5D60', '#FFC530']
        }
    }

    componentDidMount() {
        
        var sadFace1
        var sadFace2
        var sadFace3


        if (this.props.route.params.weeklyCount === 0) {
            sadFace1 = true
        } else {
            sadFace1 = false
        }
        if (this.props.route.params.monthlyCount === 0) {
            sadFace2 = true
        } else {
            sadFace2 = false
        }
        if (this.props.route.params.yearlyCount === 0) {
            sadFace3 = true
        } else {
            sadFace3 = false
        }

        this.setState({
            sadFace1:sadFace1,
            sadFace2:sadFace2,
            sadFace3:sadFace3
        })
    }



    render() {
        return (
            <View style={{ flex: 3 }}>
                <TouchableOpacity style={{ flex: 1 }} onPress={() => this.props.navigation.navigate("detailedStats", { pieData: this.props.route.params.pieDataWeekly, detailedStats: this.props.route.params.detailedWeeklyStats, reflectionCount:this.props.route.params.weeklyCount })} >
                    <View style={styles.container}>
                        <View style={{ flex: 7 }}>
                            <View style={styles.titleSpace}>
                                <Text style={styles.titleText}>
                                    Your Weekly Stats
                            </Text>
                            </View>
                            <View style={styles.contentContainer}>
                                <View style={styles.pieChartContainer}>
                                    {this.state.sadFace1 ?
                                        <View style={{ alignItems: "center", justifyContent: "center", flex: 3 }}>
                                            <Entypo name="emoji-sad" size={65} color="black" />
                                        </View> :
                                        <PieChart
                                            style={styles.pie}
                                            data={this.props.route.params.pieDataWeekly
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
                                </View>
                                <View style={styles.reflectionTextContainer}>
                                    <Text style={styles.reflectionText}>Reflections:</Text>
                                    <View style={styles.numTextContainer}>
                                        <Text style={{ textAlign: "center", paddingTop: 18, fontSize: 38 }}>{this.props.route.params.weeklyCount}</Text>
                                    </View>
                                </View>

                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={{ flex: 1 }} onPress={() => this.props.navigation.navigate("detailedStats", { pieData: this.props.route.params.pieDataMonthly, detailedStats: this.props.route.params.detailedMonthlyStats, reflectionCount:this.props.route.params.monthlyCount })} >
                    <View style={styles.container}>
                        <View style={{ flex: 7 }}>
                            <View style={styles.titleSpace}>
                                <Text style={styles.titleText}>
                                    Your Monthly Stats
                            </Text>
                            </View>
                            <View style={styles.contentContainer}>
                                <View style={styles.pieChartContainer}>
                                    {this.state.sadFace2 ?
                                        <View style={{ alignItems: "center", justifyContent: "center", flex: 3 }}>
                                            <Entypo name="emoji-sad" size={65} color="black" />
                                        </View> :
                                        <PieChart
                                            style={styles.pie}
                                            data={this.props.route.params.pieDataMonthly
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
                                </View>
                                <View style={styles.reflectionTextContainer}>
                                    <Text style={styles.reflectionText}>Reflections:</Text>
                                    <View style={styles.numTextContainer}>
                                        <Text style={{ textAlign: "center", paddingTop: 18, fontSize: 38 }}>{this.props.route.params.monthlyCount}</Text>
                                    </View>
                                </View>

                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={{ flex: 1 }} onPress={() => this.props.navigation.navigate("detailedStats", { pieData: this.props.route.params.pieDataYearly, detailedStats: this.props.route.params.detailedYearlyStats, reflectionCount:this.props.route.params.yearlyCount })} >
                    <View style={styles.container}>
                        <View style={{ flex: 7 }}>
                            <View style={styles.titleSpace}>
                                <Text style={styles.titleText}>
                                    Your Yearly Stats
                            </Text>
                            </View>
                            <View style={styles.contentContainer}>
                                <View style={styles.pieChartContainer}>
                                    {this.state.sadFace3 ?
                                        <View style={{ alignItems: "center", justifyContent: "center", flex: 3 }}>
                                            <Entypo name="emoji-sad" size={65} color="black" />
                                        </View> :
                                        <PieChart
                                            style={styles.pie}
                                            data={this.props.route.params.pieDataYearly
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
                                </View>
                                <View style={styles.reflectionTextContainer}>
                                    <Text style={styles.reflectionText}>Reflections:</Text>
                                    <View style={styles.numTextContainer}>
                                        <Text style={{ textAlign: "center", paddingTop: 18, fontSize: 38 }}>{this.props.route.params.yearlyCount}</Text>
                                    </View>
                                </View>

                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
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
    },
    container: {
        flex: 1,
        borderRadius: 10,
        backgroundColor: "white",
        margin: 18,
        borderColor: "grey",
        borderWidth: 2
    },
    titleSpace: {
        flex: 1,
        backgroundColor: "white",
        borderRadius: 10,
        alignItems: "center",
        borderBottomColor: "grey",
        borderWidth: 2,
        borderLeftColor: "white",
        borderRightColor: "white",
        borderTopColor: "white",
        borderBottomEndRadius: 0,
        borderBottomStartRadius: 0
    },
    contentContainer: {
        flex: 6,
        backgroundColor: "white",
        borderRadius: 10,
        flexDirection: "row"
    },
    pieChartContainer: {
        flex: 3,
        backgroundColor: "white",
        borderRadius: 10
    },
    pie: {
        height: 150,
        paddingTop: 20
    },
    reflectionTextContainer: {
        flex: 4,
        backgroundColor: "white",
        flexDirection: "column",
        borderRadius: 10
    },
    titleText: {
        fontSize: 20,
        fontWeight: "300"
    },
    reflectionText: {
        textAlign: "center",
        paddingTop: 18,
        fontSize: 24,
    },
    numTextContainer: {
        flex: 2,
        backgroundColor: "white",
        alignContent: "center",
        borderRadius: 10
    },
    numText: {
        textAlign: "center",
        paddingTop: 18,
        fontSize: 38
    }

})