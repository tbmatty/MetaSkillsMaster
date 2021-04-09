import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import { View, Text, TouchableOpacity, TextInput, Keyboard, Alert } from 'react-native';
import * as firebase from "firebase";

export default function SignUp(props) {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [password2, setPassword2] = useState("")
    const [userIsTyping, setUserIsTyping] = useState(false)

    const handleSignUp = () => {
        console.log("Yelo");
        try {
            firebase.auth().createUserWithEmailAndPassword(email, password)
        } catch (e) {
            Alert.alert("Error: " + e)
        }
    }

    const signUpPress = () => {
        if (password == password2 && password != "") {
            handleSignUp();
        } else {
            Alert.alert("Passwords don't match")
            console.log("Passwords dont match");
        }
    }

    const _keyboardDidShow = () => {
        setUserIsTyping(true)
    }

    const _keyboardDidHide = () => {
        console.log("Fired")
        setUserIsTyping(false)
    };

    useEffect(() => {
        Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
        Keyboard.addListener("keyboardDidHide", _keyboardDidHide);

        //Clean up function

        return () => {
            Keyboard.removeListener("keyboardDidShow", _keyboardDidShow),
                Keyboard.removeListener("keyboardDidHide", _keyboardDidHide)
        }
    }, []);


    return (
        <View style={{ flex: 5 }}>
            <View style={{ flex: 1 }}>
                <Text style={{ textAlign: "center", paddingTop: 50, fontSize: 38 }}>Sign up</Text>
            </View>
            <View style={{ flex: 1 }}>
                <View style={{ padding: 20 }}>
                    <TextInput
                        style={{ height: 50, borderColor: 'gray', borderWidth: 1, paddingLeft: 10 }}
                        placeholder="Email"
                        onChangeText={email => setEmail(email)}
                        value={email}
                    />
                </View>
                <View style={{ padding: 20 }}>
                    <TextInput
                        secureTextEntry={true}
                        style={{ height: 50, borderColor: 'gray', borderWidth: 1, paddingLeft: 10 }}
                        placeholder="Password"
                        onChangeText={password => setPassword(password)}
                        value={password}
                    />
                </View>
                <View style={{ padding: 20 }}>
                    <TextInput
                        secureTextEntry={true}
                        style={{ height: 50, borderColor: 'gray', borderWidth: 1, paddingLeft: 10 }}
                        placeholder="Password"
                        onChangeText={password => setPassword2(password)}
                        value={password2}
                    />
                </View>

            </View>
            <View style={{ flex: 1 }}>

            </View>
            {userIsTyping ? null :
                <TouchableOpacity style={{ flex: 1 }} onPress={() => signUpPress()}>
                    <View style={{ flex: 1, backgroundColor: "#b504a0" }}>
                        <Text style={{ textAlign: "center", paddingTop: 50, fontSize: 32, color: "white" }}>SIGN UP</Text>
                    </View>
                </TouchableOpacity>
            }
        </View>
    );
};