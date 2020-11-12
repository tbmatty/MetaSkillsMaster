import React, { Component, useState } from 'react';
import { render } from 'react-dom';
import { View, Text, Button, SafeAreaView, StyleSheet, ScrollView, List, AsyncStorage } from 'react-native';
import * as firebase from "firebase";
import { TextInput } from 'react-native-gesture-handler';
import { format } from 'date-fns';
import SearchableDropdown from 'react-native-searchable-dropdown';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import { Entypo, AntDesign } from '@expo/vector-icons';


// NEEDS:
//      -Clean Up (Move submit to header top right, save icon)
//      -Playback of Recording (Halfway)
//      -CSS (Improvements always available, currently bearable)


export default class RecordReflection extends Component {


    constructor(props) {
        super(props);

        this.state = {

            textEntry: '',
            val: '',
            items: [
                { "id": "0", "name": "Self Management" },
                { "id": "1", "name": "Social Awareness" },
                { "id": "2", "name": "Innovation" }
            ],
            skillSelection: [["-1", "..."]],
            uploadURI: '',
            isRecording: false,
            timerOn: false,
            timerStart: 0,
            timerTime: 0,
            micColour: 'grey',
            playPause: "playcircleo", // or 'pause'
            isPlaybackAvailable: true,
            recordingURI: ''
        }
    }
    recording = new Audio.Recording()


    handleSubmit = async () => {
        // console.log(this.state.skillSelection)

        var items
        var array = []
        for (items in this.state.skillSelection) {
            array.push(items)
        }
        var date = format(new Date(), "dd-MM-yyyy");
        var uid = firebase.auth().currentUser.uid;


        // console.log(file)



        const uri = this.recording.getURI();
        this.setState({
            recordingURI: uri
        })
        const response = await fetch(uri);
        const blob = await response.blob();
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
            let base64 = reader.result;
            console.log(base64);
        };
        var storage = firebase.storage();
        var storageRef = storage.ref();
        var userRef = storageRef.child(uid);
        var dateRef = userRef.child(date);
        await dateRef.put(blob).then(function (snapshot) {
            console.log("U CANT EVEN FINISH IT");
        });

        await dateRef.getDownloadURL().then((url) => this.setState({
            uploadURI: url,
        }))


        console.log(this.state.uploadURI)




        // Upload completed successfully, now we can get the download URL



