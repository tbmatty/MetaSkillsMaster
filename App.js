import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {createAppContainer} from "@react-navigation/native"
import Home from "./Screens/Home.js";
import Skills from "./Screens/Skills.js";
import * as firebase from "firebase";
import firestore from "@firebase/firestore";

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{title: 'Reflect!'}} />
        <Stack.Screen name="Skills" component={Skills} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const firebaseConfig = {
  apiKey: "AIzaSyDwn_LuSa2_c2yfNFLrF4bSUo8nKWPqlXQ",
  authDomain: "metaskillsmaster.firebaseapp.com",
  databaseURL: "https://metaskillsmaster.firebaseio.com",
  projectId: "metaskillsmaster",
  storageBucket: "metaskillsmaster.appspot.com",
  messagingSenderId: "531532684806",
  appId: "1:531532684806:web:6f371781701e6f2def6d87",
  measurementId: "G-FRK5GMW27D"
};

firebase.initializeApp(firebaseConfig);
export default App;