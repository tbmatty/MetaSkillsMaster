import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import { View, Text, TouchableOpacity, TextInput, Keyboard, Alert } from 'react-native';
import * as firebase from "firebase";

export default function Login(props) {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [userIsTyping, setUserIsTyping] = useState(false)

    const handleSignIn = () => {
        try {
            firebase.auth().signInWithEmailAndPassword(email, password);
        } catch (e) {
            Alert.alert("Incorrect Login Details: " + e)
        }
    }


    const _keyboardDidShow = () => {
        setUserIsTyping(true)
    }

    const _keyboardDidHide = () => {
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
                <Text style={{ textAlign: "center", paddingTop: 50, fontSize: 38 }}>Welcome!</Text>
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

            </View>
            <View style={{ flex: 1 }}>
            </View>
            {userIsTyping ? null :
                <View style={{ flex: 2 }}>

                    <TouchableOpacity style={{ flex: 1 }} onPress={() => handleSignIn()}>
                        <View style={{ flex: 1, backgroundColor: "#3f83ba" }}>
                            <Text style={{ textAlign: "center", paddingTop: 50, fontSize: 32, color: "white" }}>LOG IN</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flex: 1 }} onPress={() => props.navigation.navigate('SignUp')}>
                        <View style={{ flex: 1, backgroundColor: "#b504a0" }}>
                            <Text style={{ textAlign: "center", paddingTop: 50, fontSize: 32, color: "white" }}>SIGN UP</Text>
                        </View>
                    </TouchableOpacity>

                </View>
            }
        </View>
    );
};
