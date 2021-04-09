import React, { Component } from 'react';
import { render } from 'react-dom';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import * as firebase from "firebase";
import { format, isThisWeek, startOfWeek } from 'date-fns';
import { ScrollView } from 'react-native-gesture-handler';
import { alignPropType } from 'react-bootstrap/esm/DropdownMenu';


export default class Leaderboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            confused: true,
            userDataArray: [],
            displayArray: [],
            testArray: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
            isLoading: true,
            userGlobalPos: 0,
            userPositionInArray: 0
        }
    }

    //Only called from getAllUserData
    //Selects a 15 slice from the array when the user is close to the bottom
    selectSliceFromArrayCloseToBottom = (index) => {
        var stateArray = this.state.userDataArray
        var arrayWithUser = []
        //Arrays start at 0
        var userDistanceFromBottom = stateArray.length - index - 1
        //+1 to include user position
        var slicingUp = 15 - (userDistanceFromBottom + 1)
        //Slicing stops early
        arrayWithUser = stateArray.slice(index - slicingUp, index + userDistanceFromBottom + 1)
        this.setState({ displayArray: arrayWithUser })

        var columnForFirebase = this.selectColumnFindIndex(arrayWithUser)
        this.updateFirebase(columnForFirebase)

    }

    //Only called from getAllUserData
    //Selects a 15 slice from the array with user at pos 0
    selectSliceFromArrayStraightDown = (index) => {
        var stateArray = this.state.userDataArray
        var arrayWithUser = []
        arrayWithUser = stateArray.slice(index-1, index + 15)
        this.setState({ displayArray: arrayWithUser })
        
        //Get array of user IDs
        var columnForFirebase = this.selectColumnFindIndex(arrayWithUser)
        this.updateFirebase(columnForFirebase)
    }

    //Update user document to include the users in their leaderboard
    //Update date
    updateFirebase = (LeaderboardUsers) => {
        var uid = firebase.auth().currentUser.uid
        var date = format(new Date(), "dd-MM-yyyy");
        let userRef = firebase.firestore().collection("Users").doc(uid)
        userRef.set({
            LeaderboardWeek: date,
            LeaderboardUsers: LeaderboardUsers,
        }, { merge: true })
        this.setState({ isLoading: false })
    }

    //Calls decideDataGather
    componentDidMount = async () => {
        this.setState({ isLoading: true })
        await this.decideDataGather()
    }

    //Chooses whether or not to re-rank all users, or just those in the user's weekly leader board group
    decideDataGather = async () => {
        //
        //Checks if the user document contains empty fields for the leader board data
        //
        var uid = firebase.auth().currentUser.uid
        var LeaderboardUsers = []
        var LeaderboardWeek = ""
        let userRef = firebase.firestore().collection("Users").doc(uid)
        await userRef.get().then(doc => {
            LeaderboardUsers = doc.data().LeaderboardUsers
            LeaderboardWeek = doc.data().LeaderboardWeek
        })

        var date = format(new Date(), "dd-MM-yyyy");
        if (LeaderboardUsers.length == 0) {
            this.getAllUserData()
            return;
        }
        if (LeaderboardWeek == "") {
            userRef.set({
                LeaderboardWeek: date
            }, { merge: true })
        }

        var splitUpWeek = LeaderboardWeek.split("-")

        var dateFromFirebase = new Date(splitUpWeek[2], splitUpWeek[1] - 1, splitUpWeek[0])

        //Decides data gather here
        if (isThisWeek(dateFromFirebase)) {
            this.getSelectUserData(LeaderboardUsers)
        } else {
            this.getAllUserData()
        }
    }

    //Gets all  user data and sorts by XP
    getAllUserData = async () => {
        var userDataArray = [] // [[userID, userName, xp], ...]
        var uid = firebase.auth().currentUser.uid
        let userRef = await firebase.firestore().collection("Users").get().then(snapshot => {
            snapshot.forEach(doc => {
                userDataArray.push([doc.id, doc.data().name, doc.data().xp])
            })
        })

        userDataArray.sort(function (a, b) {
            return b[2] - a[2]
        })

        for (var i = 0; i < userDataArray.length; i++) {
            if (userDataArray[i][0] === uid) {
                this.setState({ userGlobalPos: i + 1 })
            }
        }






        this.setState({
            userDataArray: userDataArray,
        })

        var userPositionInArray = this.state.userGlobalPos

        var displayArray = []
        var userDistanceFromBottom = userDataArray.length - userPositionInArray
        if (userDataArray.length <= 15) {
            this.setState({ displayArray: userDataArray })
            var columnForFirebase = this.selectColumnFindIndex(userDataArray)
            this.updateFirebase(columnForFirebase)
        }
        
        if (userDistanceFromBottom < 15) {
            this.selectSliceFromArrayCloseToBottom(userPositionInArray)
        } else {
            this.selectSliceFromArrayStraightDown(userPositionInArray)
        }

        this.setState({ isLoading: false })
    }

    
    getSelectUserData = async (LeaderboardUsers) => {
        var i = 0
        var whatYouWant = []
        let userCollectionRef = firebase.firestore().collection("Users")
        for (i = 0; i < LeaderboardUsers.length; i++) {
            await userCollectionRef.doc(LeaderboardUsers[i]).get().then(doc => {
                whatYouWant.push([doc.id, doc.data().name, doc.data().xp])
            })
        }
        whatYouWant.sort(function (a, b) {
            return b[2] - a[2]
        })

        var uid = firebase.auth().currentUser.uid

        await firebase.firestore().collection("Users").doc(uid).get().then(doc => {
            this.setState({ userGlobalPos: doc.data().GlobalLeaderboardPosition })
        })

        var columnForFirebase = this.selectColumnFindIndex(whatYouWant)
        this.updateFirebase(columnForFirebase)


        this.setState({ displayArray: whatYouWant })

    }


    selectColumnFindIndex = (array) => {
        var column = [];
        var uid = firebase.auth().currentUser.uid
        for (var i = 0; i < array.length; i++) {
            column.push(array[i][0]);
            if (array[i][0] == uid) {
                this.setState({ userPositionInArray: i + 1 })
            }
        }
        return column;
    }

    handleNavToProfile = async(uid) => {
        var userBadgeProgressNumbers
        var userName
        var userDescription
        var userProfilePicURI
        var userXP
        await firebase.firestore().collection("BadgeProgress").doc(uid).get().then(doc => {
            userBadgeProgressNumbers=[doc.data().SelfManagement, doc.data().SocialAwareness, doc.data().Innovation, doc.data().Consistency]
        })
        await firebase.firestore().collection("Users").doc(uid).get().then(doc => {
            userName = doc.data().name
            userDescription = doc.data().description
            userProfilePicURI = doc.data().profilePicURI
            userXP = doc.data().xp
        })

        var i = 0
        var badges = []
        var x
        for (x in userBadgeProgressNumbers) {
            i = 0;
            if (x >= 10) {
                i++;
                if (x >= 50) {
                    i++;
                    if (x >= 100) {
                        i++;
                    }
                }
            }
            badges.push(i)
        }

        this.props.navigation.navigate("UserProfile", 
        {userName: userName,
        userDescription: userDescription,
        userProfilePicURI: userProfilePicURI,
        userXP:userXP,
        badges:badges,
        profileID:uid})

    }




    render() {
        return (
            <View>
                {this.state.isLoading ? 
                <View style={{alignContent: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator size="large" color="blue" />
                </View> :
                    <ScrollView>
                        <Text style={styles.titleText}>Weekly Leaderboard</Text>
                        <Text style={styles.globalLeaderboardInfo}>Your position on the weekly leaderboard: #{this.state.userPositionInArray}</Text>
                        <Text style={styles.globalLeaderboardInfo}>Your position on the global leaderboard: #{this.state.userPositionInArray}</Text>
                        {this.state.displayArray.map((item, index) => (
                            <TouchableOpacity key={item[0]} onPress={()=>this.handleNavToProfile(item[0])}>
                                <View style={styles.container}>
                                    <View style={{ flex: 1 }}>
                                        <Text style={styles.buttonText}>#{index + 1}</Text>
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
        textAlign: 'center'
    },
    globalLeaderboardInfo: {
        fontSize: 22,
        padding: 20,
        textAlign: 'center'
    },
    buttonText: {
        fontSize: 18,

        textAlign: 'center'
    }
})