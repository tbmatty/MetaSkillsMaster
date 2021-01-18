import React, { Component } from 'react';
import { render } from 'react-dom';
import { View, Text, Button, TextInput } from 'react-native';
import * as firebase from "firebase";
import { FontAwesome5 } from '@expo/vector-icons';




export default class Trophy extends Component {
    constructor(props) {
        super(props);


    }




    render() {
        return (
            <View style={{ flex: 7 }}>
                <View style={{ flex: 1, alignItems: 'center', paddingTop: 50, paddingBottom: 35 }}>
                    <FontAwesome5 name="award" size={128} color="black" />
                </View>
                <View style={{ alignItems: 'center' }}>
                    <Text style={{ fontSize: 22 }}>Self Management Novice (Locked)</Text>
                </View>
                <View style={{ flex: 1, paddingTop: 20 }}>
                    <Text style={{ fontSize: 16, paddingLeft: 20, paddingTop: 15 }}>Description: 10 Reflections including a skill from the Self Management category</Text>
                    <Text style={{ fontSize: 16, paddingLeft: 20, paddingTop: 15 }}>Date achieved (Hideable)</Text>
                </View>
                <View style={{ flex: 3 }}>
                    <Text style={{ fontSize: 16, paddingLeft: 20 }}>The Self Management Novice has only begun to explore the machinations of their own will power, determination, fillibuster. The Novice looks forward to coming challenges with a steely composure, ready for anything.</Text>

                </View>
            </View>
        );
    };
}