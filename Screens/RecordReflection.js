import React, { useState, useEffect, useFocusEffect, useCallback } from 'react';
import { render } from 'react-dom';
import { View, Text, Button, Alert, StyleSheet, ScrollView, List, ActivityIndicator, TouchableOpacity, BackHandler, Keyboard } from 'react-native';
import * as firebase from "firebase";
import { TextInput } from 'react-native-gesture-handler';
import { format, startOfWeek } from 'date-fns';
import SearchableDropdown from 'react-native-searchable-dropdown';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import { Entypo, AntDesign } from '@expo/vector-icons';
import Dialog from "react-native-dialog";
import { HeaderBackButton } from '@react-navigation/stack';

// NEEDS:
//      -Clean Up (Move submit to header top right, save icon)
//      -Slider bar for playback
//      -CSS (Improvements always available, currently bearable)


export default function RecordReflection(props) {

    const [textEntry, setTextEntry] = useState('');
    const [val, setVal] = useState('')
    const [items, setItems] = useState([
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
    ])
    const [skills, setSkills] = useState([["0", "Self Management"],
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
    ])
    const [cancelSkills, setCancelSkills] = useState([["0", "Self Management"],
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
    ])
    const [buttonColours, setButtonColours] = useState({
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
    })
    const [tagColours, setTagColour] = useState({
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
    })
    const [buttonTextColour, setButtonTextColour] = useState({
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
    })
    const [skillSelection, setSkillSelection] = useState([])
    const [uploadURI, setUploadURI] = useState('')
    const [isRecording, setIsRecording] = useState(false)
    const [timerOn, setTimerOn] = useState(false)
    const [timerStart, setTimerStart] = useState(0)
    const [timerTime, setTimerTime] = useState(0)
    const [micColour, setMicColour] = useState('grey')
    const [playPause, setPlayPause] = useState("playcircleo")
    const [isPlaybackAvailable, setIsPlaybackAvailable] = useState(false)
    const [recordingURI, setRecordingURI] = useState('')
    const [dialogVisible, setDialogVisible] = useState(false)
    const [title, setTitle] = useState('')
    const [isLoaded, setIsLoaded] = useState(false)
    const [isPlaying, setIsPlaying] = useState(false)
    const [isUploading, setIsUploading] = useState(false)
    const [isFinishedUploading, setIsFinishedUploading] = useState(false)
    const [isPickingSkill, setIsPickingSkill] = useState(false)
    const [userIsTyping, setUserIsTyping] = useState(false)
    const [recording, setRecording] = useState()
    const [timer, startTimer] = useState()
    const [textLength, setTextLength] = useState(true)
    // const [response, setResponse] = useState()
    // const [blob, setBlob] = useState()
    //const [reader, setReader] = useState()
    //let recording = new Audio.Recording()


    const handleSubmit = () => {
        console.log(title.length)
        console.log(recording)
        console.log(timerTime)
        if (skillSelection.length === 0) {
            console.log("NOOOOOOOOOOOOOOOOO")
            setDialogVisible(false)
            Alert.alert("Pick a skill.")
        } else if (textEntry === '' && recording === undefined) {
            setDialogVisible(false)
            Alert.alert("You've not reflected on anything there, pal")
        } else if (title.length === 0) {
            Alert.alert("Empty title")
        } else { handleUpload() }

    }

    const handleUpload = async () => {
        // console.log(skillSelection)

        setDialogVisible(false);
        setIsUploading(true);


        props.navigation.setOptions({
            headerShown: false
        });




        var items
        var array = []
        var skillsSelected = skillSelection
        var j = 0;
        while (j < skillsSelected.length) {
            array.push(skillsSelected[j][0])
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

        var firebaseURI = ""

        if (timerTime > 0) {
            var response = await fetch(recordingURI);
            var blob = await response.blob();
            var reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = () => {
                let base64 = reader.result;
                console.log(base64)
            };
            var storage = firebase.storage();
            var storageRef = storage.ref();
            var userRef = storageRef.child(uid);
            var dateRef = userRef.child(date);
            await dateRef.put(blob).then(function (snapshot) {
                console.log("U CANT EVEN FINISH IT");
            });

            await dateRef.getDownloadURL().then((url) => firebaseURI = url)

            setUploadURI(firebaseURI)
            console.log("Firebase URI: " + firebaseURI)
            console.log("upload URI: " + uploadURI)
        }







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
        var reflectionStatArrayFromFirebase
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
            textEntry: textEntry,
            categories: array,
            date: JSON.stringify(date),
            uri: firebaseURI,
            colour: colour,
            textColour: textColour,
            title: title
        })


        setIsFinishedUploading(true)

        setTimeout(() => {
            props.navigation.navigate("Home");
        }, 1500);
    }


    const handleRecordingPress = async () => {
        console.log("Registering")
        if (isRecording === false) {
            //setRecording(null)
            setIsRecording(true);
            setIsPlaybackAvailable(false);
            setMicColour('red');
            requestio();
        } else {
            setIsRecording(false);
            setIsPlaybackAvailable(true);
            setMicColour('grey');
            stopRecording();
        }
    }

    const requestio = async () => {
        try {
            console.log('Requesting permissions..');
            await Audio.requestPermissionsAsync();
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            });
            console.log('Starting recording..');
            const recording = new Audio.Recording();
            await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
            await recording.startAsync();

            setTimerOn(true);
            setTimerStart(Date.now() - 0)
            setIsRecording(true)
            console.log(timerStart)
            console.log(Date.now() - timerStart)

            // startTimer(setInterval(() => {
            //     setTimerTime(Date.now() - timerStart);
            // }, 10)) 

            setRecording(recording);
            console.log('Recording started');
        } catch (err) {
            console.error('Failed to start recording', err);
        }
    }

    useEffect(() => {
        console.log("timer")
        var time = 0
        if (timerOn) {
            startTimer(setInterval(() => {
                // setTimerTime(new Date() - timerStart);
                time += 10 // Don't know why but this works
                setTimerTime(time)
            }, 10))
        }
        if (!timerOn) {
            clearInterval(timer)
        }
    }, [timerOn])

    const msToTime = (duration) => {
        var milliseconds = parseInt((duration % 1000) / 100),
            seconds = Math.floor((duration / 1000) % 60),
            minutes = Math.floor((duration / (1000 * 60)) % 60),
            hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;

        return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
    }

    const stopRecording = async () => {
        setRecording(undefined)
        setIsRecording(false)
        await recording.stopAndUnloadAsync()
        setTimerOn(false);
        const uri = recording.getURI()
        setRecordingURI(uri)
        // clearInterval(timer);
    }


    const _onPlaybackStatusUpdate = (playbackStatus) => {
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
                setIsPlaying(false)
            }
            // etc
        }
    };


    const [playbackObject,setPlaybackObject] = useState(new Audio.Sound())


    const playRecording = async () => {
        if (isLoaded === false) {
            await playbackObject.loadAsync({ uri: recordingURI }, { shouldPlay: true })
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


    const handlePickSkills = () => {
        setIsPickingSkill(true)
        props.navigation.setOptions({
            headerShown: false
        });
    }


    const handleSkillPicked = (item) => {
        var skillsAlreadyPicked = skillSelection
        if (skillsAlreadyPicked == []) {
            console.log("yup")
            setSkillSelection([item])
        } else {
            skillsAlreadyPicked.push(item)
            setSkillSelection(skillsAlreadyPicked)
        }
        var removeFromSkillList = skills
        for (var i = 0; i < removeFromSkillList.length; i++) {
            if (removeFromSkillList[i][0] === item[0]) {
                removeFromSkillList.splice(i, 1);
            }
        }
        props.navigation.setOptions({
            headerShown: true
        });
        setSkills(removeFromSkillList)
        //set cancelskills to cancelskills ?
        setIsPickingSkill(false)
    }

    const saveSkillPicks = () => {
        setIsPickingSkill(false)
        props.navigation.setOptions({
            headerShown: true
        });

    }

    const clearSkillPicks = () => {
        console.log(skills)
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
        setSkills(skillsCancelled)
        setSkillSelection([])
    }

    const backAction = () => {
        Alert.alert("Hold on!", "Are you sure you want to go back?", [
            {
                text: "Cancel",
                onPress: () => null,
                style: "cancel"
            },
            { text: "YES", onPress: () => handleGoBack() }
        ]);
        return true;
    };

    const handleGoBack = async() =>{
        console.log(isRecording)
        console.log(isLoaded)
        if(isRecording===true){
            console.log("YEAH PROBLEMO")
            await recording.stopAndUnloadAsync()
        }
        if(isLoaded===true){
            console.log("RECORDING PROBLEMO")
            await playbackObject.stopAndUnloadAsync()
        }
        props.navigation.goBack()
    }

    const handleSave = () => {
        // //Check at least 1 skill picked
        console.log(skillSelection)
        console.log(textEntry)
        console.log(recording)
        // if (skillSelection.length===0) {
        //     Alert.alert("Make sure to associate a skill with your reflection")
        // } else if (textEntry.length === 0 && recording===undefined) {
        //     Alert.alert("Please enter either a text or recording entry to capture your reflection")
        // } else {
        // }
        setDialogVisible(true)

    }

    const handleTextEntry = (textEntry) => {
        setTextEntry(textEntry)
    }

    const _keyboardDidShow = () => {
        setUserIsTyping(true)
    }

    const _keyboardDidHide = () => {
        setUserIsTyping(false)
    };

    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", backAction);
        Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
        Keyboard.addListener("keyboardDidHide", _keyboardDidHide);
        let isMounted = true

        props.navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={() => handleSave()}>
                    <AntDesign name="save" size={32} color="black" paddingRight="50" />
                </TouchableOpacity>),
            headerLeft: () => (
                <HeaderBackButton onPress={() => backAction()} />
            )
        })

        //Clean up function

        return () => {
            Keyboard.removeListener("keyboardDidShow", _keyboardDidShow),
                BackHandler.removeEventListener("hardwareBackPress", backAction),
                Keyboard.removeListener("keyboardDidHide", _keyboardDidHide),
                isMounted = false
        }
    }, []);

    useEffect(() => {
        setTextLength(textEntry.length)
        console.log(textLength)
    }, [textEntry])


    const handleDialogYes = () => {
        console.log(textLength)
        console.log(recording)
        console.log(skillSelection)
    }


    // let centiseconds = ("0" + (Math.floor(timerTime / 10) % 100)).slice(-2);
    // let seconds = ("0" + (Math.floor(timerTime / 1000) % 60)).slice(-2);
    // let minutes = ("0" + (Math.floor(timerTime / 60000) % 60)).slice(-2);
    // let hours = ("0" + Math.floor(timerTime / 3600000)).slice(-2);
    let hours = Math.floor(timerTime / 1000 / 60 / 60);
    let minutes = Math.floor((timerTime / 1000 / 60 / 60 - hours) * 60);
    let seconds = Math.floor(((timerTime / 1000 / 60 / 60 - hours) * 60 - minutes) * 60);
    return (
        <View style={{ flex: 6 }}>
            {isUploading ?
                <View style={{ flex: 6 }}>
                    {isFinishedUploading ?
                        <AntDesign name="checkcircleo" size={34} color="green" /> :
                        <ActivityIndicator size="large" color="blue" />
                    }
                </View>
                :
                <View style={{ flex: 6 }}>
                    {isPickingSkill ?
                        <View style={{ flex: 6 }}>
                            <View style={{ flex: 1, paddingVertical: 20 }}>
                                <View style={{ flexDirection: 'row', flex: 2 }}>
                                    <View style={{ flex: 1 }}>
                                        <TouchableOpacity style={styles.greyButton} onPress={() => saveSkillPicks()}>
                                            <Text style={{ color: "black" }}>Back</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <TouchableOpacity style={styles.greyButton} onPress={() => clearSkillPicks()}>
                                            <Text style={{ color: "black" }}>Clear</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                            <View style={{ flex: 5 }}>
                                <ScrollView>
                                    {skills.map((item) => (
                                        <TouchableOpacity key={item[0]} style={buttonColours[item[0]]} onPress={() => handleSkillPicked(item)}>
                                            <Text style={{ color: buttonTextColour[item[0]] }}>{item[1]}</Text>
                                        </TouchableOpacity>
                                    ))
                                    }

                                </ScrollView>
                            </View>
                        </View> :
                        <View style={{ flex: 6 }}>
                            {!userIsTyping ?
                                <View style={{ flex: 3 }}>
                                    <View style={{ flex: 1 }}>
                                        <ScrollView horizontal>
                                            {skillSelection.map((item) => (
                                                <TouchableOpacity key={item[0]} style={tagColours[item[0]]}>
                                                    <Text style={{ color: buttonTextColour[item[0]] }} >{item[1]}</Text>
                                                </TouchableOpacity>
                                            ))
                                            }
                                        </ScrollView>
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <TouchableOpacity style={styles.greyButton} onPress={() => handlePickSkills()}>
                                            <Text>Add Skills</Text>
                                        </TouchableOpacity>
                                    </View>

                                    <View style={{ flex: 1 }}>
                                        <Entypo name="mic" size={72} color={micColour} style={{ alignSelf: 'center' }} onPress={() => handleRecordingPress()} />
                                        <View>
                                            <Text style={{ alignSelf: 'center' }}>{msToTime(timerTime)}</Text>
                                        </View>
                                        {isPlaybackAvailable ? <AntDesign name={playPause} size={52} color="black" style={{ alignSelf: 'center' }} onPress={() => handlePlayPause()} /> : null}
                                    </View>

                                </View>
                                :
                                null
                            }
                            <View style={{ flex: 3 }}>
                                <TextInput
                                    style={styles.textInput}
                                    placeholder="Enter your reflections here"
                                    onChangeText={(textEntry) => handleTextEntry(textEntry)}
                                    value={textEntry}
                                    multiline={true}
                                    blurOnSubmit={true}
                                    returnKeyType="done"
                                />
                            </View>



                            <Dialog.Container visible={dialogVisible}>
                                <Dialog.Title>Enter a title for your reflection!</Dialog.Title>
                                <Dialog.Input
                                    label="Title"
                                    onChangeText={title => setTitle(title)}
                                ></Dialog.Input>
                                <Dialog.Button label="Cancel" onPress={() => setDialogVisible(false)} />
                                <Dialog.Button label="Save" onPress={() => handleSubmit()}
                                />
                            </Dialog.Container>
                        </View>
                    }
                </View>

            }
        </View>
    );
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