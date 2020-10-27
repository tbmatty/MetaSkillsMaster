import React, { Component } from 'react';
import { render } from 'react-dom';
import { View, Text, Button } from 'react-native';
import * as firebase from "firebase";

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            billybob: ""
        }
    }

    handleBillyBob = async () => {
        let getVal = await firebase.firestore().collection("Users").doc("billybob").get().then(doc => {
            let billybob = doc.data().Name;
            console.log("Hello");
            console.log(billybob);
            if(!firebase.auth().currentUser){
                console.log("Remembers");
            }else{
                console.log("No comprende");
            }
            this.setState({ billybob });
        })
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Home Screen</Text>
                <Button title="Go to Skills" onPress={() => { this.props.navigation.navigate('Skills', { parameterPass: 'anything you want here', }); }} />
                <Button title="Go to Sign Up" onPress={() => this.props.navigation.navigate('SignUp')} />
                <Button title="Go to Sign In" onPress={() => this.props.navigation.navigate('Login')} />
                <Button title="BILLY BOB !" onPress={this.handleBillyBob} />
                <Text>{this.state.billybob}</Text>
            </View>
        );
    };

}