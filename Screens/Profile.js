import React, { Component } from 'react';
import { render } from 'react-dom';
import { View, Text, Button } from 'react-native';
import * as firebase from "firebase";
import DateTimePicker from '@react-native-community/datetimepicker';

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            mode: 'time',
            show: false
        }
    }
    onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        this.setState({
            show: Platform.OS === 'ios',
            date: currentDate
        })
        console.log(currentDate)
      };
    

    showDatePicker = () => {
        this.setState({
            show:true,
        })
      };

    hideDatePicker = () =>{
        this.setState({
            show:false,
        })
    }

    render() {
        return (
            <View>
                <Text>Log out ya dafty</Text>
                <Button title="Log out" onPress={() => firebase.auth().signOut()} />
                <Button title="aha" onPress={()=>this.showDatePicker()}/>
                {this.state.show ? 
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={this.state.date}
                        mode={this.state.mode}
                        is24Hour={true}
                        display="default"
                        onChange={this.onChange}
                    />:null
                }
            </View>
        );
    };
}