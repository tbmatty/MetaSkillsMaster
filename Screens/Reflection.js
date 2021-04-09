import React, { useEffect, useState } from 'react';
import { render } from 'react-dom';
import { ScrollView, View, Text, Button, StyleSheet, Alert, BackHandler } from 'react-native';
import { Audio } from 'expo-av';
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import * as firebase from "firebase";
import { HeaderBackButton } from '@react-navigation/stack';



export default function Reflection(props) {


    const colours = {
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
    }
    const skillCategories = {
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
    }
    const firebaseData = props.route.params.firebaseData
    const [playPause, setPlayPause] = useState("playcircleo")
    const [isPlaying, setIsPlaying] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false)
    const [playbackObject, setPlaybackObject] = useState(new Audio.Sound())
    const [audioExists, setAudioExists] = useState(true)

    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", backAction);

        props.navigation.setOptions({
            headerRight: () => (
                <FontAwesome name="trash-o" size={32} color="black" paddingRight="50" onPress={() => deleteReflectionAlert()} />
            ),
            headerLeft: () => (
                <HeaderBackButton onPress={() => backAction()} />
            )
        })

        if (firebaseData[4] === "") {
            setAudioExists(false)
        }



        return () => {
            BackHandler.removeEventListener("hardwareBackPress", backAction)
        }
    }, [])

    const backAction = async () => {
        try {
            var promiseToCatch = stopPlaying()
            promiseToCatch.then(function () {
                console.log("Promise resolved")
            }).catch(function () {
                console.log("Promise rejected")
            })
        } catch (e) {
            console.log(e)
        }
        props.navigation.goBack()
    }


    const stopPlaying = async() =>{
        await playbackObject.unloadAsync()
    }



    const deleteReflectionAlert = () => {
        Alert.alert("Hold on!", "Are you sure you want to delete this reflection?", [
            {
                text: "Cancel",
                onPress: () => null,
                style: "cancel"
            },
            { text: "YES", onPress: () => deleteReflection() }
        ]);
        return true;
    }

    const deleteReflection = async () => {
        console.log(firebaseData)
        let uid = await firebase.auth().currentUser.uid
        console.log(uid)
        let firebaseRef = firebase.firestore().collection("Recordings").doc(uid).collection("Recordings").doc(firebaseData[3])
        firebaseRef.delete()
        //Could potentially go back, need listener for prop in Reflections.js
        try {
            await playbackObject.unloadAsync()
        } catch (e) {
            console.log(e)
        }
        Alert.alert("Reflection Deleted")
        props.navigation.navigate("MonthSelector")
    }





    const _onPlaybackStatusUpdate = playbackStatus => {
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
                playbackObject.unloadAsync()
                setIsLoaded(false)
                setPlayPause("playcircleo")
                setIsLoaded(false)
            }
            // etc
        }
    };

    // Load the playbackObject and obtain the reference.


    const playRecording = async (uri) => {
        if (isLoaded === false) {
            await playbackObject.loadAsync({ uri: uri }, { shouldPlay: true })
            playbackObject.setOnPlaybackStatusUpdate(_onPlaybackStatusUpdate);
            setIsLoaded(true)
        } else {
            await playbackObject.playAsync()
        }

    }

    const pauseRecording = async () => {
        await playbackObject.pauseAsync()
        setPlayPause("playcircleo")
    }

    const handlePlayPause = (uri) => {
        if (isPlaying === false) {
            setPlayPause("pause")
            setIsPlaying(true)
            playRecording(uri)
        } else {
            setPlayPause("playcircleo")
            setIsPlaying(false)
            pauseRecording()
        }
    }

    //
    //
    //
    //
    //
    //
    //
    //
    //


    return (
        // <ScrollView>
        //     <Text style={styles.titleText}>{firebaseData[7]}</Text>
        // {firebaseData[2].map((item) => (
        //     <Text
        //         style={{
        //             color: colours[item],
        //             paddingLeft: 20,
        //             fontWeight: "bold"
        //         }}
        //         key={item}
        //     >
        //         {skillCategories[item]}
        //     </Text>
        //     ))
        //     }
        //     <Text style={styles.bodyText}>{firebaseData[1]}</Text>
        //     {audioExists? <AntDesign name={playPause} size={52} color="black" style={{ alignSelf: 'center' }} onPress={() => handlePlayPause(firebaseData[4])} /> : null}
        //     <Text style={styles.dateText}>{"You recorded this on " + firebaseData[3].slice(1, 11) + " at " + firebaseData[3].slice(12, 20) + "TAKE A PEAK: " + firebaseData[3]}</Text>
        // </ScrollView>
        <View style={{ flex: 8 }}>
            <View style={{ flex: 1, padding: 22, alignItems: 'center' }}>
                <Text style={styles.titleText}>{firebaseData[7]}</Text>
                <ScrollView horizontal style={{ paddingRight: 14 }}>
                    {firebaseData[2].map((item) => (
                        <Text
                            style={{
                                color: colours[item],
                                paddingLeft: 20,
                                fontWeight: "bold",
                                fontSize: 16
                            }}
                            key={item}
                        >
                            {skillCategories[item]}
                        </Text>
                    ))
                    }
                </ScrollView>
            </View>
            {audioExists ?
                <View style={{ flex: 1, paddingTop: 25 }}>
                    <AntDesign name={playPause} size={52} color="black" style={{ alignSelf: 'center' }} onPress={() => handlePlayPause(firebaseData[4])} />
                </View>
                : null}
            <View style={{ flex: 6, alignItems: 'center' }}>
                <ScrollView>
                    <Text style={styles.bodyText}>{firebaseData[1]}</Text>
                </ScrollView>
                <Text>{"You recorded this on " + firebaseData[3].slice(1, 11) + " at " + firebaseData[3].slice(12, 20)}</Text>
            </View>
        </View>



    );

}

const styles = StyleSheet.create({
    titleText: {
        paddingVertical: 8,
        fontSize: 32,
        textAlign: 'center',
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