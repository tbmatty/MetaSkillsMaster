import React, {Component} from 'react';
import { render } from 'react-dom';
import { View, Text, Button} from 'react-native';
import { Audio } from 'expo-av';


export default class Reflection extends Component {
    constructor(props) {
        super(props); 
    }



surelyNot = async(uri) =>{
    const playbackObject = await Audio.Sound.createAsync(
        { uri: uri },
        { shouldPlay: true }
      );
}

render(){
    const{firebaseData} = this.props.route.params
    return(
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>{firebaseData[1]}</Text>
            <Text>{JSON.stringify(firebaseData[2])}</Text>
            <Text>{firebaseData[3]}</Text>
            <Text>{firebaseData[4]}</Text>
            <Button title="doobydoo" onPress = {()=>this.surelyNot(firebaseData[4])}/>
        </View>
    );
};

}