import React, { useEffect, useState } from 'react';
import { render } from 'react-dom';
import { ScrollView, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as firebase from 'firebase'
import { roundToNearestMinutes } from 'date-fns';


export default function Reflections(props) {

    const monthIntMap = {
        "01": "January",
        "02": "February",
        "03": "March",
        "04": "April",
        "05": "May",
        "06": "June",
        "07": "July",
        "08": "August",
        "09": "September",
        "10": "October",
        "11": "November",
        "12": "December"
    }

    const [firebaseArray, setFirebaseArray] = useState(props.route.params.firebaseArray)
    const monthYear = props.route.params.monthYear

    const handleButtonPress = (item) => {
        props.navigation.navigate("Reflection", { firebaseData: item })
    }


   


    return (
        <ScrollView contentContainerStyle={{
        }}>
            <Text style={styles.titleText}>{monthIntMap[monthYear.slice(0, 2)] + " " + monthYear.slice(3,)}</Text>
            {firebaseArray.map((item) => (
                <TouchableOpacity
                    style={{
                        padding: 20,
                        backgroundColor: item[1][5],
                        borderRadius: 4,
                        margin: 20
                    }}
                    key={item[0]}
                    onPress={() => handleButtonPress(item[1])}
                >
                    <Text style={{
                        fontSize: 18,
                        paddingLeft: 20,
                        color: item[1][6]
                    }}
                    >{item[1][7]}</Text>
                </TouchableOpacity>
            ))
            }
        </ScrollView>
    );

}

const styles = StyleSheet.create({
    titleText: {
        fontSize: 32,
        padding: 20
    }
})