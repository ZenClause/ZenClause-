import React from "react";

import {
  StyleSheet,
  StatusBar,
  Image,
  AsyncStorage
} from "react-native";

import {
  Container,
  Text,
  Body,
  Card,
  CardItem
} from "native-base";
import { ScreenOrientation } from 'expo';

import splashImage from '../../../assets/splash/splash.jpg'

class Splash extends React.Component {
  static navigationOptions = {
    header: null
  };
  state = {
    uid: '',
    user: ''
  }
  async componentDidMount() {
    const {
      navigate
    } = this.props.navigation;

    ScreenOrientation.allowAsync(
      ScreenOrientation.Orientation
        .LANDSCAPE_RIGHT
    );


    let uid = await AsyncStorage.getItem("auth");
    let user = await AsyncStorage.getItem("username")

    await this.setState({
      uid, user
    })

    navigate("Dashboard", {
      userName: user,
      UID: uid
    });
  }

  async componentWillMount() {
    const {
      navigate
    } = this.props.navigation;
    let uid = await AsyncStorage.getItem("auth");
    let user = await AsyncStorage.getItem("username")

    await this.setState({
      uid, user
    })
    navigate("Dashboard", {
      userName: this.state.user,
      UID: this.state.uid
    });
  }

  render() {
    return (
      <Container style={styles.container}>
        <Card>
          <StatusBar hidden={true} />
          <CardItem>
            <Body>
              <Text
                style={{
                  marginLeft: "32%",
                  marginTop: "1%",
                  fontSize: 25,
                  fontWeight: "bold"
                }}
              >
                Welcome {this.state.user}
              </Text>
            </Body>
          </CardItem>
          <CardItem>
            <Image
              source={splashImage}
              style={{ height: 300, width: null, flex: 1 }}
            />
          </CardItem>
        </Card>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  welcome: {
    fontSize: 30,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  },

  centerContent: {
    justifyContent: "center",
    alignItems: "center"
  },
  bodyContent: {
    marginLeft: "4%"
  },
  buttonofSend: {
    width: "15%",
    color: "white"
  },
  email: {
    marginLeft: "30%"
  },
  titleText: {
    fontSize: 15,
    fontWeight: "bold"
  }
});

export default Splash;
