import React, { Component } from 'react';
import { render } from 'react-dom';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as firebase from "firebase";
import { CommonActions } from '@react-navigation/native';
import { NotificationTimeoutError } from 'expo-notifications';
import DateTimePicker from '@react-native-community/datetimepicker';



export default class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            confused: true,
            userData: [],
            show:false,
            date: new Date(),
            mode: 'time'

        }
    }

    componentDidMount = () => {
        this.getUserData()

    }

    
    onChange = (event, selectedDate) => {
        const currentDate = selectedDate || this.state.date;
       
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
        }, {merge:true})
        alert("New notification time set to " + hour + ":" + minute)
    };


    showDatePicker = () => {
        this.setState({
            show:true
        })
    };

    hideDatePicker = () => {
        this.setState({
            show:false
        })
    }

    getUserData = async () => {
        var uid = firebase.auth().currentUser.uid
        var userInfo = []
        let userRef = firebase.firestore().collection("Users").doc(uid).get().then(doc => {
            userInfo.push(doc.data().name, doc.data().description)
        })
        this.setState({ userData: userInfo })
    }


    render() {
        return (
            <View style={{ flex: 5 }}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.titleText}>Settings</Text>
                </View>
                <View style={{ flex: 4 }}>
                    <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate("editProfile")}>
                        <Text style={styles.buttonText}>Edit Profile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.showDatePicker()} style={styles.button}>
                        <Text style={styles.buttonText}>Set notification time</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => firebase.auth().signOut()}>
                        <Text style={styles.buttonText}>Sign out</Text>
                    </TouchableOpacity>
                </View>
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
        )
    }
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
        paddingTop: 20,
        textAlign: "center"
    },
    buttonText: {
        fontSize: 18,
        paddingLeft: 20
    }
})