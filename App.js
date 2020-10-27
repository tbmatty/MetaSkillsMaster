import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createAppContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from "./Screens/Home.js";
import Skills from "./Screens/Skills.js";
import SignUp from "./Screens/SignUp.js";
import Login from "./Screens/Login.js";
import Profile from "./Screens/Profile.js";
import * as firebase from "firebase";
import firestore from "@firebase/firestore";

this.state = {
    isLoading:true,

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

{/* <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#99ccff',
          },
          headerTintColor: '#0073e6',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen name="Home" component={Home} options={{ title: 'Reflect!' }} />
        <Stack.Screen name="Skills" component={Skills} options={({ route }) => ({ title: route.params.parameterPass })} />
        <Stack.Screen name="SignUp" component={SignUp} options={{ title: 'Sign Up! Do it now!' }} />
        <Stack.Screen name="Login" component={Login} options={{ title: 'Welcome back!' }} />

      </Stack.Navigator> */}


const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} options={{ title: 'Reflect!' }} />
      <Tab.Screen name="Skills" component={Skills} options={{ title: "Skills" }} />
      <Tab.Screen name="SignUp" component={SignUp} options={{ title: 'Sign Up!' }} />
      <Tab.Screen name="Profile" component={Profile} options={{ title: 'Profile' }} />

    </Tab.Navigator>
  );
}


const Stack = createStackNavigator();


function App() {

  var signedOut;

  firebase.auth().onAuthStateChanged((user) => {
    console.log(user);
    if (!user) {
      // this.setState({ user });
      signedOut = true;

    } else {
      // this.setState({ user: null });
      signedOut = false;

    }
    console.log(signedOut);
  });

  if (state.isLoading) {
    // We haven't finished checking for the token yet
   // return <SplashScreen />;
      console.log("HAHAHAHAHAHAHAHAHA");
  }
  
  return (
    <NavigationContainer>
      {signedOut ? (
        // No token found, user isn't signed in
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} options={{ title: 'Login', }} />
          <Stack.Screen name="SignUp" component={SignUp} options={{ title: 'Sign Up!', }} />
          <Stack.Screen name="Home" component={MyTabs} />
        </Stack.Navigator>

      ) : (
          // User is signed in
          <MyTabs />
        )}
    </NavigationContainer>
  );
}


export default App;