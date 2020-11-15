import * as React from 'react';
import { View, Text, Button, Image, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AntDesign } from '@expo/vector-icons';
import { createAppContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import * as Notifications from 'expo-notifications';
import { useState, useRef, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
// import registerForPushNotificationsAsync from "./Screens/Home.js/registerForPushNotificationsAsync"
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
import Reflections from './Screens/Reflections.js';
import MonthSelector from './Screens/MonthSelector.js';
import Reflection from './Screens/Reflection.js';

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

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});



function LogoTitle() {
  return (
    <Image
      style={{ width: 50, height: 50, }}
      source={require('./pictures/logo.png')}
    />
  );
}


const Tab = createBottomTabNavigator();










const Stack = createStackNavigator();


function App() {


  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();


  useEffect(() => {
    console.log("hello")
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      console.log("fired")
      console.log(notification);
    });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log("fired")
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);


  async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    return token;
  }

  const [userDesiredTime, setUserDesiredTime] = useState(-1);
  const [userDesiredTimeMinutes, setUserDesiredTimeMinutes] = useState(-1);



  async function cancelAndSchedule(){
    await Notifications.cancelAllScheduledNotificationsAsync()
    Notifications.scheduleNotificationAsync({
      content: {
        title: 'Daily reminder for Reflection'
      },
      trigger: {
        hour: userDesiredTime, minute: userDesiredTimeMinutes, repeats: true
      }
    })
  }

  

  useEffect(() => {
    var user = firebase.auth().currentUser;
    if (!user) {
      return;
    }
    let getval = firebase.firestore().collection('Users').doc(user.uid).get().then(doc => {
      console.log(doc.data().notificationTime)
      setUserDesiredTime(doc.data().notificationTime)
      setUserDesiredTimeMinutes(doc.data().notificationTimeMinutes)
    })
    firebase.firestore().collection('Users').doc(user.uid).onSnapshot(function (doc) {
      setUserDesiredTime(doc.data().notificationTime)
      setUserDesiredTimeMinutes(doc.data().notificationTimeMinutes)
      cancelAndSchedule()
    });

    console.log(userDesiredTime)
    if (userDesiredTime === -1) {
      return
    }else{
      cancelAndSchedule()
      }
    
  });


  function MyTabs() {
    return (
      <Tab.Navigator>
        <Tab.Screen name="Reflect" component={Home} options={{ title: 'Reflect!' }} />
        <Tab.Screen name="Skills" component={Skills} options={{ title: "Skills" }} />
        <Tab.Screen name="MonthSelector" component={MonthSelector} options={{ title: 'Reflections' }} />
        <Tab.Screen name="Stats" component={Stats} options={{ title: 'Stats' }} />
      </Tab.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="Login" component={Login} options={{ title: 'Login', }} />
        <Stack.Screen name="SignUp" component={SignUp} options={{ title: 'Sign Up!', }} />
        <Stack.Screen
          name="Home"
          component={MyTabs}
          options={({ navigation }) => ({
            title: 'MetaSkillsMaster',
            headerRight: () => (
              <TouchableOpacity onPress={() =>  navigation.navigate("Profile") }>
                    <AntDesign name="user" size={32} color="black" paddingRight="50" />
                </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen name="Profile" component={Profile} options={{ title: 'Profile' }} />
        <Stack.Screen name="RecordReflection" component={RecordReflection} options={{ title: 'Record a reflection!' }} />
        <Stack.Screen name="SelfManagement" component={SelfManagement} options={{ title: 'Self Management' }} />
        <Stack.Screen name="SocialAwareness" component={SocialAwareness} options={{ title: 'Social Intelligence', headerStyle: { backgroundColor: '#FF5D60', }, headerTitleStyle: { color: 'white' } }} />
        <Stack.Screen name="Innovation" component={Innovation} options={{ title: 'Innovation' }} />
        <Stack.Screen name="Reflections" component={Reflections} options={{ title: 'Reflections' }} />
        <Stack.Screen name="Reflection" component={Reflection} options={{ title: 'Reflection' }} />
        {/* <MyTabs /> */}
      </Stack.Navigator>

    </NavigationContainer>
  );
}


export default App;