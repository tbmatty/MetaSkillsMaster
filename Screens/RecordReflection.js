import React, { Component, useState } from 'react';
import { render } from 'react-dom';
import { View, Text, Button, SafeAreaView, StyleSheet, ScrollView, List } from 'react-native';
import * as firebase from "firebase";
import { TextInput } from 'react-native-gesture-handler';
import { format } from 'date-fns';
import SearchableDropdown from 'react-native-searchable-dropdown';



export default class RecordReflection extends Component {


    constructor(props) {
        super(props);

        this.state = {
            textEntry: '',
            val: '',
            items: [
                { "id": "0", "name": "Self Management" },
                { "id": "1", "name": "Social Awareness" },
                { "id": "2", "name": "Innovation" }
            ],
            skillSelection: [["-1","..."]],
        }
    }



    handleSubmit = () => {
        console.log(this.state.skillSelection)
        // var date = format(new Date(), "dd-MM-yyyy");
        // var uid = firebase.auth().currentUser.uid;
        // console.log(date);
        // let setVal = firebase.firestore().collection("Recordings").doc(uid).collection("Recordings").doc(JSON.stringify(date)).set({
        //     textEntry: this.state.textEntry,
        // })
    }

    handleItemPress = (item) =>{
        console.log(item)
        var check = this.state.skillSelection[0][0]
        if(check=="-1"){
            console.log("only once")
            this.setState({
                skillSelection : [[item.id, item.name]]
            })
        }else{
            var array = this.state.skillSelection
            array.push([item.id, item.name])
            console.log(array)
            // console.log(nuArray)
            this.setState({
                skillSelection: array
            })
        }
        // console.log(this.state.skillSelection);
    }

    render() {



        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <SafeAreaView style={styles.container}>
                    <View style={styles.container}>
                        <Text style={styles.titleText}>
                            Time for recording a reflection on a meta-skill!
                        </Text>
                        <Text style={styles.titleText}>
                            What meta skills have you developed recently?
                        </Text>
                        <SearchableDropdown
                            onTextChange={text => console.log("text")}
                            //On text change listner on the searchable input
                            onItemSelect={item => this.handleItemPress(item)}
                            //onItemSelect called after the selection from the dropdown
                            containerStyle={{ padding: 5 }}
                            //suggestion container style
                            textInputStyle={{
                                //inserted text style
                                padding: 12,
                                borderWidth: 1,
                                borderColor: '#ccc',
                                backgroundColor: '#FAF7F6',
                            }}
                            itemStyle={{
                                //single dropdown item style
                                padding: 10,
                                marginTop: 2,
                                backgroundColor: '#FAF9F8',
                                borderColor: '#bbb',
                                borderWidth: 1,
                            }}
                            itemTextStyle={{
                                //text style of a single dropdown item
                                color: '#222',
                            }}
                            itemsContainerStyle={{
                                //items container style you can pass maxHeight
                                //to restrict the items dropdown hieght
                                maxHeight: '60%',
                            }}
                            items={this.state.items}
                            //mapping of item array
                            defaultIndex={2}
                            //default selected item index
                            placeholder="placeholder"
                            //place holder for the search input
                            resetValue={false}
                            //reset textInput Value with true and false state
                            underlineColorAndroid="transparent"
                        //To remove the underline from the android input
                        />
                        <ScrollView style={styles.container}>
                            {this.state.skillSelection.map((item) => (
                                <Text>{item[1]}</Text>
                            ))
                            }
                        </ScrollView>
                        <TextInput
                            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                            placeholder="Enter your reflections here"
                            onChangeText={textEntry => this.setState({ textEntry })}
                            value={this.state.textEntry}
                        />

                        <Button
                            title="Submit"
                            onPress={this.handleSubmit}
                        />
                    </View>
                </SafeAreaView>

            </View>
        );
    };
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 10,
    },
    titleText: {
        padding: 8,
        fontSize: 16,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    headingText: {
        padding: 8,
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
});