        let setVal = await firebase.firestore().collection("Recordings").doc(uid).collection("Recordings").doc(JSON.stringify(date)).set({
            textEntry: this.state.textEntry,
            categories: array,
            date: JSON.stringify(date),
            uri: this.state.uploadURI
        })


    }


    handleItemPress = (item) => {
        console.log(item)

        const copyDict = { ... this.state.items }
        delete copyDict[item.id]

        var i;

        for (i = 0; i < this.state.skillSelection.length; i++) {
            if (item.id == this.state.skillSelection[i][0]) {
                console.log("hello")
                alert("You have already included this ")
                return
            }
        }




        var check = this.state.skillSelection[0][0]
        if (check == "-1") {
            console.log("only once")
            this.setState({
                skillSelection: [[item.id, item.name]]
            })
        } else {
            var array = this.state.skillSelection
            array.push([item.id, item.name])
            console.log(array)
            // console.log(nuArray)
            this.setState({
                skillSelection: array
            })
        }
        // console.log(this.state.skillSelection);
    }

    handleRecordingPress = async () => {
        if (this.state.isRecording === false) {
            this.setState({
                isRecording: true,
                micColour: 'red'
            })
            this.requestio();
        } else {
            this.setState({
                isRecording: false,
                micColour: 'grey'
            })
            this.stopRecording();
        }
    }

    requestio = async () => {
        var huh = await Audio.requestPermissionsAsync();
        var heh = await Audio.getPermissionsAsync()
        console.log("huh")
        console.log(huh)
        console.log("heh")
        console.log(heh)
        console.log("hoh")
        var hoh = await this.recording.getStatusAsync()
        console.log(hoh)
        try {
            await this.recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
            await this.recording.startAsync();
            this.setState({
                timerOn: true,
                timerTime: this.state.timerTime,
                timerStart: Date.now() - this.state.timerTime
            });
            this.timer = setInterval(() => {
                this.setState({
                    timerTime: Date.now() - this.state.timerStart
                });
            }, 10);
            // You are now recording!
        } catch (error) {
            // An error occurred!
        }
    }

    stopRecording = async () => {
        await this.recording.stopAndUnloadAsync()
        this.setState({ timerOn: false, recordingURI: this.recording.getURI() });
        clearInterval(this.timer);
        var hah = await this.recording.getStatusAsync()
        console.log(hah);
    }

    playRecording = async () => {
        console.log("called")
        console.log(typeof (this.state.recordingURI))
        const playbackObject = await Audio.Sound.createAsync(
            { uri: this.state.recordingURI },
            { shouldPlay: true }
          );
        // try {
        //     await this.recroding.loadAsync(this.state.recordingURI, initialStatus = {}, downloadFirst = true)
        //     await this.recording.playAsync();
        //     console.log("should be playing")
        //     // Your sound is playing!

        //     // Don't forget to unload the sound from memory
        //     // when you are done using the Sound object
        //     await this.recording.unloadAsync();
        // } catch (error) {
        //     // An error occurred!
        // }
    }




    render() {
        const { timerTime } = this.state;
        let centiseconds = ("0" + (Math.floor(timerTime / 10) % 100)).slice(-2);
        let seconds = ("0" + (Math.floor(timerTime / 1000) % 60)).slice(-2);
        let minutes = ("0" + (Math.floor(timerTime / 60000) % 60)).slice(-2);
        let hours = ("0" + Math.floor(timerTime / 3600000)).slice(-2);
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <View style={styles.container}>
                    <Text style={styles.titleText}>
                        Time for recording a reflection on a meta-skill!
                        </Text>
                    <Text style={styles.headingText}>
                        What meta skills have you developed recently?
                        </Text>
                    <SearchableDropdown
                        onTextChange={text => console.log("text")}
                        //On text change listner on the searchable input
                        onItemSelect={item => this.handleItemPress(item)}
                        //onItemSelect called after the selection from the dropdown
                        containerStyle={{ padding: 5 }}
                        //suggestion container style
                        textInputStyle={{
                            //inserted text style
                            padding: 12,
                            borderWidth: 1,
                            borderColor: '#ccc',
                            backgroundColor: '#FAF7F6',
                        }}
                        itemStyle={{
                            //single dropdown item style
                            padding: 10,
                            marginTop: 2,
                            backgroundColor: '#FAF9F8',
                            borderColor: '#bbb',
                            borderWidth: 1,
                        }}
                        itemTextStyle={{
                            //text style of a single dropdown item
                            color: '#222',
                        }}
                        itemsContainerStyle={{
                            //items container style you can pass maxHeight
                            //to restrict the items dropdown hieght
                            maxHeight: '60%',
                        }}
                        items={this.state.items}
                        //mapping of item array
                        defaultIndex={2}
                        //default selected item index
                        placeholder="placeholder"
                        //place holder for the search input
                        resetValue={false}
                        //reset textInput Value with true and false state
                        underlineColorAndroid="transparent"
                    //To remove the underline from the android input
                    />
                    <ScrollView horizontal={true} contentContainerStyle={{
                        flex: -1,
                        justifyContent: 'space-between'
                    }}>
                        {this.state.skillSelection.map((item) => (
                            <Text key={item[0]}>{item[1]}   </Text>
                        ))
                        }
                    </ScrollView>


                    <Entypo name="mic" size={72} color={this.state.micColour} style={{ alignSelf: 'center' }} onPress={this.handleRecordingPress} />
                    <View>
                        <Text style={{ alignSelf: 'center' }}>{hours} : {minutes} : {seconds} : {centiseconds}</Text>
                    </View>
                    {this.state.isPlaybackAvailable ? <AntDesign name={this.state.playPause} size={32} color="black" style={{ alignSelf: 'center' }} onPress={this.playRecording} /> : null}


                    <TextInput
                        style={styles.textInput}
                        placeholder="Enter your reflections here"
                        onChangeText={textEntry => this.setState({ textEntry })}
                        value={this.state.textEntry}
                    />
                    <Button
                        style={styles.buttons}

                        title="Submit"
                        onPress={this.handleSubmit}
                    />
                </View>
            </View>
        );
    };
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 10,
    },
    getsmall: {
        flex: 0.5,

    },
    getbig: {
        flex: 2
    },
    titleText: {
        padding: 8,
        fontSize: 16,
        textAlign: 'left',
        fontWeight: 'bold',
    },
    headingText: {
        padding: 8,
    },
    buttons: {
        flex: 1,
        padding: 15,
        borderWidth: 1,

        marginTop: 20,
        marginBottom: 20
    },
    textInput: {
        flex: 2,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        padding: 8,
        marginTop: 18
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
});