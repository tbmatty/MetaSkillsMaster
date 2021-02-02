import React, { Component } from 'react';
import { render } from 'react-dom';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import * as firebase from "firebase";
import DateTimePicker from '@react-native-community/datetimepicker';

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            mode: 'time',
            show: false
        }
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
                    <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate("Trophies")}>
                        <Text style={styles.buttonText}>Trophies</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate("Trophy")}>
                        <Text style={styles.buttonText}>Trophy</Text>
                    </TouchableOpacity>
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
        padding: 20
    },
    buttonText: {
        fontSize: 18,
        paddingLeft: 20
    }
})