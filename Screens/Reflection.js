import React, { Component } from 'react';
import { render } from 'react-dom';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import { Entypo, AntDesign } from '@expo/vector-icons';


export default class Reflection extends Component {
    constructor(props) {
        super(props);
        this.state = {

            colours: {
                "0": "red",
                "1": "blue",
                "2": "yellow"
            },
            skillCategories: {
                "0": "Self Management",
                "1": "Focussing",
                "2": "Integrity",
                "3": "Adapting",
                "4": "Initiative",
                "5": "Social Intelligence",
                "6": "Communicating",
                "7": "Feeling",
                "8": "Collaborating",
                "9": "Leading",
                "10": "Innovation",
                "11": "Curiosity",
                "12": "Creativity",
                "13": "Sense Making",
                "14": "Critical Thinking"
            },
        }
    }



    surelyNot = async (uri) => {
        const playbackObject = await Audio.Sound.createAsync(
            { uri: uri },
            { shouldPlay: true }
        );
    }

    render() {
        const { firebaseData } = this.props.route.params
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={styles.titleText}>{firebaseData[1]}</Text>
                {firebaseData[2].map((item) => (

                    <Text style={{ color: firebaseData[5] }} key={item}>{this.state.skillCategories[item]}</Text>
                ))
                }
                <Text>{firebaseData[3]}</Text>
                <Text>{firebaseData[7]}</Text>
                <Button title="doobydoo" onPress={() => this.surelyNot(firebaseData[4])} />
            </View>
        );
    };

}

const styles = StyleSheet.create({
    titleText: {
        padding: 8,
        fontSize: 32,
        textAlign: 'left',
        fontWeight: 'bold',
        color: 'black',
    },
    subHeadingText: {
        padding: 8,
        fontSize: 24,
        textAlign: 'left',
        fontWeight: 'bold',
        color: 'black'
    },
    bodyText: {
        paddingLeft: 16,
        fontSize: 16,
        textAlign: 'left',
        color: 'black',
    },
    red: {
        paddingLeft: 16,
        fontSize: 16,
        textAlign: 'left',
        color: 'red',
    },
    container: {
        backgroundColor: '#FF5D60',
        flex: 1,
    }
}
)