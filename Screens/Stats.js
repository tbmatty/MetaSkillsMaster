import React, { Component } from 'react';
import { render } from 'react-dom';
import { View, Text, Button } from 'react-native';
import * as firebase from "firebase";
import { AntDesign } from '@expo/vector-icons';


export default class Stats extends Component {
    constructor(props) {
        super(props);
    }
    // componentDidMount = () => {
    //     this.props.navigation.setOptions({
    //         headerRight: () => (
    //             <TouchableOpacity onPress={() =>  this.props.navigation.navigate("Profile") }>
    //                 <AntDesign name="user" size={32} color="black" paddingRight="50" />
    //             </TouchableOpacity>),
    //     })
    // }


    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Button title="test" onPress={() => this.test}></Button>
            </View>
        );
    };
}