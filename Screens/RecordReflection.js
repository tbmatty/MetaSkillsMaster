import React, { Component, useState } from 'react';
import { render } from 'react-dom';
import { View, Text, Button, SafeAreaView, StyleSheet, ScrollView, List, AsyncStorage, TouchableOpacity } from 'react-native';
import * as firebase from "firebase";
import { TextInput } from 'react-native-gesture-handler';
import { format, startOfWeek } from 'date-fns';
import SearchableDropdown from 'react-native-searchable-dropdown';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import { Entypo, AntDesign } from '@expo/vector-icons';
import Dialog from "react-native-dialog";

// NEEDS:
//      -Clean Up (Move submit to header top right, save icon)
//      -Slider bar for playback
//      -CSS (Improvements always available, currently bearable)


export default class RecordReflection extends Component {


    constructor(props) {
        super(props);

        this.state = {

            textEntry: '',
            val: '',
            items: [
                { "id": "0", "name": "Self Management" },
                { "id": "1", "name": "Focussing" },
                { "id": "2", "name": "Integrity" },
                { "id": "3", "name": "Adapting" },
                { "id": "4", "name": "Initiative" },

                { "id": "5", "name": "Social Intelligence" },
                { "id": "6", "name": "Communicating" },
                { "id": "7", "name": "Feeling" },
                { "id": "8", "name": "Collaborating" },
                { "id": "9", "name": "Leading" },

                { "id": "10", "name": "Innovation" },
                { "id": "11", "name": "Curiosity" },
                { "id": "12", "name": "Creativity" },
                { "id": "13", "name": "Sense Making" },
                { "id": "14", "name": "Critical Thinking" },

            ],
            skillSelection: [["-1", "..."]],
            uploadURI: '',
            isRecording: false,
            timerOn: false,
            timerStart: 0,
            timerTime: 0,
            micColour: 'grey',
            playPause: "playcircleo", // or 'pause'
            isPlaybackAvailable: false,
            recordingURI: '',
            dialogVisible: false,
            title: '',
            isLoaded: false,
            isPlaying: false
        }
    }


    recording = null


