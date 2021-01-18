import React, { Component } from 'react';
import { render } from 'react-dom';
import { View, Text, Button, Image, TouchableOpacity, StyleSheet } from 'react-native';
import * as firebase from "firebase";
import logo from './pictures/greytrophyNovice.png'
import { Entypo } from '@expo/vector-icons';

export default class Trophies extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selfManagement: 0,
            socialAwareness: 0,
            Innovation: 0,
            Consistency: 0
        }
    }


    componentDidMount = () => {
        this.getFirebaseDataAsync()
    }

    getFirebaseDataAsync = async () => {
        var uid = firebase.auth().currentUser.uid
        var selfManagement
        var socialAwareness
        var Innovation
        var Consistency

        let badgeRef = await firebase.firestore().collection("BadgeProgress").doc(uid).get().then(doc => {
            selfManagement = doc.data().SelfManagement;
            socialAwareness = doc.data().SocialAwareness;
            Innovation = doc.data().Innovation;
            Consistency = doc.data().Consistency;
        })

        console.log(Innovation)
        this.setState({
            selfManagement: selfManagement,
            socialAwareness: socialAwareness,
            Innovation: Innovation,
            Consistency: Consistency
        })

    }





    render() {
        return (
            <View style={{ flex: 1 }}>
                <Text style={styles.titleText}>Your Trophies</Text>
                <View style={styles.selfMangementRow}>
                    {(this.state.selfManagement >= 10) ?
                        <View style={styles.blueColumn}>
                            <Entypo name="trophy" size={42} color="white" onPress={()=>this.props.navigation.navigate("Trophy", {id:0})}/>
                        </View> :
                        <View style={styles.greyColumn}>
                            <Entypo name="lock" size={42} color="black" />
                        </View>
                    }
                    {(this.state.selfManagement >= 50) ?
                        <View style={styles.blueColumn}>
                            <Entypo name="trophy" size={42} color="white" onPress={()=>this.props.navigation.navigate("Trophy", {id:1})}/>
                        </View> :
                        <View style={styles.greyColumn}>
                            <Entypo name="lock" size={42} color="black" />
                        </View>
                    }
                    {(this.state.selfManagement >= 100) ?
                        <View style={styles.blueColumn}>
                            <Entypo name="trophy" size={42} color="white" onPress={()=>this.props.navigation.navigate("Trophy", {id:2})}/>
                        </View> :
                        <View style={styles.greyColumn}>
                            <Entypo name="lock" size={42} color="black" />
                        </View>
                    }
                </View>
                <View style={styles.socialAwarenessRow}>
                    {(this.state.socialAwareness >= 10) ?
                        <View style={styles.redColumn}>
                            <Entypo name="trophy" size={42} color="white" onPress={()=>this.props.navigation.navigate("Trophy", {id:3})}/>
                        </View> :
                        <View style={styles.greyColumn}>
                            <Entypo name="lock" size={42} color="black" />
                        </View>
                    }
                    {(this.state.socialAwareness >= 50) ?
                        <View style={styles.redColumn}>
                            <Entypo name="trophy" size={42} color="white" onPress={()=>this.props.navigation.navigate("Trophy", {id:4})}/>
                        </View> :
                        <View style={styles.greyColumn}>
                            <Entypo name="lock" size={42} color="black" />
                        </View>
                    }
                    {(this.state.socialAwareness >= 100) ?
                        <View style={styles.redColumn}>
                            <Entypo name="trophy" size={42} color="white" onPress={()=>this.props.navigation.navigate("Trophy", {id:5})}/>
                        </View> :
                        <View style={styles.greyColumn}>
                            <Entypo name="lock" size={42} color="black" />
                        </View>
                    }
                </View>
                <View style={styles.InnovationRow}>
                    {(this.state.Innovation >= 10) ?
                        <View style={styles.yellowColumn}>
                            <Entypo name="trophy" size={42} color="white" onPress={()=>this.props.navigation.navigate("Trophy", {id:6})}/>
                        </View> :
                        <View style={styles.greyColumn}>
                            <Entypo name="lock" size={42} color="black" />
                        </View>
                    }
                    {(this.state.Innovation >= 50) ?
                        <View style={styles.yellowColumn}>
                            <Entypo name="trophy" size={42} color="white" onPress={()=>this.props.navigation.navigate("Trophy", {id:7})}/>
                        </View> :
                        <View style={styles.greyColumn}>
                            <Entypo name="lock" size={42} color="black" />
                        </View>
                    }
                    {(this.state.Innovation >= 100) ?
                        <View style={styles.yellowColumn}>
                            <Entypo name="trophy" size={42} color="white" onPress={()=>this.props.navigation.navigate("Trophy", {id:8})}/>
                        </View> :
                        <View style={styles.greyColumn}>
                            <Entypo name="lock" size={42} color="black" />
                        </View>
                    }
                </View>
                <View style={styles.ConsistencyRow}>
                    {(this.state.Consistency >= 10) ?
                        <View style={styles.purpleColumn}>
                            <Entypo name="trophy" size={42} color="white" onPress={()=>this.props.navigation.navigate("Trophy", {id:9})}/>
                        </View> :
                        <View style={styles.greyColumn}>
                            <Entypo name="lock" size={42} color="black" />
                        </View>
                    }
                    {(this.state.Consistency >= 50) ?
                        <View style={styles.purpleColumn}>
                            <Entypo name="trophy" size={42} color="white" onPress={()=>this.props.navigation.navigate("Trophy", {id:10})}/>
                        </View> :
                        <View style={styles.greyColumn}>
                            <Entypo name="lock" size={42} color="black" />
                        </View>
                    }
                    {(this.state.Consistency >= 100) ?
                        <View style={styles.purpleColumn}>
                            <Entypo name="trophy" size={42} color="white" onPress={()=>this.props.navigation.navigate("Trophy", {id:11})}/>
                        </View> :
                        <View style={styles.greyColumn}>
                            <Entypo name="lock" size={42} color="black" />
                        </View>
                    }
                </View>
            </View>
        );
    };
}

