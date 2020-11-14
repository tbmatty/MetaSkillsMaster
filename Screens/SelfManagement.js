import React, {Component} from 'react';
import { render } from 'react-dom';
import { View, Text, Button, TouchableOpacity} from 'react-native';
import { AntDesign } from '@expo/vector-icons';


export default class SelfManagement extends Component {
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
            <Text>Self management</Text>
        </View>
    );
};
}