import React from "react";

import {
  AppRegistry,
  View,
  StyleSheet,
  StatusBar,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  AsyncStorage
} from "react-native";

import {
  Container,
  Header,
  Title,
  Content,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right,
  List,
  ListItem,
  Card,
  CardItem
} from "native-base";
import { ScreenOrientation } from 'expo';

import splashImage from '../../../assets/splash/splash.jpg'

var UserName;
var UID;

class Splash extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      userName: ""
    };
    const { state, navigate } = this.props.navigation;
    UserName = state.params.userName;
    UID = state.params.UID;

  }
  componentDidMount() {
    const {
      navigate
    } = this.props.navigation;

    // var a = this.props.navigation.navigate("Home")
    var a = this.props.navigation;
    ScreenOrientation.allowAsync(
      ScreenOrientation.Orientation
        .LANDSCAPE_RIGHT
    );

    setTimeout(function () {
      navigate("Dashboard", {
        userName: UserName,
        UID: UID
      });
    }, 1000);
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
                Welcome {UserName}
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
