import React, {Component} from 'react';
import { render } from 'react-dom';
import { View, Text, Button} from 'react-native';


export default class SelfManagement extends Component {
    constructor(props) {
        super(props); 
    }


render(){
    return(
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Self management</Text>
        </View>
    );
};
}