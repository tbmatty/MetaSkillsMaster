import React, {Component} from 'react';
import { render } from 'react-dom';
import { View, Text, Button } from 'react-native';

export default class Skills extends Component {
    constructor(props) {
        super(props); 
    }


render(){
    return(
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>JSON.stringify(this.props.route.params.parameterPass)</Text>
            <Button title="Go to Home" onPress={() => this.props.navigation.navigate('Home')} />
            <Button title="Update the title" onPress={() => this.props.navigation.setOptions({title:"HAHA"})} />
        </View>
    );
};

}