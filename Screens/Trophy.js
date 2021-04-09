import React, { Component } from 'react';
import { render } from 'react-dom';
import { View, Text, Button, TextInput} from 'react-native';
import * as firebase from "firebase";
import { FontAwesome5 } from '@expo/vector-icons';




export default class Trophy extends Component {
    constructor(props) {
        super(props);
        this.state={
            title:{
                0:"Self Management Novice",
                1:"Self Management Adept",
                2:"Self Management Master",
                3:"Social Awareness Novice",
                4:"Social Awareness Adept",
                5:"Social Awareness Master",
                6:"Innovation Novice",
                7:"Innovation Adept",
                8:"Innovation Master",
                9:"Consistency Novice",
                10:"Consistency Adept",
                11:"Consistency Master"
            },
            descriptions:{
                0:"Description: 10 Reflections including a skill from the Self Management category",
                1:"Description: 50 Reflections including a skill from the Self Management category",
                2:"Description: 100 Reflections including a skill from the Self Management category",
                3:"Description: 10 Reflections including a skill from the Social Awareness category",
                4:"Description: 50 Reflections including a skill from the Social Awareness category",
                5:"Description: 100 Reflections including a skill from the Social Awareness category",
                6:"Description: 10 Reflections including a skill from the Innovation category",
                7:"Description: 50 Reflections including a skill from the Innovation category",
                8:"Description: 100 Reflections including a skill from the Innovation category",
                9:"Description: 10 consecutive days of logging reflections",
                10:"Description: 50 consecutive days of logging reflections",
                11:"Description: 100 consecutive days of logging reflections",
            },
            trophyText:{
                0:"The Self Management Novice has only begun to explore the machinations of their own will power, determination, and grit. The Novice looks forward to coming challenges with a steely composure, ready for anything.",
                1:"The Self Management Adept has travelled far and wide, strengthening their resolve in the process, conquering beasts with sheer focus, presenting themselves with honour and integrity. What challenges could possibly phase such an Adept?",
                2:"The Self Management Master reaches the peak of the mountain and looks onward to see an even higher mountain. No mountain is too high, no valley is too low for the Master.",
                3:"The Social Awareness Novice begins to reflect on the travels they have with their merry band. They see how much there is to give and gain, and begin to deepen their understanding.",
                4:"The Social Awareness Adept and their merry band have travelled far and wide, made possible only by each other. The adept learns of a village in trouble and leads their merry band onwards, confident in the ability of their amazing leader.",
                5:"The Social Awareness Master and their merry band have now conquered all the land, and brought peace and prosperity with them. The Master is revered among all, the leader they didn't need, but the leader they deserved.",
                6:"The Innovation Novice one day noticed that their porridge didn't have to be so flavourless all the time and became the first person ever to add some sugar to their porridge, much to the delight of other porridge having people.",
                7:"The Innovation Adept, renowned for their innovation in the field of porridge eating the world over begins to refine their craft",
                8:"The Innovation Master enters the room, preparing to give what would be one of the most defining speeches in human history. There is a secret the Innovation Master has to share, and the room waits with baited breath. The Innovation Master announces, for the first time in human history, that ground cinnamon goes well with porridge.",
                9:"The Consistency Novice is building a home, one which they can live in for the rest of their life.",
                10:"The Consistency Adept looks over the progress so far, feeling accomplished at what they have built, but yet there is more to go.",
                11:"The Consistency Master has finished building their home, content in their sacrifice to this grand monument. Congratulations on making it to a 100 day streak! Wow!"
            },
            colour:{
                0: '#4677D6',
                1: '#4677D6',
                2: '#4677D6',
                3: '#FF5D60',
                4: '#FF5D60',
                5: '#FF5D60',
                6: '#FFC530',
                7: '#FFC530',
                8: '#FFC530',
                9: '#9932CC',
                10: '#9932CC',
                11: '#9932CC',
            },
            contentColour:{
                '#4677D6': "white",
                '#FF5D60': "white",
                '#FFC530': "black",
                '#9932CC': "white"
            }
        }
    }


    componentDidMount = () =>{
        this.props.navigation.setOptions({
            headerStyle: {
                backgroundColor: this.state.colour[this.props.route.params.id]
              },
            title: this.state.title[this.props.route.params.id],
            headerTitleStyle: { color: this.state.contentColour[this.state.colour[this.props.route.params.id]] }
        })
    }

    render() {
        const id = this.props.route.params.id
        return (
            <View style={{ flex: 7, backgroundColor: this.state.colour[id] }}>
                <View style={{ flex: 1, alignItems: 'center', paddingTop: 50, paddingBottom: 35 }}>
                    <FontAwesome5 name="award" size={128} color={this.state.contentColour[this.state.colour[id]]} />
                </View>
                <View style={{ alignItems: 'center' }}>
                    <Text style={{ fontSize: 22, color:this.state.contentColour[this.state.colour[id]]}}>{this.state.title[id]}</Text>
                </View>
                <View style={{ flex: 1, paddingTop: 20 }}>
                    <Text style={{ fontSize: 16, paddingLeft: 20, paddingTop: 15, color:this.state.contentColour[this.state.colour[id]] }}>{this.state.descriptions[id]}</Text>
                </View>
                <View style={{ flex: 3 }}>
                    <Text style={{ fontSize: 18, paddingLeft: 20, color:this.state.contentColour[this.state.colour[id]] }}>{this.state.trophyText[id]}</Text>
                </View>
            </View>
        );
    };
}