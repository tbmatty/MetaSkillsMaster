import React, { Component, useState } from 'react';
import { render } from 'react-dom';
import { View, Text, Button, SafeAreaView, StyleSheet, ScrollView, List, ActivityIndicator, TouchableOpacity, BackHandler } from 'react-native';
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
            skills: [["0", "Self Management"],
            ["1", "Focussing"],
            ["2", "Integrity"],
            ["3", "Adapting"],
            ["4", "Initiative"],
            ["5", "Social Intelligence"],
            ["6", "Communicating"],
            ["7", "Feeling"],
            ["8", "Collaborating"],
            ["9", "Leading"],
            ["10", "Innovation"],
            ["11", "Curiosity"],
            ["12", "Creativity"],
            ["13", "Sense Making"],
            ["14", "Critical Thinking"]
            ],
            cancelSkills: [["0", "Self Management"],
            ["1", "Focussing"],
            ["2", "Integrity"],
            ["3", "Adapting"],
            ["4", "Initiative"],
            ["5", "Social Intelligence"],
            ["6", "Communicating"],
            ["7", "Feeling"],
            ["8", "Collaborating"],
            ["9", "Leading"],
            ["10", "Innovation"],
            ["11", "Curiosity"],
            ["12", "Creativity"],
            ["13", "Sense Making"],
            ["14", "Critical Thinking"]
            ],
            buttonColours: {
                "0": styles.blueButton,
                "1": styles.blueButton,
                "2": styles.blueButton,
                "3": styles.blueButton,
                "4": styles.blueButton,
                "5": styles.redButton,
                "6": styles.redButton,
                "7": styles.redButton,
                "8": styles.redButton,
                "9": styles.redButton,
                "10": styles.yellowButton,
                "11": styles.yellowButton,
                "12": styles.yellowButton,
                "13": styles.yellowButton,
                "14": styles.yellowButton
            },
            tagColours: {
                "0": styles.blueTag,
                "1": styles.blueTag,
                "2": styles.blueTag,
                "3": styles.blueTag,
                "4": styles.blueTag,
                "5": styles.redTag,
                "6": styles.redTag,
                "7": styles.redTag,
                "8": styles.redTag,
                "9": styles.redTag,
                "10": styles.yellowTag,
                "11": styles.yellowTag,
                "12": styles.yellowTag,
                "13": styles.yellowTag,
                "14": styles.yellowTag
            },
            buttonTextColour: {
                "0": "white",
                "1": "white",
                "2": "white",
                "3": "white",
                "4": "white",
                "5": "white",
                "6": "white",
                "7": "white",
                "8": "white",
                "9": "white",
                "10": "black",
                "11": "black",
                "12": "black",
                "13": "black",
                "14": "black"
            },
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
            isPlaying: false,
            isUploading: false,
            isFinishedUploading: false,
            isPickingSkill: false,
        }
    }


    recording = null


    handleSubmit = async () => {
        // console.log(this.state.skillSelection)


        this.setState({
            dialogVisible: false,
            isUploading: true
        })

        this.props.navigation.setOptions({
            headerShown: false
        });




        var items
        var array = []
        var skillSelection = this.state.skillSelection
        var j = 0;
        while (j < skillSelection.length) {
            array.push(skillSelection[j][0])
            j++
        }

        console.log(array)


        var date = format(new Date(), "dd-MM-yyyy-kk:mm:ss");
        var uid = firebase.auth().currentUser.uid;


        // console.log(file)
        let userDoc = firebase.firestore().collection("Users").doc(uid)
        var lastDate
        var concurrentDays
        let getUserDoc = await userDoc.get().then(doc => {
            lastDate = doc.data().lastDate,
                concurrentDays = doc.data().ConsecutiveDays,
                console.log(doc.data().ConsecutiveDays)
        })
        console.log("Concurrent days: " + JSON.stringify(concurrentDays))
        if (lastDate != date.slice(0, 10)) {
            concurrentDays++
            await userDoc.set({
                lastDate: date.slice(0, 10),
                ConsecutiveDays: concurrentDays
            }, { merge: true })
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
        var reflectionStatArray = [0, 0, 0]
        var i = 0;
        var intval
        while (i < array.length) {
            intval = parseInt(array[i])
            if (intval < 5) {
                colourArray[0]++
                reflectionStatArray[0] = 1
            } else if (intval >= 5 && intval <= 9) {
                colourArray[1]++
                reflectionStatArray[1] = 1
            } else {
                colourArray[2]++
                reflectionStatArray[2] = 1
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
        await badgesRef.get().then(doc => {
            highScoreConsec = doc.data().Consistency;
            highScoreInnov = doc.data().Innovation;
            highScoreSelfM = doc.data().SelfManagement;
            highScoreSocial = doc.data().SocialAwareness;
        })

        if (colourArray[0] >= 1) {
            highScoreSelfM++;
        }
        if (colourArray[1] >= 1) {
            highScoreSocial++;
        }
        if (colourArray[2] >= 1) {
            highScoreInnov++;
        }

        if (concurrentDays > highScoreConsec) {
            highScoreConsec = concurrentDays
        }

        badgesRef.set({
            Consistency: highScoreConsec,
            Innovation: highScoreInnov,
            SelfManagement: highScoreSelfM,
            SocialAwareness: highScoreSocial
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
            } else {
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

        this.setState({
            isFinishedUploading: true
        })
        setTimeout(() => {
            this.props.navigation.navigate("Home");
        }, 3000);
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

    handlePickSkills = () => {
        this.setState({
            isPickingSkill: true
        })
        this.props.navigation.setOptions({
            headerShown: false
        });

    }

    handleSkillPicked = (item) => {
        var skillsAlreadyPicked = this.state.skillSelection
        if (skillsAlreadyPicked[0][0] == "-1") {
            this.setState({
                skillSelection: [item]
            })
        } else {
            skillsAlreadyPicked.push(item)
            this.setState({
                skillSelection: skillsAlreadyPicked
            })
        }
        var removeFromSkillList = this.state.skills
        for (var i = 0; i < removeFromSkillList.length; i++) {
            if (removeFromSkillList[i][0] === item[0]) {
                removeFromSkillList.splice(i, 1);
            }
        }
        this.props.navigation.setOptions({
            headerShown: true
        });
        this.setState({
            skills: removeFromSkillList,
            cancelSkills: this.state.cancelSkills,
            isPickingSkill: false
        })
    }

    saveSkillPicks = () => {
        this.setState({
            isPickingSkill: false
        })
        this.props.navigation.setOptions({
            headerShown: true
        });

    }

    clearSkillPicks = () => {
        console.log(this.state.skills)
        var skillsCancelled = [["0", "Self Management"],
        ["1", "Focussing"],
        ["2", "Integrity"],
        ["3", "Adapting"],
        ["4", "Initiative"],
        ["5", "Social Intelligence"],
        ["6", "Communicating"],
        ["7", "Feeling"],
        ["8", "Collaborating"],
        ["9", "Leading"],
        ["10", "Innovation"],
        ["11", "Curiosity"],
        ["12", "Creativity"],
        ["13", "Sense Making"],
        ["14", "Critical Thinking"]
        ]
        this.setState({
            skills: skillsCancelled,
            skillSelection: [["-1", "..."]],
        })
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
            <View style={{ flex: 6 }}>
                {this.state.isUploading ?
                    <View style={{ flex: 6 }}>
                        {this.state.isFinishedUploading ?
                            <AntDesign name="checkcircleo" size={34} color="green" /> :
                            <ActivityIndicator size="large" color="blue" />
                        }
                    </View>
                    :
                    <View style={{ flex: 6 }}>
                        {this.state.isPickingSkill ?
                            <View style={{ flex: 6 }}>
                                <View style={{ flex: 1, paddingVertical: 20 }}>
                                    <View style={{ flexDirection: 'row', flex: 2 }}>
                                        <View style={{ flex: 1 }}>
                                            <TouchableOpacity style={styles.greyButton} onPress={() => this.saveSkillPicks()}>
                                                <Text style={{ color: "black" }}>Back</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={{ flex: 1 }}>
                                            <TouchableOpacity style={styles.greyButton} onPress={() => this.clearSkillPicks()}>
                                                <Text style={{ color: "black" }}>Clear</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                                <View style={{ flex: 5 }}>
                                    <ScrollView>
                                        {this.state.skills.map((item) => (
                                            <TouchableOpacity key={item[0]} style={this.state.buttonColours[item[0]]} onPress={() => this.handleSkillPicked(item)}>
                                                <Text style={{ color: this.state.buttonTextColour[item[0]] }}>{item[1]}</Text>
                                            </TouchableOpacity>
                                        ))
                                        }

                                    </ScrollView>
                                </View>
                            </View> :
                            <View style={{ flex: 6 }}>
                                <View style={{ flex: 1 }}>
                                    <ScrollView horizontal>
                                        {this.state.skillSelection.map((item) => (
                                            <TouchableOpacity key={item[0]} style={this.state.tagColours[item[0]]}>
                                                <Text style={{ color: this.state.buttonTextColour[item[0]] }} >{item[1]}</Text>
                                            </TouchableOpacity>
                                        ))
                                        }
                                    </ScrollView>
                                </View>
                                <View style={{ flex: 1, backgroundColor: "red" }}>
                                    <TouchableOpacity style={styles.greyButton} onPress={()=>this.handlePickSkills()}>
                                        <Text>Add Skills</Text>
                                    </TouchableOpacity>
                                </View>
                                
                                <View style={{ flex: 1, backgroundColor: "yellow" }}>
                                    <Entypo name="mic" size={72} color={this.state.micColour} style={{ alignSelf: 'center' }} onPress={() => this.handleRecordingPress()} />
                                    <View>
                                        <Text style={{ alignSelf: 'center' }}>{hours} : {minutes} : {seconds} : {centiseconds}</Text>
                                    </View>
                                    {this.state.isPlaybackAvailable ? <AntDesign name={this.state.playPause} size={52} color="black" style={{ alignSelf: 'center' }} onPress={() => this.handlePlayPause()} /> : null}
                                </View>
                                <View style={{ flex: 3, backgroundColor: "purple" }}>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="Enter your reflections here"
                                        onChangeText={textEntry => this.setState({ textEntry })}
                                        value={this.state.textEntry}
                                        multiline={true}
                                        onFocus={()=>console.log("Foc")}
                                        blurOnSubmit={true}
                                        onBlur={(event)=>console.log(event)}
                                        onSubmitEditing={()=>console.log("submit")}
                                        returnKeyType="done"
                                    />
                                </View>

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
                        }
                    </View>

                }
            </View>
        );
    };
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
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
        borderColor: 'white',
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
    blueButton: {
        backgroundColor: "#4677D6",
        padding: 20,
        borderRadius: 10,
        paddingHorizontal: 30,
        margin: 40
    },
    redButton: {
        backgroundColor: "#FF5D60",
        padding: 20,
        borderRadius: 4,
        margin: 40,
        paddingHorizontal: 30
    },
    yellowButton: {
        backgroundColor: "#FFC530",
        padding: 20,
        borderRadius: 4,
        margin: 40,
        paddingHorizontal: 60
    },
    greyButton: {
        backgroundColor: "white",
        padding: 20,
        borderRadius: 4,
        margin: 40,
    },
    redTag: {
        backgroundColor: "#FF5D60",
        padding: 20,
        borderRadius: 4,
        margin: 20
    },
    yellowTag: {
        backgroundColor: "#FFC530",
        padding: 20,
        borderRadius: 4,
        margin: 20,
    },
    blueTag: {
        backgroundColor: "#4677D6",
        padding: 20,
        borderRadius: 4,
        margin: 20,
    },
});