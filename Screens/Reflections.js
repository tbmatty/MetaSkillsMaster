import React, { Component } from 'react';
import { render } from 'react-dom';
import { ScrollView, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as firebase from 'firebase'
import { roundToNearestMinutes } from 'date-fns';


export default class Reflections extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
            }
        }
    }




    handleButtonPress = (item) => {
        this.props.navigation.navigate("Reflection", { firebaseData: item })
    }

    render() {
        const { firebaseArray, monthYear } = this.props.route.params;
        return (
            <ScrollView contentContainerStyle={{
            }}>
                <Text style={styles.titleText}>{this.state.monthIntMap[monthYear.slice(0,2)] + " " +monthYear.slice(3,)}</Text>
                {firebaseArray.map((item) => (

                    <TouchableOpacity
                        style={{
                            padding: 20,
                            backgroundColor: item[1][5],
                            borderRadius: 4,
                            margin: 20
                        }}
                        key={item[0]}
                        onPress={() => this.handleButtonPress(item[1])}
                    >
                        <Text style={{
                             fontSize:18,
                             paddingLeft:20,
                             color: item[1][6]
                        }}
                        >{item[1][7]}</Text>
                    </TouchableOpacity>

                ))
                }
            </ScrollView>
        );
    };

}

const styles = StyleSheet.create({
    titleText:{
        fontSize:32,
        padding: 20
    }
})