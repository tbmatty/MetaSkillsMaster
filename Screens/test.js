import React, {Component} from 'react';
import { render } from 'react-dom';
import { View, Text, Button, ScrollView, StyleSheet } from 'react-native';
import * as firebase from "firebase";
import { Entypo } from '@expo/vector-icons'; 

export default class test extends Component {
    constructor(props) {
        super(props); 
    }


render(){
    return(
        <View style={{flex:1}}>
            <View style={styles.row}>
                <View style={styles.column}>
                <Entypo name="new-message" size={42} color="black" />
                </View>
                <View style={styles.column}>
                <Entypo name="new-message" size={42} color="black" />
                </View>
                <View style={styles.column}>
                <Entypo name="new-message" size={42} color="black" />
                </View>
            </View>
            <View style={styles.row}>
                <View style={styles.column}>
                <Entypo name="new-message" size={42} color="black" />
                </View>
                <View style={styles.column}>
                <Entypo name="new-message" size={42} color="black" />
                </View>
                <View style={styles.column}>
                <Entypo name="new-message" size={42} color="black" />
                </View>
            </View>
            <View style={styles.row}>
                <View style={styles.column}>
                <Entypo name="new-message" size={42} color="black" />
                </View>
                <View style={styles.column}>
                <Entypo name="new-message" size={42} color="black" />
                </View>
                <View style={styles.column}>
                <Entypo name="new-message" size={42} color="black" />
                </View>
            </View>
            <View style={styles.row}>
                <View style={styles.column}>
                <Entypo name="new-message" size={42} color="black" />
                </View>
                <View style={styles.column}>
                <Entypo name="new-message" size={42} color="black" />
                </View>
                <View style={styles.column}>
                <Entypo name="new-message" size={42} color="black" />
                </View>
            </View>
            <View style={styles.row}>
                <View style={styles.column}>
                <Entypo name="new-message" size={42} color="black" />
                </View>
                <View style={styles.column}>
                <Entypo name="new-message" size={42} color="black" />
                </View>
                <View style={styles.column}>
                <Entypo name="new-message" size={42} color="black" />
                </View>
            </View>
        </View>
    );
};
}

const styles = StyleSheet.create({
    row:{
        flexDirection:'row', flex:3, paddingVertical: 20
    },
    column:{
        flex:1, alignItems:'center', justifyContent:'center'
    }


})