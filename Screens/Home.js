import React, { Component } from 'react';
import { render } from 'react-dom';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import * as firebase from "firebase";
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons'; 


export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            billybob: "",
            expoPushToken: '',
            cardInfo: [],
            loading: true,
            cardStyles :{
                "Self Management" : styles.card1,
                "Focussing" : styles.card1,
                "Integrity" : styles.card1,
                "Adapting" : styles.card1,
                "Initiative" : styles.card1,
                "Social Intelligence" : styles.card2,
                "Communicating" : styles.card2,
                "Feeling" : styles.card2,
                "Collaborating" : styles.card2,
                "Leading" : styles.card2,
                "Innovation" : styles.card3,
                "Curiosity" : styles.card3,
                "Creativity" : styles.card3,
                "Sense Making" : styles.card3,
                "Critical Thinking" : styles.card3
            },
            cardNavigationDestination :{
                "Self Management" : "SelfManagement",
                "Focussing" : "SelfManagement",
                "Integrity" :  "SelfManagement",
                "Adapting" :  "SelfManagement",
                "Initiative" :  "SelfManagement",
                "Social Intelligence" : "SocialAwareness",
                "Communicating" :  "SocialAwareness",
                "Feeling" :  "SocialAwareness",
                "Collaborating" :  "SocialAwareness",
                "Leading" :  "SocialAwareness",
                "Innovation" : "Innovation",
                "Curiosity" : "Innovation",
                "Creativity" :"Innovation",
                "Sense Making" : "Innovation",
                "Critical Thinking" : "Innovation"
            }
        }
    }




    //General workflow for file upload
    handleUpload = async () => {
        var storage = firebase.storage();
        var storageRef = storage.ref();
        var testRef = storageRef.child('test/test.txt');
        var testMessage = 'testing123';
        testRef.putString(testMessage).then(function (snapshot) {
            console.log("U CANT EVEN FINISH IT");
        });
    }


    componentDidMount = () => {

        this.props.navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={() => this.props.navigation.navigate("Profile")}>
                    <AntDesign name="save" size={32} color="black" paddingRight="50" />
                </TouchableOpacity>
            ),
        });
    //    this.getFirebaseData()
        
    }

    // getFirebaseData = async() =>{
    //     var cardInfo = []
    //     let firebaseRef = firebase.firestore().collection("CardInfo")
    //     await firebaseRef.get().then(snapshot => {
    //         snapshot.forEach(doc => {
    //             cardInfo.push([doc.data().Title, doc.data().Body, doc.data().id])
    //             console.log(doc.data().Title, doc.data().Body)
    //         })
    //     })
    //     this.setState({ cardInfo: cardInfo, loading:false })
    // }

    // handleCardPress = (title, id) =>{
    //     var destination = this.state.cardNavigationDestination[title]
    //     this.props.navigation.navigate(destination, {navProp:id})
    // }

    render() {
        return (
            <View style={{ flex: 4}}>
                <View style={{ flex: 3, alignItems: 'center', justifyContent: 'center' }}>
                    {/* <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate("RecordReflection")}>
                        <Text style={styles.buttonText}>Record a Reflection</Text>
                    </TouchableOpacity> */}
                    <Entypo name="new-message" size={96} color="black" onPress={() => this.props.navigation.navigate("RecordReflection")}/>
                </View>
                {/* <View style={{ flex: 1, paddingBottom: 40}}>
                    {this.state.loading ? <Text>Just loading brother</Text> :
                        <ScrollView horizontal>
                            {this.state.cardInfo.map((value, index) => (
                                <TouchableOpacity key={index} style={this.state.cardStyles[value[0]]} onPress={() => this.handleCardPress(value[0],value[2])}>
                                    <Text style={styles.buttonText}>{value[0]}</Text>
                                    <Text style={styles.buttonText}>{value[1]}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    }
                </View> */}
            </View>
        );
    };

}
const styles = StyleSheet.create({
    button: {
        padding: 20,
        backgroundColor: "blue",
        borderRadius: 4,
        margin: 20
    },
    card1: {
        padding: 20,
        paddingVertical: 40,
        backgroundColor: "#4677D6",
        borderRadius: 8,
        margin: 20,
    },
    card2: {
        padding: 20,
        paddingVertical: 40,
        backgroundColor: "#FF5D60",
        borderRadius: 8,
        margin: 20,
    },
    card3: {
        padding: 20,
        paddingVertical: 40,
        backgroundColor: "#FFC530",
        borderRadius: 8,
        margin: 20,
    },
    buttonText: {
        fontSize: 18,
        paddingLeft: 20,
        color: "white"
    },
    cardTitle:{
        
    }
})