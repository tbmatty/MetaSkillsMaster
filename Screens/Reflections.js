import React, { Component } from 'react';
import { render } from 'react-dom';
import { ScrollView, Text, Button } from 'react-native';
import * as firebase from 'firebase'
import { roundToNearestMinutes } from 'date-fns';


export default class Reflections extends Component {
    constructor(props) {
        super(props);
        this.state={
        }
    }




    handleButtonPress = (item) =>{
        this.props.navigation.navigate("Reflection", {firebaseData: item})
    }
    
    render() {
        const { firebaseArray } = this.props.route.params;
        return (
            <ScrollView contentContainerStyle={{
                flex: -1,
                justifyContent: 'space-between'
            }}>
                {firebaseArray.map((item) => (
                    
                    <Button
                        key={item[0]}
                        title={item[1][3]} //date
                        onPress={() => this.handleButtonPress(item[1])}
                    />

                ))
                }
            </ScrollView>
        );
    };

}