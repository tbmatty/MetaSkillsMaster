import React, { Component } from 'react';
import { render } from 'react-dom';
import { View, Text, Button, TextInput, StyleSheet, ScrollView } from 'react-native';
import { PieChart } from "react-native-svg-charts";
import { Entypo } from '@expo/vector-icons';

export default class detailedStats extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
            color: ['#4677D6', '#FF5D60', '#FFC530'],
            sadFace: false,
        }
    }


    componentDidMount = () => {
        if (this.props.route.params.reflectionCount === 0) {
            //A sad face is used in place of a pie chart when the user doesn't have any reflections
            this.setState({ sadFace: true })
        }
    }



    render() {
        return (
            <View style={{ flex: 6 }}>
                <View style={{ flex: 2 }}>
                    {this.state.sadFace ?
                        <View style={{ alignItems: "center", justifyContent: "center", flex: 3 }}>
                            <Entypo name="emoji-sad" size={82} color="black" />
                        </View> :
                        <PieChart
                            style={styles.pie}
                            data={this.props.route.params.pieData
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
                <View style={{ flex: 1, paddingTop: 30, paddingBottom: 10 }}>
                    <View style={{ flex: 3, flexDirection: "column", backgroundColor: "red" }}>
                        <View style={{ flex: 1, backgroundColor: '#4677D6' }}>
                            <Text style={styles.pieInfoTextWhite}>Self Management Related Reflections: {this.props.route.params.pieData[0]}</Text>
                        </View>
                        <View style={{ flex: 1, backgroundColor: '#FF5D60' }}>
                            <Text style={styles.pieInfoTextWhite}>Social Awareness Related Reflections: {this.props.route.params.pieData[1]}</Text>
                        </View>
                        <View style={{ flex: 1, backgroundColor: '#FFC530' }}>
                            <Text style={styles.pieInfoText}>Innovation Related Reflections: {this.props.route.params.pieData[2]}</Text>
                        </View>
                    </View>

                </View>
                <View style={{ flex: 3 }}>
                    <Text style={{ textAlign: "center", paddingVertical: 12, fontSize: 20 }}>The nitty gritty stats!</Text>
                    <ScrollView>
                        {this.props.route.params.detailedStats.map((item, index) =>
                            <Text style={styles.pieInfoText} key={index}>{this.state.skillCategories[index]}: reflected on {item} times</Text>
                        )}
                    </ScrollView>
                </View>
            </View>
        );
    };
}

const styles = StyleSheet.create({
    pie: {
        height: 250,
        paddingTop: 20
    },
    pieInfoText: {
        fontSize: 16,
        padding: 8,
        textAlign: "center"
    },
    pieInfoTextWhite: {
        fontSize: 16,
        padding: 8,
        textAlign: "center",
        color: "white"
    }
})