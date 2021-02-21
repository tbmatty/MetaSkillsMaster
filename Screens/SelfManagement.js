import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import { SafeAreaView, Text, Button, StyleSheet, SectionList } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import sectionListGetItemLayout from 'react-native-section-list-get-item-layout';


export default function SelfManagement(props) {



    const [textstyles, setTextStyles] = useState(
        {
            "Self Management": styles.titleText,
            "Focussing": styles.subHeadingText,
            "Integrity": styles.subHeadingText,
            "Adapting": styles.subHeadingText,
            "Initiative": styles.subHeadingText
        }
    )

    const [data, setData] = useState(
        [
            {
                title: 'Self Management',
                data: ['Self management is required to cope with ongoing change in life and to support wellbeing, growth and ultimately performance and productivity.']
            },
            {
                title: 'Focussing',
                data: ['Stimuli are presented to us all day, every day, from a variety of sources. We need to find ways of focussing and managing our cognitive load. This information overload has been shown to increase stress and mental health issues. The ability to effectively filter and sort information to maintain a sense of focus is essential in an age of information abundance and constant change. Honing this ability can have significant positive impact on wellbeing, enabling individuals to be more efficient and effective workers who will drive productivity.',
                       'The ability to focus incorporates: Sorting - The ability to sort information into categories and to understand the relationship between information. Attention - The ability to focus on the present and deflect/avoid distractions. Filtering - The ability to filter out non-essential information and focus on the essential problem at hand.'],

            },
            {
                title: 'Integrity',
                data: ['At the core of self management is self awareness. This, coupled with a clear understanding of our personal values and a commitment to meeting these in our life and work, leads to integrity.This is important not only to support wellbeing but also as the basis for creating the future we want to see. Integrity ensures we always take into account what we believe to be ethical and fair. Integrity is acting in an honest and consistent manner based on a strong sense of self and personal values.',
                        'The ability to carry yourself with integrity incorporates: Self Awareness (reflexivity) - The ability to understand and manage emotions, strengths, belief systems and limitations, and the effects of these on behaviours and the way they impact on others. Ethics - Being aware of and acting upon personal values and principles. Self Control - The ability to exercise control over your own impulses, emotions and desires.'],
            },
            {
                title: 'Adapting',
                data: ['Adapting is the ability and interest to continue to enlarge knowledge, understanding and skills in order to demonstrate resilience as circumstances change. Learning is an extremely complex process. To be effective it includes having an open mind, being able to identify and solve problems, and being able to deal with new and underdeveloped concepts. It also requires the resilience to fail and the ability to restructure thoughts to accommodate new ideas and solutions.',
                        'The ability to adapt incorporates: Openness - Being open to new ideas and approaches by having a growth mindset. Critical Reflection - The ability to critically reflect on new knowledge and experiences in order to gain a deeper understanding, embed and extend learning. Adaptability - Flexibility when handling the unexpected, adapting to circumstances as they arise. Self-learning - The ability to self educate without the guidance of others. Resilience - Ability to respond positively and constructively to constantly evolving challenges and complexity.'],
            },
            {
                title: 'Initiative',
                data: ['Confidence has been acknowledged as a priority within Scotland for decades and it is no less important now. In this uncertain world we will need the courage and tenacity to take risks and try new things, enabling us to look into the future and see opportunities rather than fear change.  Initiative is a readiness to get started and act on opportunities built on a foundation of self belief. It encompasses two of the four capacities of the Curriculum for Excellence: confident individuals and effective contributors',
                        'The ability to take initiative incorporates: Courage - The ability to manage and overcome fear in order to take action. Independent Thinking - The ability to think for one’s self and trust one’s own judgement. Risk Taking - Doing something that involves danger or risk in order to achieve a goal. Decision Making - The act of making a considered choice after appropriately usingintuition and careful thought. Self Belief - A feeling of trust in one’s abilities, qualities and judgement. Self motivation - The ability to act without influence or encouragement from others. Responsibility - The ability to follow through on commitments, be proactive and take responsibility. Enterprising - Willingness to take risks, show initiative and undertake new ventures.'],
            },
        ]
    )

    const getItemLayout = sectionListGetItemLayout({
        // The height of the row with rowData at the given sectionIndex and rowIndex
        getItemHeight: (rowData, sectionIndex, rowIndex) => sectionIndex === 0 ? 100 : 50,

        // These four properties are optional
        // getSeparatorHeight: () => 1 / PixelRatio.get(), // The height of your separators
        // getSectionHeaderHeight: () => 20, // The height of your section headers
        // getSectionFooterHeight: () => 10, // The height of your section footers
        // listHeaderHeight: 40, // The height of your list header
    })

    useEffect(() => {
        // var object = {
        //     itemIndex: 0,
        //     sectionIndex: 4
        // }
        // sectionListRef.scrollToLocation(object)

        setTimeout(() => {
            if (sectionListRef) {
                sectionListRef.scrollToLocation({
                    animated: true,
                    itemIndex: 0,
                    sectionIndex: props.route.params.navProp,
                    viewPosition: 0
                });
            }
        }, 150);
    })


    test = () => {
        var object = {
            itemIndex: 0,
            sectionIndex: 4
        }
        sectionListRef.scrollToLocation(object)
        console.log(props.navProp)
    }


    return (
        <SafeAreaView style={styles.container}>
            <SectionList
                ref={ref => sectionListRef = ref}
                sections={data}
                getItemLayout={getItemLayout}
                keyExtractor={(item, index) => item + index}
                renderItem={({ item }) => <Text style={styles.bodyText}>{item}</Text>}
                renderSectionHeader={({ section: { title } }) => <Text style={textstyles[title]}>{title}</Text>}
            />
        </SafeAreaView>
    );
};

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
        fontSize: 16,
        textAlign: 'left',
        color: 'white',
    },
    container: {
        backgroundColor: '#4677D6',
        flex: 1,
    }
})