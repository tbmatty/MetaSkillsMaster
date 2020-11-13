import React, { Component } from 'react';
import { render } from 'react-dom';
import { ScrollView, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as firebase from 'firebase'
import { roundToNearestMinutes } from 'date-fns';


export default class Reflections extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }




    handleButtonPress = (item) => {
        this.props.navigation.navigate("Reflection", { firebaseData: item })
    }

    render() {
        const { firebaseArray } = this.props.route.params;
        return (
            <ScrollView contentContainerStyle={{
                flex: -1,
                justifyContent: 'space-between'
            }}>
                {firebaseArray.map((item) => (

                    <TouchableOpacity
                        style={{
                            padding: 20,
                            backgroundColor: item[1][5],
                            borderRadius: 4,
                            margin: 20
                        }}
                        key={item[0]}
                        onPress={() => this.handleButtonPress(item[1])}
                    >
                        <Text style={{
                             fontSize:18,
                             paddingLeft:20,
                             color: item[1][6]
                        }}
                        >{item[1][7]}</Text>
                    </TouchableOpacity>

                ))
                }
            </ScrollView>
        );
    };

}

const styles = StyleSheet.create({
    buttonText:{
       
    }
})