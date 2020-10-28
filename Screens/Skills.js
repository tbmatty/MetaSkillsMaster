import React, {Component} from 'react';
import { render } from 'react-dom';
import { View, Text, Button} from 'react-native';


export default class Skills extends Component {
    constructor(props) {
        super(props); 
    }


render(){
    return(
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button title="Self-Management" onPress={() => this.props.navigation.navigate('Home')} />
            <Button title="Social Awareness" onPress={() => this.props.navigation.setOptions({title:"HAHA"})} />
            <Button title="Innovation" onPress={() => this.props.navigation.setOptions({title:"HAHA"})} />

        </View>
    );
};

}