const styles = StyleSheet.create({
    selfMangementRow: {
        flexDirection: 'row', flex: 3, paddingVertical: 20, //backgroundColor:"#4677D6"
    },
    socialAwarenessRow: {
        flexDirection: 'row', flex: 3, paddingVertical: 20, //backgroundColor: "#FF5D60"
    },
    InnovationRow: {
        flexDirection: 'row', flex: 3, paddingVertical: 20, // backgroundColor: "#FFC530"
    },
    ConsistencyRow: {
        flexDirection: 'row', flex: 3, paddingVertical: 20, // backgroundColor: "green"
    },
    blueColumn: {
        flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: "#4677D6", borderRadius: 40, margin: 25
    },
    redColumn: {
        flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FF5D60', borderRadius: 40, margin: 25
    },
    yellowColumn: {
        flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFC530', borderRadius: 40, margin: 25
    },
    purpleColumn: {
        flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#9932CC', borderRadius: 40, margin: 25
    },
    greyColumn: {
        flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: "grey", borderRadius: 40, margin: 25
    },
    colouredBlue: {
        backgroundColor: "#4677D6", borderRadius: 40, margin: 25
    },
    colouredRed: {
        backgroundColor: "#4677D6", borderRadius: 40, margin: 25
    },
    colouredYellow: {
        backgroundColor: "#4677D6", borderRadius: 40, margin: 25
    },
    colouredPurple: {
        backgroundColor: "#4677D6", borderRadius: 40, margin: 25
    },
    titleText: {
        fontSize: 32,
        padding: 20,
        textAlign: 'center'
    },
    tinyLogo: {
        width: 50,
        height: 50,
    },
    blueCircle: {
        marginRight: 40,
        marginLeft: 40,
        marginTop: 10,
        paddingTop: 20,
        backgroundColor: "#4677D6",
        borderRadius: 20,
        borderWidth: 1
    },
    redCircle: {
        marginRight: 40,
        marginLeft: 40,
        marginTop: 10,
        paddingHorizontal: 20,
        paddingBottom: 20,
        backgroundColor: "#4677D6",
        borderRadius: 10,
        borderWidth: 1
    },
    yellowCircle: {
        marginRight: 40,
        marginLeft: 40,
        marginTop: 10,
        paddingTop: 20,
        paddingBottom: 20,
        borderRadius: 10,
        borderWidth: 1
    }
})