    handleSubmit = async () => {
        // console.log(this.state.skillSelection)


        this.setState({
            dialogVisible: false
        })
        var items
        var array = []
        var skillSelection = this.state.skillSelection
        var j = 0;
        while (j < skillSelection.length) {
            array.push(skillSelection[j][0])
            j++
        }
        var date = format(new Date(), "dd-MM-yyyy-kk:mm:ss");
        var uid = firebase.auth().currentUser.uid;


        // console.log(file)
        let userDoc = firebase.firestore().collection("Users").doc(uid)
        var lastDate
        var concurrentDays
        let getUserDoc = await userDoc.get().then(doc=>{
            lastDate=doc.data().lastDate,
            concurrentDays=doc.data().ConsecutiveDays,
            console.log(doc.data().ConsecutiveDays)
        })
        console.log("Concurrent days: "+JSON.stringify(concurrentDays))
        if(lastDate!=date.slice(0,10)){
            concurrentDays++
            await userDoc.set({
                lastDate:date.slice(0,10),
                ConsecutiveDays:concurrentDays
            },{merge:true})
        }



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


        var colourArray = [0, 0, 0]
        var reflectionStatArray = [0,0,0]
        var i = 0;
        var intval
        while (i < array.length) {
            intval = parseInt(array[i])
            if (intval < 5)  {
                colourArray[0]++
                reflectionStatArray[0]=1
            } else if (intval >= 5 && intval <= 9) {
                colourArray[1]++
                reflectionStatArray[1]=1
            } else {
                colourArray[2]++
                reflectionStatArray[2]=1
            }
            i++;
        }

        var colour
        var textColour

        if (colourArray[0] > 0 && colourArray[1] > 0 && colourArray[2] > 0) {
            //silver
            colour = "#C0C0C0"
            textColour = "#FFD700"
        } else if (colourArray[0] > 0 && colourArray[1] > 0 && colourArray[2] === 0) {
            //purple
            colour = "#8E2FBA"
            textColour = "white"
        } else if (colourArray[0] > 0 && colourArray[1] === 0 && colourArray[2] > 0) {
            //green
            colour = "#27D538"
            textColour = "white"
        } else if (colourArray[0] === 0 && colourArray[1] > 0 && colourArray[2] > 0) {
            //orange
            colour = "#FF7B02"
            textColour = "black"
        } else if (colourArray[0] > 0 && colourArray[1] === 0 && colourArray[2] === 0) {
            //blue
            colour = "#4677D6"
            textColour = "white"
        } else if (colourArray[0] === 0 && colourArray[1] === 0 && colourArray[2] > 0) {
            //yellow
            colour = "#FFC530"
            textColour = "black"
        } else if (colourArray[0] === 0 && colourArray[1] > 0 && colourArray[2] === 0) {
            //red
            colour = "#FF5D60"
            textColour = "white"
        }


        
        let badgesRef = firebase.firestore().collection("BadgeProgress").doc(uid)
        var highScoreConsec
        var highScoreInnov
        var highScoreSelfM
        var highScoreSocial
        await badgesRef.get().then(doc=>{
            highScoreConsec = doc.data().Consistency;
            highScoreInnov = doc.data().Innovation;
            highScoreSelfM = doc.data().SelfManagement;
            highScoreSocial = doc.data().SocialAwareness;
        })

        if(colourArray[0]>=1){
            highScoreSelfM ++;
        }
        if(colourArray[1]>=1){
            highScoreSocial ++;
        }
        if(colourArray[2]>=1){
            highScoreInnov ++;
        }

        if(concurrentDays>highScoreConsec){
            highScoreConsec=concurrentDays
        }

        badgesRef.set({
            Consistency : highScoreConsec,
            Innovation : highScoreInnov,
            SelfManagement : highScoreSelfM,
            SocialAwareness : highScoreSocial
        })















        var weekStart = startOfWeek(new Date(), { weekStartsOn: 1 })
        var formatWeekStart = format(weekStart, "dd-MM-yyyy")







        var statArrayFromFirebase
        const statRef = firebase.firestore().collection("Stats").doc(uid).collection("Weeks").doc(formatWeekStart)
        await statRef.get().then((docSnapshot) => {
            if (!docSnapshot.exists) {
                var statArray = new Array(15).fill(0)
                var index = 0
                while (index < array.length) {
                    statArray[parseInt(array[index])]++;
                    index++
                }
                statRef.set({
                    date: formatWeekStart,
                    statArray: statArray,
                    reflectionStatArray: reflectionStatArray
                })
            }else{
                statArrayFromFirebase = docSnapshot.data().statArray
                reflectionStatArrayFromFirebase = docSnapshot.data().reflectionStatArray
                index = 0
                while (index < array.length) {
                    statArrayFromFirebase[parseInt(array[index])]++;
                    index++
                }
                let newRefStatArray = reflectionStatArray.map(function (value, index) {
                    return value + reflectionStatArrayFromFirebase[index];
                  })
                statRef.set({
                    date: formatWeekStart,
                    statArray: statArrayFromFirebase,
                    reflectionStatArray: newRefStatArray
                })
            }
        })


        let setVal = await firebase.firestore().collection("Recordings").doc(uid).collection("Recordings").doc(JSON.stringify(date)).set({
            textEntry: this.state.textEntry,
            categories: array,
            date: JSON.stringify(date),
            uri: this.state.uploadURI,
            colour: colour,
            textColour: textColour,
            title: this.state.title
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
            // console.log(nuArray)
            this.setState({
                skillSelection: array
            })
        }
        console.log(this.state.skillSelection);
    }

    handleRecordingPress = async () => {
        console.log("Registering")
        if (this.state.isRecording === false) {
            this.recording = null
            this.setState({
                isRecording: true,
                isPlaybackAvailable: false,
                micColour: 'red'
            })
            this.requestio();
        } else {
            this.setState({
                isRecording: false,
                isPlaybackAvailable: true,
                micColour: 'grey'
            })
            this.stopRecording();
        }
    }

    requestio = async () => {
        this.recording = new Audio.Recording()

        var huh = await Audio.requestPermissionsAsync();
        var hoh = await this.recording.getStatusAsync();
        try {
            await this.recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
            await this.recording.startAsync();

            this.setState({
                timerOn: true,
                timerTime: 0,
                timerStart: Date.now()
            })
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

    playRecording = async () => {
        if (this.state.isLoaded === false) {
            await this.playbackObject.loadAsync({ uri: this.state.recordingURI }, { shouldPlay: true })
            this.playbackObject.setOnPlaybackStatusUpdate(this._onPlaybackStatusUpdate);
            this.setState({
                isLoaded: true
            })
        } else {
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



    componentDidMount = () => {
        this.props.navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={() => this.setState({ dialogVisible: true })}>
                    <AntDesign name="save" size={32} color="black" paddingRight="50" />
                </TouchableOpacity>),
        })
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
                    <ScrollView horizontal>
                        {this.state.skillSelection.map((item) => (
                            <Text key={item[0]}>{item[1]}   </Text>
                        ))
                        }
                    </ScrollView>


                    <Entypo name="mic" size={72} color={this.state.micColour} style={{ alignSelf: 'center' }} onPress={() => this.handleRecordingPress()} />
                    <View>
                        <Text style={{ alignSelf: 'center' }}>{hours} : {minutes} : {seconds} : {centiseconds}</Text>
                    </View>
                    {this.state.isPlaybackAvailable ? <AntDesign name={this.state.playPause} size={52} color="black" style={{ alignSelf: 'center' }} onPress={() => this.handlePlayPause()} /> : null}


                    <TextInput
                        style={styles.textInput}
                        placeholder="Enter your reflections here"
                        onChangeText={textEntry => this.setState({ textEntry })}
                        value={this.state.textEntry}
                    />
                    <Dialog.Container visible={this.state.dialogVisible}>
                        <Dialog.Title>Enter a title for your reflection!</Dialog.Title>
                        <Dialog.Input
                            label="Title"
                            onChangeText={title => this.setState({ title: title })}
                        ></Dialog.Input>
                        <Dialog.Button label="Cancel" onPress={() => this.setState({ dialogVisible: false })} />
                        <Dialog.Button label="Save" onPress={() => this.handleSubmit()}
                        />
                    </Dialog.Container>

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