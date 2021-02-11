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
                "Collaboration" : styles.card2,
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
                "Collaboration" :  "SocialAwareness",
                "Leading" :  "SocialAwareness",
                "Innovation" : "Innovation",
                "Curiosity" : "Innovation",
                "Creativity" :"Innovation",
                "Sense Making" : "Innovation",
                "Critical Thinking" : "Innovation"
            },
            //             cardInfo.push([doc.data().Title, doc.data().Body, doc.data().id])
            cardInfo :[
                ["Self Management", "Learn about self management!", 0],
                ["Focussing", "Learn about focussing!", 1],
                ["Integrity", "Learn about integrity!", 2],
                ["Adapting", "Learn about adapting!", 3],
                ["Initiative", "Learn about initiative!", 4],
                ["Social Intelligence", "Learn about social intelligence!", 0],
                ["Communicating", "Learn about communicating!", 1],
                ["Feeling", "Learn about feeling!", 2],
                ["Collaboration", "Learn about collaboration!", 3],
                ["Leading", "Learn about leading!", 4],
                ["Innovation", "Learn about innovation!", 0],
                ["Curiosity", "Learn about curiosity!", 1], 
                ["Creativity", "Learn about creativity!", 2],
                ["Sense Making", "Learn about sense making!", 3],
                ["Critical Thinking", "Learn about critical thinking!", 4]
            ],
            displayArray:[]
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
        
        var dummyArray = this.state.cardInfo
        displayArray = []
        var looping=true
        var count=0
        while(looping){
            var item = dummyArray[Math.floor(Math.random() * dummyArray.length)];
            if(displayArray.includes(item)==false){
                count+=1;
                displayArray.push(item)
            }
            if(count==3){
                break;
            }
        }
        console.log(count)
        this.setState({displayArray:displayArray})



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

    handleCardPress = (title, id) =>{
        var destination = this.state.cardNavigationDestination[title]
        var cardArray = this.state.cardInfo
        var newCardDisplay = []
        var curCardDisplay = this.state.displayArray
        var i=0
        console.log(curCardDisplay[i])
        while(i<=2){
            if(curCardDisplay[i][0]==title){
                i++;
                continue;
            }
            newCardDisplay.push(curCardDisplay[i])
            i++
        }
        while(true){
            var item = cardArray[Math.floor(Math.random() * cardArray.length)];
            if(newCardDisplay.includes(item)){
                continue;
            }
            newCardDisplay.push(item)
            break;
        }
        this.props.navigation.navigate(destination, {navProp:id})
        this.setState({displayArray:newCardDisplay})

    }


    render() {
        return (
            <View style={{ flex: 4}}>
                <View style={{ flex: 3, alignItems: 'center', justifyContent: 'center' }}>
                    <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate("RecordReflection")}>
                        <Text style={styles.buttonText2}>Record a Reflection</Text>
                    </TouchableOpacity>
                    {/* <Entypo name="new-message" size={96} color="black" onPress={() => this.props.navigation.navigate("RecordReflection")}/> */}
                </View>
                <View style={{ flex: 1, paddingBottom: 40}}>
                        <ScrollView horizontal>
                            {this.state.displayArray.map((value, index) => (
                                <TouchableOpacity key={index} style={this.state.cardStyles[value[0]]} onPress={() => this.handleCardPress(value[0],value[2])}>
                                    <Text style={styles.buttonText}>{value[0]}</Text>
                                    <Text style={styles.buttonText}>{value[1]}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                </View>
            </View>
        );
    };
}
const styles = StyleSheet.create({
    button: {
        padding:26,
        backgroundColor: "white",
        borderRadius: 4,
        borderColor:"black",
        borderWidth:5,
        alignSelf:"center"
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
    buttonText2: {
        fontSize: 18,
        fontWeight:"bold",
        color: "black"
    },
    cardTitle:{
        
    }
})