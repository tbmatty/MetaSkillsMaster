import React, { Component, useState, useEffect, useRef } from 'react';
import { render } from 'react-dom';
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';
import * as firebase from "firebase";




export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            billybob: "",
            expoPushToken: ''
        }
    }

    


//General workflow for file upload
handleUpload = async () => {
    var storage = firebase.storage();
    var storageRef = storage.ref();
    var testRef = storageRef.child('test/test.txt');
    var testMessage = 'testing123';
    testRef.putString(testMessage).then(function (snapshot) {
        console.log("U CANT EVEN FINISH IT");
    });
}





render() {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate("RecordReflection")}>
                <Text style={styles.buttonText}>Record a Reflection</Text>
            </TouchableOpacity>
        </View>
    );
};

}
const styles = StyleSheet.create({
    button: {
        padding: 20,
        backgroundColor: "blue",
        borderRadius: 4,
        margin: 20
    },
    buttonText: {
        fontSize: 18,
        paddingLeft: 20,
        color: "white"
    }
})