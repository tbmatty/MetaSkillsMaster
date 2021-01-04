import React, { Component } from 'react';
import { render } from 'react-dom';
import { SafeAreaView, Text, StyleSheet, SectionList, Button } from 'react-native';


export default class Innovation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    title: 'Innovation',
                    data: ['Placeholder text about this meta skill']
                },
                {
                    title: 'Curiosity',
                    data: ['Placeholder text for information about the meta skill of Curiosity. Placeholder text for information about the meta skill of Curiosity. Placeholder text for information about the meta skill of Curiosity. Placeholder text for information about the meta skill of Curiosity. Placeholder text for information about the meta skill of Curiosity. Placeholder text for information about the meta skill of Curiosity. '],
                },
                {
                    title: 'Creativity',
                    data: ['Placeholder text for information about the meta skill of Creativity. Placeholder text for information about the meta skill of Creativity. Placeholder text for information about the meta skill of Creativity. Placeholder text for information about the meta skill of Creativity. Placeholder text for information about the meta skill of Creativity. Placeholder text for information about the meta skill of Creativity. Placeholder text for information about the meta skill of Creativity. ', 'Additional info can go below wow!'],
                },
                {
                    title: 'Sense Making',
                    data: ['Placeholder text for information about the meta skill of Sense Making. Placeholder text for information about the meta skill of Sense Making. Placeholder text for information about the meta skill of Sense Making. Placeholder text for information about the meta skill of Sense Making. Placeholder text for information about the meta skill of Sense Making. Placeholder text for information about the meta skill of Sense Making. '],
                },
                {
                    title: 'Critical Thinking',
                    data: ['Placeholder text for information about the meta skill of critical thinking. Placeholder text for information about the meta skill of critical thinking. Placeholder text for information about the meta skill of critical thinking. Placeholder text for information about the meta skill of critical thinking. Placeholder text for information about the meta skill of critical thinking. Placeholder text for information about the meta skill of critical thinking. Placeholder text for information about the meta skill of critical thinking. '],
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


    componentDidMount = () =>{
        setTimeout(() => {
            if (this.sectionListRef) {
              this.sectionListRef.scrollToLocation({
                  animated: true,
                  itemIndex: 0,
                  sectionIndex: this.props.route.params.navProp,
                  viewPosition: 0
              });
            }
          }, 150);
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
        fontSize: 16,
        textAlign: 'left',
        color: 'black',
    },
    container: {
        backgroundColor: '#FFC530',
        flex: 1,
    }
})