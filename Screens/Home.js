import React, { Component } from 'react';
import { render } from 'react-dom';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import * as firebase from "firebase";
import { AntDesign } from '@expo/vector-icons';
import BootstrapStyleSheet from 'react-native-bootstrap-styles';
import { Entypo } from '@expo/vector-icons'; 


const DIMENSIONS_WIDTH = 350
const DIMENSIONS_HEIGHT = 400
const bootstrapStyleSheet = new BootstrapStyleSheet();
const { s, c } = bootstrapStyleSheet;


export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            billybob: "",
            expoPushToken: '',
            cardInfo: [],
            loading: true
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
        this.getFirebaseData()
        
    }

    getFirebaseData = async() =>{
        var cardInfo = []
        let firebaseRef = firebase.firestore().collection("CardInfo")
        await firebaseRef.get().then(snapshot => {
            snapshot.forEach(doc => {
                cardInfo.push([doc.data().Title, doc.data().Body])
                console.log(doc.data().Title, doc.data().Body)
            })
        })
        this.setState({ cardInfo: cardInfo, loading:false })
    }

    render() {
        return (
            <View style={{ flex: 4}}>
                <View style={{ flex: 3, alignItems: 'center', justifyContent: 'center' }}>
                    {/* <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate("RecordReflection")}>
                        <Text style={styles.buttonText}>Record a Reflection</Text>
                    </TouchableOpacity> */}
                    <Entypo name="new-message" size={96} color="black" onPress={() => this.props.navigation.navigate("RecordReflection")}/>
                </View>
                <View style={{ flex: 1, paddingBottom: 40}}>
                    {this.state.loading ? <Text>Just loading brother</Text> :
                        <ScrollView horizontal>
                            {this.state.cardInfo.map((value, index) => (
                                <TouchableOpacity style={styles.card} onPress={() => console.log(value)}>
                                    <Text style={styles.buttonText}>{value[0]}</Text>
                                    <Text style={styles.buttonText}>{value[1]}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    }
                </View>
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
    card: {
        padding: 20,
        paddingVertical: 40,
        backgroundColor: "grey",
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