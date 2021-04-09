import React, { Component, useEffect } from 'react';
import { render } from 'react-dom';
import { View, Text, Button, StyleSheet, SectionList, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import sectionListGetItemLayout from 'react-native-section-list-get-item-layout';

export default class SocialAwareness extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    title: 'Social Intelligence',
                    data: ['Digital technology has allowed society to connect globally in new ways and will continue to make it easier to do so. It is also widely anticipated that existing sectoral and occupational boundaries will blur, so the need to have skills to connect and collaborate with people from diverse backgrounds is critical. To make a positive change in the world, we recognise that we can do this more effectively with others, making use of different perspectives to reach the best possible outcome.']
                },
                {
                    title: 'Communicating',
                    data: ['Communication is a basic human skill that has been at the heart of our education system for generations. Often, however, with over-emphasis on one way communication, resulting in employers being dissatisfied with the level of communication skills that their employees are able to demonstrate. This need for effective communication in a range of media is likely to increase in the future. The difference may be the depth at which we communicate and a greater emphasis on listening and gaining real understanding. Sharing information effectively will also continue to be of utmost importance.',
                        'The ability to communicate incorporates: Receiving information - Understanding and mentally processing verbal or written communication. Listening - The ability to actively understand information provided by the speaker, and display interest in the topic discussed. Giving information - Giving written or verbal communication in a way that can be best understood by those receiving the communication. Storytelling - The ability to tell stories that persuade, motivate and/or inspire as well as bringing the sharing of knowledge to life through examples and illustrations.'],
                },
                {
                    title: 'Feeling',
                    data: ['For those who are looking to shape change, feeling ensures this change has a positive societal impact, rather than just being innovation for innovation’s sake. Empathy has been identified as a key skill for the future by many.  Even though empathy is recognised as a vital skill for the future, it has also been noted that empathy is an attribute that has been diminishing in individuals over the last 15 years. Feeling is considering our impact on other people by being able to take a range of different perspectives, thoughts and feelings into account.',
                        'The ability to bring feeling to what we do incorporates: Empathy - The ability to take the perspective of others in order to understand their feelings and motivations. Social conscience - A sense of responsibility and concern for wider society.'],
                },
                {
                    title: 'Collaboration',
                    data: ['Collaboration is not a new skill either but evidence suggests that its importance is increasing, with the majority of roles requiring collaboration at some level. Collaboration is working in coordination with others to convey information or tackle problems. These team working and relationship building skills should be built on a foundation of social perceptiveness to make us all truly effective collaborators.',
                        'The ability to collaborate incorporates: Relationship building - The ability to identify and initiate connections and to develop and maintain them in a way that is of mutual benefit to both one’s self and others. Teamworking and Collaboration - Working with others toward shared goals, creating group synergy in pursuing collective goals. Social perceptiveness - Being aware of others’ reactions and understanding why they react as they do. Global and cross cultural competence - The ability to operate in different cultural settings.'],
                },
                {
                    title: 'Leading',
                    data: ['Leading is the ability to lead others by inspiring them with a clear vision and motivating them to realise this. The concept of all workers being empowered as leaders has even been demonstrated in one of the most hierarchical environments we can imagine – the armed forces. David Marquet was a naval captain onboard an underperforming submarine when he started to treat his crew as leaders themselves, rather than followers and started giving fewer orders (Marquet). This shift was transformational, resulting in workers who were proactive, creative and able to take initiative.',
                        'The ability to lead incorporates: Inspiring others - The ability to energise and create a sense of direction, purpose, excitement and momentum. Influencing - Working to gain the agreement of others to a particular course of action. Motivating others - Encouraging others to achieve goals, accomplish tasks, and complete objectives. Developing others - The ability to coach and constructively review the work of others to improve and advance their skills, knowledge and performance level. Change catalyst - Having the ability to ignite change.'],
                },
            ],
            textstyles: {
                "Social Intelligence": styles.titleText,
                "Communicating": styles.subHeadingText,
                "Feeling": styles.subHeadingText,
                "Collaboration": styles.subHeadingText,
                "Leading": styles.subHeadingText
            }
        }
    }

    




    render() {
        return (
           
            <ScrollView style={styles.container}>
                <Text style={styles.titleText}>Social Intelligence</Text>
                <Text style={styles.bodyText}>Digital technology has allowed society to connect globally in new ways and will continue to make it easier to do so. It is also widely anticipated that existing sectoral and occupational boundaries will blur, so the need to have skills to connect and collaborate with people from diverse backgrounds is critical. To make a positive change in the world, we recognise that we can do this more effectively with others, making use of different perspectives to reach the best possible outcome. {"\n"}{"\n"}Tap to learn more about the four sub-skills of social intelligence:</Text>
                <TouchableOpacity style={styles.button} onPress={()=>this.props.navigation.navigate("specificSkill", {skill: "Communicating"})}>
                    <Text style={styles.buttonText}>Communicating</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={()=>this.props.navigation.navigate("specificSkill", {skill: "Feeling"})}>
                    <Text style={styles.buttonText}>Feeling</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={()=>this.props.navigation.navigate("specificSkill", {skill: "Collaboration"})}>
                    <Text style={styles.buttonText}>Collaborating</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={()=>this.props.navigation.navigate("specificSkill", {skill: "Leading"})}>
                    <Text style={styles.buttonText}>Leading</Text>
                </TouchableOpacity>
            </ScrollView>
        );
    };
}

const styles = StyleSheet.create({
    titleText: {
        padding: 8,
        fontSize: 40,
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
        paddingLeft: 20,
        fontSize: 20,
        textAlign: 'left',
        color: 'white',
    },
    container: {
        backgroundColor: '#FF5D60',
        flex: 1,
    },
    button: {
        padding: 20,
        backgroundColor: "white",
        borderRadius: 4,
        margin: 20
    },
    buttonText:{
        color:'#FF5D60',
        fontSize:24
    }
})