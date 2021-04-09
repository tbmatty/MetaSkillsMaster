import React, { useEffect, useState } from 'react';
import { render } from 'react-dom';
import { View, Text, Button, TextInput, StyleSheet, Alert, Platform, Keyboard } from 'react-native';
import * as firebase from "firebase";
import { CommonActions } from '@react-navigation/native';
import { NotificationTimeoutError } from 'expo-notifications';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import {format} from 'date-fns';
import { StackActions } from '@react-navigation/native';


export default function editProfile(props) {



    const [userData, setUserData] = useState()
    const [userName, setUserName] = useState("")
    const [userDescription, setUserDescription] = useState("")
    const [userProfilePicURI, setUserProfilePicURI] = useState("")
    const [imagePicked, setImagePicked] = useState(null)
    const [userIsTyping, setUserIsTyping] = useState(false)


    useEffect(() => {

        async function getUserData() {
            var uid = firebase.auth().currentUser.uid
            var userInfo = []
            let userRef = await firebase.firestore().collection("Users").doc(uid).get().then(doc => {
                userInfo.push(doc.data().name, doc.data().description, doc.data.profilePicURI)
            })
            setUserData(userInfo)
            setUserName(userInfo[0])
            setUserDescription(userInfo[1])
            setUserProfilePicURI(userInfo[2])
        }


        console.log(userProfilePicURI)
        getUserData()


        Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
        Keyboard.addListener("keyboardDidHide", _keyboardDidHide);

        //Clean up function

        return () => {
            Keyboard.removeListener("keyboardDidShow", _keyboardDidShow),
                Keyboard.removeListener("keyboardDidHide", _keyboardDidHide)
        }

    }, [])


    const _keyboardDidShow = () => {
        setUserIsTyping(true)
    }

    const _keyboardDidHide = () => {
        setUserIsTyping(false)
    };


    const handlePickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.1,
        });
        console.log(result);

        if (!result.cancelled) {
            setImagePicked(result.uri)
        }
    }



    const handleUserDescriptionChange = (textEntry) => {
        setUserDescription(textEntry)
    }

    const handleUsernameChange = (textEntry) => {
        setUserName(textEntry)
    }

    const handleCancel = () => {
        props.navigation.goBack()
    }

    const handleSubmit = async() => {
        if(userDescription.length>200){
            Alert.alert("Description field must not exceed 200 characters")
            return;
        }
        if(userName.length>20){
            Alert.alert("User name field must not exceed 20 characters")
            return;
        }
       
        var uid = firebase.auth().currentUser.uid
        var firebaseURI = userProfilePicURI
        var date = format(new Date(), "dd-MM-yyyy-kk:mm:ss");

        if(imagePicked!=null){
            var response = await fetch(imagePicked);
            var blob = await response.blob();
            var reader = new FileReader();
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

            await dateRef.getDownloadURL().then((url) => firebaseURI = url)

            console.log("Firebase URI: " + firebaseURI)
        }
        var uid = firebase.auth().currentUser.uid
        console.log(firebaseURI)
        if(imagePicked!=null){
            let userDocRef = firebase.firestore().collection("Users").doc(uid).set({
                name: userName,
                description: userDescription,
                profilePicURI: firebaseURI
            }, { merge: true })
        }else{
            let userDocRef = firebase.firestore().collection("Users").doc(uid).set({
                name: userName,
                description: userDescription,
            }, { merge: true })
        }
        
        props.navigation.dispatch(StackActions.pop(2));


    }

    return (
        <View style={{ flex: 4 }}>
            <View style={{ flex: 2 }}>
                <TouchableOpacity style={styles.button} onPress={() => handlePickImage()}>
                    <Text style={styles.buttonText}>Update Profile Picture</Text>
                </TouchableOpacity>
                <View style={{ padding: 20 }}>
                    <Text>Username</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder={userName}
                        onChangeText={(textEntry) => handleUsernameChange(textEntry)}
                        value={userName}
                        blurOnSubmit={true}
                        returnKeyType="done"
                    />
                </View>
                <View style={{ padding: 20 }}>
                    <Text>Bio</Text>
                    <TextInput
                        style={styles.descriptionInput}
                        placeholder={userDescription}
                        onChangeText={(textEntry) => handleUserDescriptionChange(textEntry)}
                        value={userDescription}
                        blurOnSubmit={true}
                        multiline={true}
                        returnKeyType="done"
                    />
                </View>
            </View>
            <View style={{ flex: 1 }}>

            </View>
            {userIsTyping ? null :
                <View style={{ flex: 1 }}>
                    <View style={{ flex: 2, flexDirection: 'row' }}>
                        <View style={{ flex: 1 }}>
                            <TouchableOpacity style={styles.button} onPress={() => handleSubmit()}>
                                <Text style={styles.buttonText}>Submit</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1 }}>
                            <TouchableOpacity style={styles.cancelButton} onPress={() => handleCancel()}>
                                <Text style={styles.buttonText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            }
        </View>
    )

}

const styles = StyleSheet.create({
    textInput: {
        height: 40,
        borderColor: 'black',
        borderWidth: 2,
        padding: 8,
        marginTop: 18,
        paddingHorizontal: 14
    },
    descriptionInput: {
        height: 180,
        borderColor: 'black',
        borderWidth: 2,
        padding: 8,
        marginTop: 18,
        paddingHorizontal: 14
    },
    button: {
        padding: 20,
        backgroundColor: "#73a9ff",
        borderRadius: 4,
        margin: 20
    },
    cancelButton: {
        padding: 20,
        backgroundColor: "grey",
        borderRadius: 4,
        margin: 20
    },
    buttonText: {
        fontSize: 18,
        paddingLeft: 20,
        color: "white"
    },
    blackButtonText: {
        fontSize: 18,
        paddingLeft: 20,
        color: "black"
    }
})