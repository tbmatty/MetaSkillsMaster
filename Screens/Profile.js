import React, {Component} from 'react';
import { render } from 'react-dom';
import { View, Text, Button } from 'react-native';
import * as firebase from "firebase";

export default class Profile extends Component {
    constructor(props) {
        super(props); 
    }


render(){
    return(
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Log out ya dafty</Text>
            <Button title="Log out" onPress={() => firebase.auth().signOut()} />
        </View>
    );
};
}