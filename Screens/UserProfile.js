import React, { useEffect, useState } from 'react';
import { render } from 'react-dom';
import { TouchableOpacity, View, Text, Image, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { Audio } from 'expo-av';
import { FontAwesome5, Entypo } from '@expo/vector-icons';
import * as firebase from "firebase";
import { HeaderBackButton } from '@react-navigation/stack';



export default function Reflection(props) {

    const [userName, setUserName] = useState()
    const [userDescription, setUserDescription] = useState()
    const [userProfilePicURI, setUserProfilePicURI] = useState()
    const [userXP, setUserXP] = useState()
    const [userBadgeProgressNumbers, setUserBadgeProgressNumbers] = useState([0, 0, 0, 0])
    const [selfManagementBadges, setSelfManagementBadges] = useState()
    const [socialAwarenessBadges, setSocialAwarenessBadges] = useState()
    const [innovationBadges, setInnovationBadges] = useState()
    const [consistencyBadges, setConsistencyBadges] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const [test, setTest] = useState()

    useEffect(() => {
        props.navigation.setOptions({
            
            title: props.route.params.userName+"'s Profile",
        })

        var uid = firebase.auth().currentUser.uid
        if(uid==props.route.params.profileID){
            props.navigation.setOptions({
                headerRight: () => (
                    <TouchableOpacity onPress={() => props.navigation.navigate("editProfile")}>
                        <FontAwesome5 name="user-edit" size={35} color="#4677D6" paddingRight="35" />
                    </TouchableOpacity>),
            })
        }


        async function getFirebaseData() {
            var selfM = 0
            var social = 0
            var innovation = 0
            var consistency = 0
            await firebase.firestore().collection("BadgeProgress").doc(props.route.params.profileID).get().then(doc=>{
                selfM = doc.data().SelfManagement
                social = doc.data().SocialAwareness
                innovation = doc.data().Innovation
                consistency = doc.data().Consistency
            })
            if(selfM >= 100){
                setSelfManagementBadges(3)
            }else if(selfM < 100 && selfM>=50){
                setSelfManagementBadges(2)
            }else if(selfM<50 && selfM>=10){
                setSelfManagementBadges(1)
            }else{
                setSelfManagementBadges(0)
            }

            if(social >= 100){
                setSocialAwarenessBadges(3)
            }else if(social < 100 && social>=50){
                setSocialAwarenessBadges(2)
            }else if(social<50 && social>=10){
                setSocialAwarenessBadges(1)
            }else{
                setSocialAwarenessBadges(0)
            }

            if(innovation >= 100){
                setInnovationBadges(3)
            }else if(innovation < 100 && innovation>=50){
                setInnovationBadges(2)
            }else if(innovation<50 && innovation>=10){
                setInnovationBadges(1)
            }else{
                setInnovationBadges(0)
            }

            if(consistency >= 100){
                setConsistencyBadges(3)
            }else if(consistency < 100 && consistency>=50){
                setConsistencyBadges(2)
            }else if(consistency<50 && consistency>=10){
                setConsistencyBadges(1)
            }else{
                setConsistencyBadges(0)
            }




        }
        getFirebaseData()


    }, [])




    return (
        <View style={{ flex: 8 }}>
            {isLoading ?
                <View style={{ flex: 8, alignContent: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator size="large" color="blue" />
                </View> :
                <View style={{ flex: 8 }}>
                    <View style={{ flex: 2 }}>
                        <View style={{ alignItems: 'center', paddingTop: 30 }}>
                            <Image
                                source={{
                                    uri: props.route.params.userProfilePicURI
                                }}
                                style={{ width: 180, height: 180, borderRadius: 180 / 2 }}
                            />
                            <Text style={{ fontSize: 32, paddingTop: 15 }}>{props.route.params.userName}</Text>
                            <Text style={{ fontSize: 20, paddingTop: 15 }}>Bio: {props.route.params.userDescription}</Text>
                        </View>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 26, paddingBottom: 15, textAlign: "center" }}>XP:{props.route.params.userXP}</Text>
                        <View style={{ backgroundColor: "#4677D6" }}>
                            <Text style={{ fontSize: 26, paddingTop: 15, textAlign: "center", color:"white" }}>{selfManagementBadges}/3 Self Management Badges</Text>

                        </View>
                        <View style={{ backgroundColor: "#FF5D60" }}>
                            <Text style={{ fontSize: 26, paddingTop: 15, textAlign: "center", color:"white" }}>{socialAwarenessBadges}/3 Social Intelligence Badges</Text>

                        </View>
                        <View style={{ backgroundColor: "#FFC530" }}>
                            <Text style={{ fontSize: 26, paddingTop: 15, textAlign: "center" }}>{innovationBadges}/3 Innovation Badges</Text>

                        </View>
                        <View style={{ backgroundColor: "#9932CC" }}>
                            <Text style={{ fontSize: 26, paddingTop: 15, textAlign: "center", color:"white" }}>{consistencyBadges}/3 Consistency Badges</Text>

                        </View>

                    </View>
                    <View>

                    </View>
                    <View>


                    </View>
                </View>



            }
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