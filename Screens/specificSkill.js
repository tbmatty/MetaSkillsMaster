import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import { View, Text, Button, StyleSheet, SectionList, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import sectionListGetItemLayout from 'react-native-section-list-get-item-layout';


export default function specificSkill(props) {



    const [textstyles, setTextStyles] = useState(
        {
            "Self Management": styles.titleText,
            "Focussing": styles.subHeadingText,
            "Integrity": styles.subHeadingText,
            "Adapting": styles.subHeadingText,
            "Initiative": styles.subHeadingText
        }
    )

    const style = {
        "Focussing": [styles.containerBlue, styles.titleTextWhite, styles.bodyTextWhite,'#4677D6', "white" ],
        "Integrity": [styles.containerBlue, styles.titleTextWhite, styles.bodyTextWhite,'#4677D6' , "white"],
        "Adapting": [styles.containerBlue, styles.titleTextWhite, styles.bodyTextWhite,'#4677D6', "white" ],
        "Initiative": [styles.containerBlue, styles.titleTextWhite, styles.bodyTextWhite,'#4677D6', "white" ],
        "Communicating": [styles.containerRed, styles.titleTextWhite, styles.bodyTextWhite,'#FF5D60', "white" ],
        "Feeling": [styles.containerRed, styles.titleTextWhite, styles.bodyTextWhite,'#FF5D60', "white" ],
        "Collaboration": [styles.containerRed, styles.titleTextWhite, styles.bodyTextWhite,'#FF5D60', "white" ],
        "Leading": [styles.containerRed, styles.titleTextWhite, styles.bodyTextWhite,'#FF5D60', "white"],
        "Curiosity": [styles.containerYellow, styles.titleText, styles.bodyText,'#FFC530', "black"],
        "Creativity": [styles.containerYellow, styles.titleText, styles.bodyText, '#FFC530', "black"] ,
        "Sense Making": [styles.containerYellow, styles.titleText, styles.bodyText,'#FFC530', "black"] ,
        "Critical Thinking": [styles.containerYellow, styles.titleText, styles.bodyText,'#FFC530', "black"] 
    }



    useEffect(() => {

        props.navigation.setOptions({
            headerStyle: {
                backgroundColor: style[props.route.params.skill][3]
              },
            title: props.route.params.skill,
            headerTitleStyle: { color: style[props.route.params.skill][4] }
        })


    }, [])


    const info = {
        'Focussing': ['Stimuli are presented to us all day, every day, from a variety of sources. We need to find ways of focussing and managing our cognitive load. This information overload has been shown to increase stress and mental health issues. The ability to effectively filter and sort information to maintain a sense of focus is essential in an age of information abundance and constant change. Honing this ability can have significant positive impact on wellbeing, enabling individuals to be more efficient and effective workers who will drive productivity.',
            'The ability to focus incorporates:',
            [['Sorting', 'The ability to sort information into categories and to understand the relationship between information.'],
            ['Attention', 'The ability to focus on the present and deflect/avoid distractions.'],
            ['Filtering', 'The ability to filter out non-essential information and focus on the essential problem at hand.']]],
        'Integrity': ['At the core of self management is self awareness. This, coupled with a clear understanding of our personal values and a commitment to meeting these in our life and work, leads to integrity.This is important not only to support wellbeing but also as the basis for creating the future we want to see. Integrity ensures we always take into account what we believe to be ethical and fair. Integrity is acting in an honest and consistent manner based on a strong sense of self and personal values.',
            'The ability to carry yourself with integrity incorporates:',
            [['Self Awareness (reflexivity)', 'The ability to understand and manage emotions, strengths, belief systems and limitations, and the effects of these on behaviours and the way they impact on others.'],
            ['Ethics', 'Being aware of and acting upon personal values and principles.'],
            ['Self Control', 'The ability to exercise control over your own impulses, emotions and desires.']]],
        'Adapting': ['Adapting is the ability and interest to continue to enlarge knowledge, understanding and skills in order to demonstrate resilience as circumstances change. Learning is an extremely complex process. To be effective it includes having an open mind, being able to identify and solve problems, and being able to deal with new and underdeveloped concepts. It also requires the resilience to fail and the ability to restructure thoughts to accommodate new ideas and solutions.',
            'The ability to adapt incorporates:',
            [['Openness', 'Being open to new ideas and approaches by having a growth mindset.'],
            ['Critical Reflection', 'The ability to critically reflect on new knowledge and experiences in order to gain a deeper understanding, embed and extend learning.'],
            ['Adaptability', 'Flexibility when handling the unexpected, adapting to circumstances as they arise.'],
            ['Self-learning', 'The ability to self educate without the guidance of others.'],
            ['Resilience', 'Ability to respond positively and constructively to constantly evolving challenges and complexity.']]],
        'Initiative': ['Confidence has been acknowledged as a priority within Scotland for decades and it is no less important now. In this uncertain world we will need the courage and tenacity to take risks and try new things, enabling us to look into the future and see opportunities rather than fear change.  Initiative is a readiness to get started and act on opportunities built on a foundation of self belief. It encompasses two of the four capacities of the Curriculum for Excellence: confident individuals and effective contributors',
            'The ability to take initiative incorporates:',
            [['Courage', 'The ability to manage and overcome fear in order to take action.'],
            ['Independent Thinking', 'The ability to think for one’s self and trust one’s own judgement.'],
            ['Risk Taking', 'Doing something that involves danger or risk in order to achieve a goal.'],
            ['Decision Making', 'The act of making a considered choice after appropriately usingintuition and careful thought.'],
            ['Self Belief', 'A feeling of trust in one’s abilities, qualities and judgement.'],
            ['Self motivation', 'The ability to act without influence or encouragement from others.'],
            ['Responsibility', 'The ability to follow through on commitments, be proactive and take responsibility.'],
            ['Enterprising', 'Willingness to take risks, show initiative and undertake new ventures.']]],
        'Communicating': ['Communication is a basic human skill that has been at the heart of our education system for generations. Often, however, with over-emphasis on one way communication, resulting in employers being dissatisfied with the level of communication skills that their employees are able to demonstrate. This need for effective communication in a range of media is likely to increase in the future. The difference may be the depth at which we communicate and a greater emphasis on listening and gaining real understanding. Sharing information effectively will also continue to be of utmost importance.',
            'The ability to communicate incorporates:',
            [['Receiving information', 'Understanding and mentally processing verbal or written communication.'],
            ['Listening', 'The ability to actively understand information provided by the speaker, and display interest in the topic discussed.'],
            ['Giving information', 'Giving written or verbal communication in a way that can be best understood by those receiving the communication.'],
            ['Storytelling', 'The ability to tell stories that persuade, motivate and/or inspire as well as bringing the sharing of knowledge to life through examples and illustrations.']]],
        'Feeling': ['For those who are looking to shape change, feeling ensures this change has a positive societal impact, rather than just being innovation for innovation’s sake. Empathy has been identified as a key skill for the future by many.  Even though empathy is recognised as a vital skill for the future, it has also been noted that empathy is an attribute that has been diminishing in individuals over the last 15 years. Feeling is considering our impact on other people by being able to take a range of different perspectives, thoughts and feelings into account.',
            'The ability to bring feeling to what we do incorporates:',
            [['Empathy', 'The ability to take the perspective of others in order to understand their feelings and motivations.'],
            ['Social conscience', 'A sense of responsibility and concern for wider society.']]],
        'Collaboration': ['Collaboration is not a new skill either but evidence suggests that its importance is increasing, with the majority of roles requiring collaboration at some level. Collaboration is working in coordination with others to convey information or tackle problems. These team working and relationship building skills should be built on a foundation of social perceptiveness to make us all truly effective collaborators.',
            'The ability to collaborate incorporates:',
            [['Relationship building', 'The ability to identify and initiate connections and to develop and maintain them in a way that is of mutual benefit to both one’s self and others.'],
            ['Teamworking and Collaboration', 'Working with others toward shared goals, creating group synergy in pursuing collective goals.'],
            ['Social perceptiveness', 'Being aware of others’ reactions and understanding why they react as they do.'],
            ['Global and cross cultural competence', 'The ability to operate in different cultural settings.']]],
        'Leading': ['Leading is the ability to lead others by inspiring them with a clear vision and motivating them to realise this. The concept of all workers being empowered as leaders has even been demonstrated in one of the most hierarchical environments we can imagine – the armed forces. David Marquet was a naval captain onboard an underperforming submarine when he started to treat his crew as leaders themselves, rather than followers and started giving fewer orders (Marquet). This shift was transformational, resulting in workers who were proactive, creative and able to take initiative.',
            'The ability to lead incorporates:',
            [['Inspiring others', 'The ability to energise and create a sense of direction, purpose, excitement and momentum.'],
            ['Influencing', 'Working to gain the agreement of others to a particular course of action.'],
            ['Motivating others', 'Encouraging others to achieve goals, accomplish tasks, and complete objectives.'],
            ['Developing others', 'The ability to coach and constructively review the work of others to improve and advance their skills, knowledge and performance level.'],
            ['Change catalyst', 'Having the ability to ignite change.']]],
        'Curiosity': ['To deliver real innovation we need to start by being curious. Curiosity is the desire to know or learn something in order to inspire new ideas and concepts. Using research skills like observation, questioning, information sourcing and problem recognition will support us to understand, break down and find the root cause of a problem or opportunity in order to identify alternative solutions. We are all born with this curiosity. As children we ask questions and see things from unconventional perspectives but through learning to ‘fit in’ we often lose this ability. If we can make use of what are conventionally seen as naive qualities and combine this with the wisdom of experience, we will have a good basis for solving problems well.',
            'The ability to be curious incorporates:',
            [['Observation', 'The ability to notice behaviour or information and register it as being significant.'],
            ['Questioning', 'The ability to ask questions in order to increase understanding about a subject or experience.'],
            ['Information sourcing', 'The ability to filter resources and information to find information relevant to an issue or topic.'],
            ['Problem recognition', 'The acknowledgement and definition of a problem.']]],
        'Creativity': ['Creativity is the ability to imagine and think of new ways of addressing problems, answering questions or expressing meaning and is another quality we are born with. In the future we will need to begin to see creativity in its broadest sense. Using our imagination and developing the ability to visualise alternative solutions or states of being, supports us to be more effective learners and workers in any role. Its relevance will increase as we move away from the more routine tasks that typically don’t require us to think differently or actively discourage creativity.',
            'The ability to be creative incorporates:',
            [['Imagination', 'The ability to explore ideas of things that are not in our present environment, or perhaps not even real.'],
            ['Idea generation', 'Proficiency at thinking and coming up with solutions and responses beyond that which is rote or rule-based.'],
            ['Visualising', 'Translating information and thought into accessible expressions, readable and recognisable images.'],
            ['Maker mentality', 'The ability to explore, through tinkering and making, in order to arrive at new ideas and solutions.']]],
        'Sense Making': ['In this increasingly complex world we need people who can make sense of the vast amount of information available to solve complex problems to the best of our ability. Sense making is also about making sense of complex situations and doing so in real time to enable an effective response. Sense making is the ability to determine the deeper meaning or significance of what is being expressed and to recognise wider themes and patterns in information and situations.',
            'The ability to make sense of information incorporates:',
            [['Pattern recognition', 'The process of classifying information into objects or classes based on key features.'],
            ['Hollistic thinking', 'The ability to see the big picture and understand subtle nuances of complex situations.'],
            ['Synthesis', 'The process of organising, manipulating, pruning and filtering gathered data into cohesive structures for information building.'],
            ['Opportunity recognition', 'The ability to identify areas of opportunity for innovation.'],
            ['Analysis', 'A systematic examination and evaluation of data or information, by breaking it into its component parts to uncover their interrelationships.']]],
        'Critical Thinking': ['With the abundance of information we now have available to us, being able to process, analyse and evaluate this in order to solve problems will be even more important. Weighing up conflicting arguments using logical thinking tools and being able to make use of these tools in a variety of contexts will enable us to do this in complex, ever changing environments. With the increasing volume of information available online from a variety of sources, critical thinking is also required at a more basic level to help us tell fact from fiction. Critical thinking is the ability to evaluate and draw conclusions from information in order to solve complex problems and make decisions.',
            'The ability to solve complex problems incorporates:',
            [['Deconstruction', 'Breaking down a complex problem or system into smaller, more manageable parts before developing a new way of addressing the problem.'],
            ['Logical thinking', 'The ability to identify, analyse and evaluate situations, ideas and information in order to formulate responses to problems.'],
            ['Judgement', 'The act or process of forming an opinion after careful thought.'],
            ['Computational thought', 'The ability to translate vast amounts of data into abstract concepts and to understand data-based reasoning.']]],
    }



    return (
        <ScrollView style={style[props.route.params.skill][0]}>
            <Text style={style[props.route.params.skill][1]}>{props.route.params.skill}</Text>
            <Text style={style[props.route.params.skill][2]}>{info[props.route.params.skill][0]}</Text>
            <Text style={style[props.route.params.skill][1]}>{info[props.route.params.skill][1]}</Text>
            {info[props.route.params.skill][2].map((item, index) => (
                <Text key={index} style={style[props.route.params.skill][1]}>{item[0]}{"\n"}

                    {<Text style={style[props.route.params.skill][2]}>{item[1]}</Text>}
                </Text>

            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    titleText: {
        padding: 8,
        fontSize: 32,
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
        paddingVertical: 12,
        fontSize: 16,
        textAlign: 'left',
        color: 'black',
        fontWeight:'normal'
    },
    titleTextWhite: {
        padding: 8,
        fontSize: 32,
        textAlign: 'left',
        fontWeight: 'bold',
        color: 'white',
    },
    subHeadingTextWhite: {
        padding: 8,
        fontSize: 24,
        textAlign: 'left',
        fontWeight: 'bold',
        color: 'white'
    },
    bodyTextWhite: {
        paddingLeft: 16,
        paddingVertical: 12,
        fontSize: 16,
        textAlign: 'left',
        color: 'white',
        fontWeight:'normal'
    },
    containerBlue: {
        backgroundColor: '#4677D6',
        flex: 1,
    },
    containerRed:{
        backgroundColor: '#FF5D60',
        flex:1
    },
    containerYellow:{
        backgroundColor: '#FFC530',
        flex:1
    }
})