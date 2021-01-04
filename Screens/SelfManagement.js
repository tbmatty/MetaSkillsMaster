import React, {Component} from 'react';
import { render } from 'react-dom';
import { SafeAreaView, Text, Button, StyleSheet, SectionList} from 'react-native';
import { AntDesign } from '@expo/vector-icons';


export default class SelfManagement extends Component {
    constructor(props) {
        super(props); 
        this.state = {
            data: [
                {
                    title: 'Self Management',
                    data: ['Placeholder text about this meta skill']
                },
                {
                    title: 'Focussing',
                    data: ['Placeholder text for information about the meta skill of Focussing. Placeholder text for information about the meta skill of Focussing. Placeholder text for information about the meta skill of Focussing. Placeholder text for information about the meta skill of Focussing. Placeholder text for information about the meta skill of Focussing. Placeholder text for information about the meta skill of Focussing. '],
                },
                {
                    title: 'Integrity',
                    data: ['Placeholder text for information about the meta skill of Integrity. Placeholder text for information about the meta skill of Integrity. Placeholder text for information about the meta skill of Integrity. Placeholder text for information about the meta skill of Integrity. Placeholder text for information about the meta skill of Integrity. Placeholder text for information about the meta skill of Integrity. Placeholder text for information about the meta skill of Integrity. ', 'Additional info can go below wow!'],
                },
                {
                    title: 'Adapting',
                    data: ['Placeholder text for information about the meta skill of Adapting. Placeholder text for information about the meta skill of Adapting. Placeholder text for information about the meta skill of Adapting. Placeholder text for information about the meta skill of Adapting. Placeholder text for information about the meta skill of Adapting. Placeholder text for information about the meta skill of Adapting. '],
                },
                {
                    title: 'Initiative',
                    data: ['Placeholder text for information about the meta skill of Initiative. Placeholder text for information about the meta skill of Initiative. Placeholder text for information about the meta skill of Initiative. Placeholder text for information about the meta skill of Initiative. Placeholder text for information about the meta skill of Initiative. Placeholder text for information about the meta skill of Initiative. Placeholder text for information about the meta skill of Initiative. '],
                },
            ],
            textstyles:{
                "Self Management" : styles.titleText,
                "Focussing" : styles.subHeadingText,
                "Integrity" : styles.subHeadingText,
                "Adapting" : styles.subHeadingText,
                "Initiative" : styles.subHeadingText
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
        backgroundColor: '#4677D6',
        flex: 1,
    }
})