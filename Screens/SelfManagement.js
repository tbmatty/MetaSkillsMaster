import React, {useState, useEffect} from 'react';
import { render } from 'react-dom';
import { SafeAreaView, Text, Button, StyleSheet, SectionList} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import sectionListGetItemLayout from 'react-native-section-list-get-item-layout';


export default function SelfManagement(props){
    
       

    const [textstyles, setTextStyles] = useState(
        {
            "Self Management" : styles.titleText,
            "Focussing" : styles.subHeadingText,
            "Integrity" : styles.subHeadingText,
            "Adapting" : styles.subHeadingText,
            "Initiative" : styles.subHeadingText
        }
    )

    const [data, setData] = useState(
        [
            {
                title: 'Self Management',
                data: ['Placeholder text about this meta skill']
            },
            {
                title: 'Focussing',
                data: ['Placeholder text for information about the meta skill of Focussing. Placeholder text for information about the meta skill of Focussing. Placeholder text for information about the meta skill of Focussing. Placeholder text for information about the meta skill of Focussing. Placeholder text for information about the meta skill of Focussing. Placeholder text for information about the meta skill of Focussing. Placeholder text for information about the meta skill of Focussing. Placeholder text for information about the meta skill of Focussing. Placeholder text for information about the meta skill of Focussing. Placeholder text for information about the meta skill of Focussing. Placeholder text for information about the meta skill of Focussing. Placeholder text for information about the meta skill of Focussing. Placeholder text for information about the meta skill of Focussing. Placeholder text for information about the meta skill of Focussing. Placeholder text for information about the meta skill of Focussing. Placeholder text for information about the meta skill of Focussing. Placeholder text for information about the meta skill of Focussing. Placeholder text for information about the meta skill of Focussing. '],
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

    useEffect(()=>{
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