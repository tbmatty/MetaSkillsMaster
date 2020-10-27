import React, { Component } from 'react';
import { render } from 'react-dom';
import { View, Text, Button, TextInput } from 'react-native';
import * as firebase from "firebase";

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state={
            email : "",
            password : "",
        }
    }

    handleSignIn = () =>{
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password);
        console.log(firebase.auth().currentUser);
        this.props.navigation.navigate('Home');
    }

    // signUpPress = () =>{
    //     if(this.state.password==this.state.password2 && this.state.password!=""){
    //         this.handleSignUp();
    //     }else{
    //         //Handle incorrect passwords
    //         console.log("Passwords dont match");
    //     }
    // }


    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Sign up page</Text>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    placeholder = "Email"
                    onChangeText={email => this.setState({email})}
                    value={this.state.email}
                />
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    placeholder = "Password"
                    onChangeText={password => this.setState({password})}
                    value={this.state.password}
                />
                <Button title="Sign Up" onPress={this.handleSignIn} />
                <Button title="Go to Home" onPress={() => console.log(firebase.auth().currentUser)} />

            </View>
        );
    };
}