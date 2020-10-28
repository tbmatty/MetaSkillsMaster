import React, { Component } from 'react';
import { render } from 'react-dom';
import { View, Text, Button, TextInput } from 'react-native';
import * as firebase from "firebase";

export default class SignUp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            password2: "",
        }
    }

    handleSignUp = () => {
        console.log("Yelo");
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
    }

    signUpPress = () => {
        if (this.state.password == this.state.password2 && this.state.password != "") {
            this.handleSignUp();
        } else {
            //Handle incorrect passwords
            console.log("Passwords dont match");
        }
    }


    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Sign up page</Text>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    placeholder="Email"
                    onChangeText={email => this.setState({ email })}
                    value={this.state.email}
                />
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    placeholder="Password"
                    onChangeText={password => this.setState({ password })}
                    value={this.state.password}
                />
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    placeholder="Re-Enter Password"
                    onChangeText={password2 => this.setState({ password2 })}
                    value={this.state.password2}
                />
                <Button title="Sign Up" onPress={this.signUpPress} />
            </View>
        );
    };
}