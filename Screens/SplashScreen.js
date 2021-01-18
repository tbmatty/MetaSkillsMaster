import React, { Component } from 'react';
import { render } from 'react-dom';
import { View, Text, Button } from 'react-native';
import * as firebase from "firebase";
import { CommonActions } from '@react-navigation/native';
import { NotificationTimeoutError } from 'expo-notifications';



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
                            usersRef.set({
                                email: user.email,
                                notificationTime: -1,
                                notificationTimeMinutes: -1
                            }) // create the document
                        } else {
                            console.log("HEY")
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
                <Text>Loading</Text>
            </View>
        )
    }
}
