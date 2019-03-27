import React from 'react';
import { MainNavigation } from './src/app/navigations';
import { AppRegistry } from "react-native";
import { name as appName } from "./app.json";

export default class App extends React.Component {
  render() {
    return (
      <MainNavigation/>
    );
  }
}

AppRegistry.registerComponent(appName, () => App);