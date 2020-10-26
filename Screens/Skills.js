import React, {Component} from 'react';
import { render } from 'react-dom';
import { View, Text, Button } from 'react-native';

export default class Home extends Component {
    constructor(props) {
        super(props); 
    }


render(){
    return(
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Skills Screen</Text>
            <Button title="Go to Home" onPress={() => this.props.navigation.navigate('Home')} />

        </View>
    );
};

}