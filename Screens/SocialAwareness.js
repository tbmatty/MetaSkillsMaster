import React, { Component, useEffect } from 'react';
import { render } from 'react-dom';
import { ScrollView, Text, Button, StyleSheet, SectionList, SafeAreaView, FlatList } from 'react-native';


export default class SocialAwareness extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    title: 'Social Intelligence',
                    data: ['Placeholder text about this meta skill']
                },
                {
                    title: 'Communicating',
                    data: ['Placeholder text for information about the meta skill of communicating. Placeholder text for information about the meta skill of communicating. Placeholder text for information about the meta skill of communicating. Placeholder text for information about the meta skill of communicating. Placeholder text for information about the meta skill of communicating. Placeholder text for information about the meta skill of communicating. '],
                },
                {
                    title: 'Feeling',
                    data: ['Placeholder text for information about the meta skill of feeling. Placeholder text for information about the meta skill of feeling. Placeholder text for information about the meta skill of feeling. Placeholder text for information about the meta skill of feeling. Placeholder text for information about the meta skill of feeling. Placeholder text for information about the meta skill of feeling. Placeholder text for information about the meta skill of feeling. ', 'Additional info can go below wow!'],
                },
                {
                    title: 'Collaboration',
                    data: ['Placeholder text for information about the meta skill of collaboration. Placeholder text for information about the meta skill of collaboration. Placeholder text for information about the meta skill of collaboration. Placeholder text for information about the meta skill of collaboration. Placeholder text for information about the meta skill of collaboration. Placeholder text for information about the meta skill of collaboration. '],
                },
                {
                    title: 'Leading',
                    data: ['Placeholder text for information about the meta skill of leading. Placeholder text for information about the meta skill of leading. Placeholder text for information about the meta skill of leading. Placeholder text for information about the meta skill of leading. Placeholder text for information about the meta skill of leading. Placeholder text for information about the meta skill of leading. Placeholder text for information about the meta skill of leading. '],
                },
            ],
            textstyles:{
                "Social Intelligence" : styles.titleText,
                "Communicating" : styles.subHeadingText,
                "Feeling" : styles.subHeadingText,
                "Collaboration" : styles.subHeadingText,
                "Leading" : styles.subHeadingText
            }
        }
    }

    componentDidMount = () =>{
        var object = {
            itemIndex: 0,
            sectionIndex: this.props.navProp
        }
        this.sectionListRef.scrollToLocation(object)
    }





    test = () => {
        var object = {
            itemIndex: 0,
            sectionIndex: 4
        }
        this.sectionListRef.scrollToLocation(object)
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <SectionList
                    ref={ref => this.sectionListRef = ref}
                    sections={this.state.data}
                    keyExtractor={(item, index) => item + index}
                    renderItem={({ item }) => <Text style={styles.bodyText}>{item}</Text>}
                    renderSectionHeader={({ section: { title } }) => <Text style={this.state.textstyles[title]}>{title}</Text>}
                />
                <Button title="Press me" onPress={() => this.test()}></Button>
            </SafeAreaView>
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
        fontSize: 16,
        textAlign: 'left',
        color: 'white',
    },
    container: {
        backgroundColor: '#FF5D60',
        flex: 1,
    }
})