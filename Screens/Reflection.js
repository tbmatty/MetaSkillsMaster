import React, { Component } from 'react';
import { render } from 'react-dom';
import { ScrollView, Text, Button, StyleSheet, Alert } from 'react-native';
import { Audio } from 'expo-av';
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import * as firebase from "firebase";


export default class Reflection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firebaseData:this.props.route.params.firebaseData,
            colours: {
                "0": "#4677D6",
                "1": "#4677D6",
                "2": "#4677D6",
                "3": "#4677D6",
                "4": "#4677D6",
                "5": "#FF5D60",
                "6": "#FF5D60",
                "7": "#FF5D60",
                "8": "#FF5D60",
                "9": "#FF5D60",
                "10": "#FFC530",
                "11": "#FFC530",
                "12": "#FFC530",
                "13": "#FFC530",
                "14": "#FFC530"
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
            playPause: "playcircleo", // or 'pause'
            isPlaying: false,
            isLoaded: false,
        }
    }


    componentDidMount = () =>{
        this.props.navigation.setOptions({
            headerRight: () => (
                
                    <FontAwesome name="trash-o" size={32} color="black" paddingRight="50" onPress={()=>this.deleteReflectionAlert()}/>
                ),
        })
    }

    deleteReflectionAlert = () =>{
        Alert.alert("Hold on!", "Are you sure you want to delete this reflection?", [
            {
                text: "Cancel",
                onPress: () => null,
                style: "cancel"
            },
            { text: "YES", onPress: () => this.deleteReflection() }
        ]);
        return true;
    }

    deleteReflection = async() =>{
        console.log(this.state.firebaseData)
        let uid = await firebase.auth().currentUser.uid
        console.log(uid)
        let firebaseRef = firebase.firestore().collection("Recordings").doc(uid).collection("Recordings").doc(this.state.firebaseData[3])
        firebaseRef.delete()
        this.props.navigation.navigate("MonthSelector")
    }




    playbackObject = new Audio.Sound()

    _onPlaybackStatusUpdate = playbackStatus => {
        if (!playbackStatus.isLoaded) {
          // Update your UI for the unloaded state
          if (playbackStatus.error) {
            console.log(`Encountered a fatal error during playback: ${playbackStatus.error}`);
            // Send Expo team the error on Slack or the forums so we can help you debug!
          }
        } else {
          // Update your UI for the loaded state
      
          if (playbackStatus.isPlaying) {
            // Update your UI for the playing state
          } else {
            // Update your UI for the paused state
          }
      
          if (playbackStatus.isBuffering) {
            // Update your UI for the buffering state
          }
      
          if (playbackStatus.didJustFinish) {
            // The player has just finished playing and will stop. Maybe you want to play something else?
            this.playbackObject.unloadAsync()
            this.setState({
                isLoaded: false,
                playPause: "playcircleo",
                isPlaying: false
            })
          }
           // etc
        }
      };
      
       // Load the playbackObject and obtain the reference.

   
    playRecording = async (uri) => {
        if (this.state.isLoaded === false) {
            await this.playbackObject.loadAsync({ uri: uri }, { shouldPlay: true })
            this.playbackObject.setOnPlaybackStatusUpdate(this._onPlaybackStatusUpdate);
            this.setState({
                isLoaded: true
            })
        }else{
            await this.playbackObject.playAsync()     
        }

    }

    pauseRecording = async () => {
        await this.playbackObject.pauseAsync()
    }

    handlePlayPause = (uri) => {
        if (this.state.isPlaying === false) {
            this.setState({
                playPause: "pause",
                isPlaying: true
            })
            this.playRecording(uri)
        } else {
            this.setState({
                playPause: "playcircleo",
                isPlaying: false
            })
            this.pauseRecording()
        }
    }




    render() {
        const { firebaseData } = this.props.route.params
        return (
            <ScrollView>
                <Text style={styles.titleText}>{firebaseData[7]}</Text>
                {firebaseData[2].map((item) => (
                    <Text
                        style={{
                            color: this.state.colours[item],
                            paddingLeft: 20,
                            fontWeight: "bold"
                        }}
                        key={item}
                    >
                        {this.state.skillCategories[item]}
                    </Text>
                ))
                }
                <Text style={styles.bodyText}>{firebaseData[1]}</Text>
                <AntDesign name={this.state.playPause} size={52} color="black" style={{ alignSelf: 'center' }} onPress={() => this.handlePlayPause(firebaseData[4])} />
                <Text style={styles.dateText}>{"You recorded this on " + firebaseData[3].slice(1, 11) + " at " + firebaseData[3].slice(12, 20) + "TAKE A PEAK: "+firebaseData[3]}</Text>
            </ScrollView>
        );
    };

}

const styles = StyleSheet.create({
    titleText: {
        padding: 8,
        paddingLeft: 20,
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
        padding: 20,
        fontSize: 24,
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
    },
    dateText: {
        padding: 8,
        paddingLeft: 20,
        fontSize: 16,
        textAlign: 'left',
        color: 'black',
    }
}
)