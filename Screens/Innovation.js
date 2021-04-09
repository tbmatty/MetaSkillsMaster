import React, { Component } from 'react';
import { render } from 'react-dom';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';


export default class Innovation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //data used for passing information to the specificSkill.js screen
            data: [
                {
                    title: 'Innovation',
                    data: ['Innovation can be demonstrated at a range of levels; from individuals having curious, open, creative mindsets that support their own learning, to businesses developing and making use of new technology to strengthen the Scottish economy, to international organisations solving global challenges.']
                },
                {
                    title: 'Curiosity',
                    data: ['To deliver real innovation we need to start by being curious. Curiosity is the desire to know or learn something in order to inspire new ideas and concepts. Using research skills like observation, questioning, information sourcing and problem recognition will support us to understand, break down and find the root cause of a problem or opportunity in order to identify alternative solutions. We are all born with this curiosity. As children we ask questions and see things from unconventional perspectives but through learning to ‘fit in’ we often lose this ability. If we can make use of what are conventionally seen as naive qualities and combine this with the wisdom of experience, we will have a good basis for solving problems well.',
                            'The ability to be curious incorporates: Observation - The ability to notice behaviour or information and register it as being significant. Questioning - The ability to ask questions in order to increase understanding about a subject or experience. Information sourcing - The ability to filter resources and information to find information relevant to an issue or topic. Problem recognition - The acknowledgement and definition of a problem.'],
                },
                {
                    title: 'Creativity',
                    data: ['Creativity is the ability to imagine and think of new ways of addressing problems, answering questions or expressing meaning and is another quality we are born with. In the future we will need to begin to see creativity in its broadest sense. Using our imagination and developing the ability to visualise alternative solutions or states of being, supports us to be more effective learners and workers in any role. Its relevance will increase as we move away from the more routine tasks that typically don’t require us to think differently or actively discourage creativity.', 
                            'Additional info can go below wow!'],
                },
                {
                    title: 'Sense Making',
                    data: ['In this increasingly complex world we need people who can make sense of the vast amount of information available to solve complex problems to the best of our ability. Sense making is also about making sense of complex situations and doing so in real time to enable an effective response. Sense making is the ability to determine the deeper meaning or significance of what is being expressed and to recognise wider themes and patterns in information and situations.',
                            'The ability to make sense of information incorporates: Pattern recognition - The process of classifying information into objects or classes based on key features. Hollistic thinking - The ability to see the big picture and understand subtle nuances of complex situations. Synthesis - The process of organising, manipulating, pruning and filtering gathered data into cohesive structures for information building. Opportunity recognition - The ability to identify areas of opportunity for innovation. Analysis - A systematic examination and evaluation of data or information, by breaking it into its component parts to uncover their interrelationships.'],
                },
                {
                    title: 'Critical Thinking',
                    data: ['With the abundance of information we now have available to us, being able to process, analyse and evaluate this in order to solve problems will be even more important. Weighing up conflicting arguments using logical thinking tools and being able to make use of these tools in a variety of contexts will enable us to do this in complex, ever changing environments. With the increasing volume of information available online from a variety of sources, critical thinking is also required at a more basic level to help us tell fact from fiction. Critical thinking is the ability to evaluate and draw conclusions from information in order to solve complex problems and make decisions.',
                            'The ability to solve complex problems incorporates: Deconstruction - Breaking down a complex problem or system into smaller, more manageable parts before developing a new way of addressing the problem. Logical thinking - The ability to identify, analyse and evaluate situations, ideas and information in order to formulate responses to problems. Judgement - The act or process of forming an opinion after careful thought. Computational thought - The ability to translate vast amounts of data into abstract concepts and to understand data-based reasoning.'],
                },
            ],
            textstyles:{
                "Innovation" : styles.titleText,
                "Curiosity" : styles.subHeadingText,
                "Creativity" : styles.subHeadingText,
                "Sense Making" : styles.subHeadingText,
                "Critical Thinking" : styles.subHeadingText
            }
        }
    }



    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.titleText}>Innovation</Text>
                <Text style={styles.bodyText}>Innovation can be demonstrated at a range of levels; from individuals having curious, open, creative mindsets that support their own learning, to businesses developing and making use of new technology to strengthen the Scottish economy, to international organisations solving global challenges. {"\n"} {"\n"} Tap to learn more about the four sub-skills of innovation:</Text>
                <TouchableOpacity style={styles.button} onPress={()=>this.props.navigation.navigate("specificSkill", {skill: "Curiosity"})}>
                    <Text style={styles.buttonText}>Curiosity</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={()=>this.props.navigation.navigate("specificSkill", {skill: "Creativity"})}>
                    <Text style={styles.buttonText}>Creativity</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={()=>this.props.navigation.navigate("specificSkill", {skill: "Sense Making"})}>
                    <Text style={styles.buttonText}>Sense Making</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={()=>this.props.navigation.navigate("specificSkill", {skill: "Critical Thinking"})}>
                    <Text style={styles.buttonText}>Critical Thinking</Text>
                </TouchableOpacity>
            </View>
        );
    };
}

const styles = StyleSheet.create({
    titleText: {
        padding: 8,
        fontSize: 40,
        textAlign: 'left',
        fontWeight: 'bold',
        color: 'black',
    },
    subHeadingText: {
        padding: 8,
        fontSize: 24,
        textAlign: 'left',
        fontWeight: 'bold',
        color: 'black'
    },
    bodyText: {
        paddingLeft: 16,
        fontSize: 20,
        textAlign: 'left',
        color: 'black',
    },
    container: {
        backgroundColor: '#FFC530',
        flex: 1,
    },
    button: {
        padding: 20,
        backgroundColor: "#212121",
        borderRadius: 4,
        margin: 20
    },
    buttonText:{
        color:'yellow',
        fontSize:24
    }

})