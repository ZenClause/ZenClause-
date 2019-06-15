import React, { Component } from "react";

import firebase from "firebase";

import { createStackNavigator, createAppContainer } from "react-navigation";
import { SignIn, Dashboard, Splash, SignUp } from "../screens";

var config = {
  apiKey: "AIzaSyDTO_VW8KigcpywWHw8q10DCQBRz0uBW54",
  authDomain: "zenclause.firebaseapp.com",
  databaseURL: "https://zenclause.firebaseio.com",
  projectId: "zenclause",
  storageBucket: "zenclause.appspot.com",
  messagingSenderId: "284077417988"
};

firebase.initializeApp(config);

const App = createStackNavigator({
  SignIn: { screen: SignIn },
  Dashboard: { screen: Dashboard },
  Splash: { screen: Splash },
  SignUp: { screen: SignUp }
});

// const App = createStackNavigator({
//   SignIn: { screen: SignIn },
//   Dashboard: { screen: Dashboard },
//   Splash: { screen: Splash },
//   SignUp: { screen: SignUp }
// });


export const MainNavigation = createAppContainer(App);

console.disableYellowBox = true;
