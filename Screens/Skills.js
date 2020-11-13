import React, {Component} from 'react';
import { render } from 'react-dom';
import { View, Text, TouchableOpacity, StyleSheet} from 'react-native';


export default class Skills extends Component {
    constructor(props) {
        super(props); 
    }


render(){
    return(
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <TouchableOpacity onPress={()=>this.props.navigation.navigate("SelfManagement")} style={styles.button1}>
                <Text style={styles.buttonText}>Self Management</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>this.props.navigation.navigate("SocialAwareness")} style={styles.button2}>
                <Text style={styles.buttonText}>Social Intelligence</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>this.props.navigation.navigate("Innovation")} style={styles.button3}>
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