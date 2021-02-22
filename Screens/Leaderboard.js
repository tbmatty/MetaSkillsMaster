import React, { Component } from 'react';
import { render } from 'react-dom';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as firebase from "firebase";
import { format, isThisWeek, startOfWeek } from 'date-fns';
import { ScrollView } from 'react-native-gesture-handler';


export default class Leaderboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            confused: true,
            userDataArray: [],
            displayArray: [],
            testArray: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
            isLoading: true,
            userGlobalPos: 0
        }
    }

    //Only called from getAllUserData
    selectSliceFromArrayCloseToBottom = (index) => {
        var testArray = this.state.userDataArray
        var whatYouWant = []
        //Arrays start at 0
        var userDistanceFromBottom = testArray.length - index - 1
        //+1 to include user position
        var slicingUp = 15 - (userDistanceFromBottom + 1)
        //Slicing stops early
        whatYouWant = testArray.slice(index - slicingUp, index + userDistanceFromBottom + 1)

        console.log(userDistanceFromBottom)
        console.log(slicingUp)
        console.log(whatYouWant)
        this.setState({ displayArray: whatYouWant })
        this.updateFirebase(whatYouWant)
    }

    //Only called from getAllUserData
    selectSliceFromArrayStraightDown = (index) => {
        var testArray = this.state.userDataArray
        var whatYouWant = []
        whatYouWant = testArray.slice(index, index + 15)
        console.log(whatYouWant)
        this.setState({ displayArray: whatYouWant })
        this.updateFirebase(whatYouWant)
    }

    updateFirebase = (LeaderboardUsers) =>{
        var date = format(new Date(), "dd-MM-yyyy");
        let userRef =  firebase.firestore().collection("Users").doc(uid)
        userRef.set({
            LeaderboardWeek:date,
            LeaderboardUsers:LeaderboardUsers,
        },{merge:true})
    }

    componentDidMount = () => {
        this.setState({ isLoading: true })
        this.decideDataGather()
        console.log(this.state.userDataArray)
        console.log("KUMBAYA")
    }

    decideDataGather = async () => {
        var uid = firebase.auth().currentUser.uid
        var LeaderboardUsers = []
        //dd-MM-yyyy
        var LeaderboardWeek = ""
        let userRef =  firebase.firestore().collection("Users").doc(uid)
        await userRef.get().then(doc => {
            LeaderboardUsers = doc.data().LeaderboardUsers
            LeaderboardWeek = doc.data().LeaderboardWeek
        })

        var date = format(new Date(), "dd-MM-yyyy");
        if (LeaderboardUsers.length == 0) {
            this.getAllUserData()
        }
        if (LeaderboardWeek=="") {
            userRef.set({
                LeaderboardWeek:date
            },{merge:true})
        }
        var dateFromFirebase = new Date(parseInt(LeaderboardWeek.slice(6,10)), parseInt(LeaderboardWeek.slice(3,5),parseInt(LeaderboardWeek.slice(0,2))))
        if(isThisWeek(dateFromFirebase)){
            //Get only select Data
            this.getSelectUserData(LeaderboardUsers)
        }else{
            this.getAllUserData()
        }
    }

    getAllUserData = async () => {
        var userDataArray = [] // [[userID, userName, xp], ...]
        var i = 0
        var userPositionInArray = 0
        var uid = firebase.auth().currentUser.uid
        let userRef = await firebase.firestore().collection("Users").get().then(snapshot => {
            snapshot.forEach(doc => {
                userDataArray.push([doc.id, doc.data().name, doc.data().xp])
                if (doc.id === uid) {
                    userPositionInArray = i
                }
                i++;
            })
        })

        userDataArray.sort(function (a, b) {
            return b[2] - a[2]
        })

        for (var i = 0; i < userDataArray.length; i++) {
            if (userDataArray[i][0] === uid) {
                this.setState({userGlobalPos: i+1})
            }
        }




        console.log(userDataArray)


        this.setState({
            userDataArray: userDataArray,
        })

        var displayArray = []
        var userDistanceFromBottom = userDataArray.length - userPositionInArray
        if (userDataArray.length <= 15) {
            this.setState({ displayArray: userDataArray })
        } else if (userDistanceFromBottom < 15) {
            this.selectSliceFromArrayCloseToBottom(userPositionInArray)
        } else {
            this.selectSliceFromArrayStraightDown(userPositionInArray)
        }

        this.setState({ isLoading: false })

    }

    getSelectUserData = async (LeaderboardUsers)=>{
        var i=0
        var whatYouWant = []
        while(true){
            let userRef = firebase.firestore().collection("Users").doc(LeaderboardUsers[i][0]).get().then(doc=>{
                whatYouWant.push([doc.id, doc.data().name, doc.data().xp])
            })
            i++
            if(i==15){
                break;
            }
        }
        whatYouWant.sort(function (a, b) {
            return b[2] - a[2]
        })
        this.setState({displayArray:whatYouWant})

    }





    render() {
        return (
            <View>
                <Text style={styles.titleText}>Weekly Leaderboard</Text>
                {this.state.isLoading ? <Text>loading</Text> :
                    <ScrollView>
                        <Text style={styles.globalLeaderboardInfo}>Your position on the global leaderboard: #{this.state.userGlobalPos}</Text>
                        {this.state.displayArray.map((item, index) => (
                            <TouchableOpacity key={item[0]}>
                                <View style={styles.container}>
                                    <View style={{ flex: 1 }}>
                                        <Text style={styles.buttonText}>#{index+1}</Text>
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <Text style={styles.buttonText}>{item[1]}</Text>
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <Text style={styles.buttonText}>{item[2]}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))
                        }
                    </ScrollView>
                }
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: "white",
        borderRadius: 4,
        margin: 20,
        flex: 3,
        flexDirection: 'row'
    },
    titleText: {
        fontSize: 32,
        padding: 20,
        textAlign:'center'
    },
    globalLeaderboardInfo:{
        fontSize: 22,
        padding: 20,
        textAlign:'center'
    },
    buttonText: {
        fontSize: 18,
        
        textAlign:'center'
    }
})