import React, {Component} from 'react';
import { render } from 'react-dom';
import { View, Text, Button} from 'react-native';


export default class Innovation extends Component {
    constructor(props) {
        super(props); 
    }


render(){
    return(
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Innovation</Text>
        </View>
    );
};
}