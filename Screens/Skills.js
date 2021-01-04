import React, {Component} from 'react';
import { render } from 'react-dom';
import { View, Text, TouchableOpacity, StyleSheet, Button} from 'react-native';
import * as Notifications from 'expo-notifications';
import { AntDesign } from '@expo/vector-icons';



export default class Skills extends Component {
    constructor(props) {
        super(props); 
    }


    componentDidMount = () => {
        this.props.navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={() =>  this.props.navigation.navigate("Profile") }>
                    <AntDesign name="user" size={32} color="black" paddingRight="50" />
                </TouchableOpacity>),
        })
    }





render(){
    return(
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <TouchableOpacity onPress={()=>this.props.navigation.navigate("SelfManagement", {navProp:0})} style={styles.button1}>
                <Text style={styles.buttonText}>Self Management</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>this.props.navigation.navigate("SocialAwareness", {navProp:4})} style={styles.button2}>
                <Text style={styles.buttonText}>Social Intelligence</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>this.props.navigation.navigate("Innovation", {navProp:4})} style={styles.button3}>
                <Text style={styles.buttonText2}>Innovation</Text>
            </TouchableOpacity>
        </View>
    );
};

}

const styles = StyleSheet.create({
    selfManagement:{
        margin: "50px",
    },
    button1: {
        backgroundColor: "#4677D6",
        padding: 20,
        borderRadius: 10,
        paddingHorizontal: 30,
        margin: 40
      },
      button2: {
        backgroundColor: "#FF5D60",
        padding: 20,
        borderRadius: 4,
        margin: 40,
        paddingHorizontal:30
      },
      button3: {
        backgroundColor: "#FFC530",
        padding: 20,
        borderRadius: 4,
        margin: 40,
        paddingHorizontal: 60
      },
      test:{
        backgroundColor: "#FFC530",
        width: 200,
        borderRadius:4,
        margin:40,
        paddingVertical:20
      },
      buttonText: {
        fontSize: 20,
        color: '#fff',
      },
      buttonText2:{
          fontSize:20,
          color:"black"
      }
})