import React, { Component } from 'react';
import { render } from 'react-dom';
import { View, Text, Button } from 'react-native';
import * as firebase from "firebase";


export default class SplashScreen extends Component {
    constructor(props) {
        super(props);
        this.state={
            confused : true,
        }
    }



    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            console.log(user);
            if (!user) {
                // this.setState({ user });
                //signedOut = true;
                this.props.navigation.navigate("Login");
            } else {
                // this.setState({ user: null });
                //signedOut = false;
                this.props.navigation.navigate("Home");
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
