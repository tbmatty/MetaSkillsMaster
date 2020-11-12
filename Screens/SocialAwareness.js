import React, { Component } from 'react';
import { render } from 'react-dom';
import { ScrollView, Text, Button, StyleSheet } from 'react-native';


export default class SocialAwareness extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <ScrollView style={styles.container}>
                <Text style={styles.titleText}>Social intelligence: connect with the world</Text>
                <Text style={styles.bodyText}>Digital technology has allowed society to connect globally in new ways
and will continue to make it easier to do so. It is also widely anticipated
that existing sectoral and occupational boundaries will blur (Kelly, 2015)
so the need to have skills to connect and collaborate with people from
diverse backgrounds is critical. To make a positive change in the world, we
recognise that we can do this more effectively with others, making use of
different perspectives to reach the best possible outcome.</Text>
                <Text style={styles.subHeadingText}>Communicating</Text>
                <Text style={styles.bodyText}>Communication is a basic human skill that has been at the heart of our education system for
generations. Often, however, with over-emphasis on one way communication, resulting in
employers being dissatisfied with the level of communication skills that their employees are
able to demonstrate (CBI, 2016). This need for effective communication in a range of media is
likely to increase in the future. The difference may be the depth at which we communicate and
a greater emphasis on listening and gaining real understanding. Sharing information effectively
will also continue to be of utmost importance. In an increasingly complex future, where
people have much more autonomy over the organisation of their work (CIPD 2008), clarity in
communication will be vital – in all directions and at all levels. The ancient art of story telling is
already being evidenced as a valuable method of communication (Monarth, 2014), and is likely
to have increasing application as we look to influence others in the process of making change.
Communication is the ability to openly and honestly share information in a way that creates
mutual understanding about thoughts, intentions and ideas between all parties involved.
Within the accountancy profession it is recognised that skills like communication will be of
increasing importance as a significant number of technical skills performed by the profession
have the potential to be automated in the future (ACCA). While machines can produce detailed
information, there is a potential for workers to take on the role of interpreting this, making use
of effective communication skills and story telling to bring information to life.</Text>

            </ScrollView>
        );
    };
}

const styles = StyleSheet.create({
    titleText: {
        padding: 8,
        fontSize: 32,
        textAlign: 'left',
        fontWeight: 'bold',
        color: 'white',
    },
    subHeadingText: {
        padding: 8,
        fontSize: 24,
        textAlign: 'left',
        fontWeight: 'bold',
        color: 'white'
    },
    bodyText: {
        paddingLeft: 16,
        fontSize:16,
        textAlign: 'left',
        color: 'white',
    },
    container: {
        backgroundColor: '#FF5D60',
        flex:1,
    }
})