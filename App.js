import * as React from 'react';
import { View, Text, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createAppContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from "./Screens/Home.js";
import Skills from "./Screens/Skills.js";
import SignUp from "./Screens/SignUp.js";
import Login from "./Screens/Login.js";
import Profile from "./Screens/Profile.js";
import Stats from "./Screens/Stats.js";
import * as firebase from "firebase";
import firestore from "@firebase/firestore";
import SplashScreen from './Screens/SplashScreen.js';
import test from './Screens/test.js';
import RecordReflection from './Screens/RecordReflection.js';
import SelfManagement from './Screens/SelfManagement.js';
import SocialAwareness from './Screens/SocialAwareness.js';
import Innovation from './Screens/Innovation.js';

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




if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}



// firebase.initializeApp(firebaseConfig);

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


// function SplashScreen({ navigation }) {

//   var signedOut;

//   firebase.auth().onAuthStateChanged((user) => {
//     console.log(user);
//     if (!user) {
//       // this.setState({ user });
//       signedOut = true;
//       navigation.navigate("Login");
//     } else {
//       // this.setState({ user: null });
//       signedOut = false;
//       navigation.navigate("Home");
//     }
//     console.log(signedOut);
//   });



//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text>Loading</Text>
//     </View>
//   );
// }

function LogoTitle() {
  return (
    <Image
      style={{ width: 50, height: 50, }}
      source={require('./pictures/logo.png')}
    />
  );
}


const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
      <Tab.Navigator>
        <Tab.Screen name="Reflect" component={Home} options={{ title: 'Reflect!', headerLeft: 'none' }} />
        <Tab.Screen name="Skills" component={Skills} options={{ title: "Skills" }} />
        <Tab.Screen name="Stats" component={Stats} options={{ title: 'Stats' }} />
        <Tab.Screen name="Profile" component={Profile} options={{ title: 'Profile' }} />
      </Tab.Navigator>
  );
}

const Stack_Two = createStackNavigator();








const Stack = createStackNavigator();


function App() {



  // if (1==1) {
  //   // We haven't finished checking for the token yet
  //   // return <SplashScreen />;
  //   return <SplashScreen />;
  // }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="Login" component={Login} options={{ title: 'Login', }} />
        <Stack.Screen name="SignUp" component={SignUp} options={{ title: 'Sign Up!', }} />
        <Stack.Screen name="Home" component={MyTabs} options={{title: 'MetaSkillsMaster' }} />
        <Stack.Screen name="test" component={test} options={{title: 'wawaweewa'}}/>
        <Stack.Screen name="RecordReflection" component={RecordReflection} options={{title: 'Record a reflection!'}}/>
        <Stack.Screen name="SelfManagement" component={SelfManagement} options={{title: 'Self Management'}}/>
        <Stack.Screen name="SocialAwareness" component={SocialAwareness} options={{title: 'Social Intelligence', headerStyle: {backgroundColor: '#FF5D60',}, headerTitleStyle: {color: 'white'}}}/>
        <Stack.Screen name="Innovation" component={Innovation} options={{title: 'Innovation' }}/>

        {/* <MyTabs /> */}
      </Stack.Navigator>

    </NavigationContainer>
  );
}


export default App;