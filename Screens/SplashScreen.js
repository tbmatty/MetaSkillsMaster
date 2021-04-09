import React, { Component } from 'react';
import { render } from 'react-dom';
import { View, Text, Button, ActivityIndicator } from 'react-native';
import * as firebase from "firebase";
import { CommonActions } from '@react-navigation/native';
import { NotificationTimeoutError } from 'expo-notifications';
import { format } from 'date-fns';



export default class SplashScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            confused: true,
        }
    }



    componentDidMount() {




        firebase.auth().onAuthStateChanged((user) => {
            // console.log(user);
            if (!user) {
                // this.setState({ user });
                //signedOut = true;
                this.props.navigation.dispatch(
                    CommonActions.reset({
                        index: 1,
                        routes: [
                            { name: 'Login' },
                        ],
                    })
                );
                //this.props.navigation.navigate("Login");
            } else {
                const usersRef = firebase.firestore().collection('Users').doc(user.uid)
                usersRef.get()
                    .then((docSnapshot) => {
                        if (!docSnapshot.exists) {
                            console.log("HELLO")
                            var userName = "User"+JSON.stringify(Math.floor(100000 + Math.random() * 900000))
                            usersRef.set({
                                email: user.email,
                                notificationTime: 17,
                                notificationTimeMinutes: 30,
                                xp: 0,
                                ConsecutiveDays: 0,
                                name: userName,
                                LeaderboardUsers: [],
                                LeaderboardWeek: "",
                                profilePicURI: "https://www.ragroup.co.uk/wp-content/uploads/2018/11/placeholder-profile-sq.jpg",
                                description: "Soon to be reflecting genius..."
                            }) // create the document
                        } else {
                            //Update Consecutive Days
                            var usersLastDate = docSnapshot.data().lastDate
                            var yesterday = new Date();
                            yesterday.setDate(yesterday.getDate() - 1);
                            var yesterdayFormat = format(yesterday, "dd-MM-yyyy")
                            var today = new Date()
                            today = format(today, "dd-MM-yyyy")
                            if(usersLastDate != yesterdayFormat && usersLastDate != today){
                                usersRef.set({
                                    ConsecutiveDays: 0
                                },{merge:true})
                            }
                        }
                    });

                const badgesRef = firebase.firestore().collection('BadgeProgress').doc(user.uid)
                badgesRef.get()
                    .then((docSnapshot) => {
                        if (!docSnapshot.exists) {
                            console.log("HELLO")
                            badgesRef.set({
                                Consistency: 0,
                                Innovation: 0,
                                SelfManagements: 0,
                                SocialAwareness: 0
                            }) // create the document
                        }
                    });
                this.props.navigation.dispatch(
                    CommonActions.reset({
                        index: 1,
                        routes: [
                            { name: 'Home' },
                        ],
                    })
                );
                // this.setState({ user: null });
                //signedOut = false;
                //this.props.navigation.navigate("Home");
            }
        });

    }




    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <ActivityIndicator  size="large" color="blue" />
            </View>
        )
    }
}
