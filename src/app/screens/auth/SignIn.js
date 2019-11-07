import React, { Component } from "react";
import {
  Container,
  Header,
  Content,
  Body,
  Right,
  Title,
  Form,
  Item,
  Input,
  Button,
  Text
} from "native-base";
import firebase from "firebase";
import { AppLoading, ScreenOrientation, Font } from "expo";
import {
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  AsyncStorage
} from "react-native";

export default class SignIn extends Component {
  state = {
    loading: true,
    userEmail: "",
    userPassword: "",
    uid: "",
    user: ""
  };
  async componentWillMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
    });
    this.setState({ loading: false });

    ScreenOrientation.allowAsync(ScreenOrientation.Orientation.LANDSCAPE_RIGHT);

    const { navigate } = this.props.navigation;

    let uid = await AsyncStorage.getItem("auth");
    let user = await AsyncStorage.getItem("username");

    if (uid && user) {
      navigate("Dashboard", {
        userName: user,
        UID: uid
      });
    }
  }

  async componentDidMount() {
    ScreenOrientation.allowAsync(ScreenOrientation.Orientation.LANDSCAPE_LEFT);

    const { navigate } = this.props.navigation;

    let uid = await AsyncStorage.getItem("auth");
    let user = await AsyncStorage.getItem("username");

    if (uid && user) {
      navigate("Splash", {
        userName: user,
        UID: uid
      });
    }
  }

  static navigationOptions = {
    header: null
  };

  signinAction = () => {
    var myThis = this;
    const { userEmail, userPassword } = this.state;
    // var myNavigator = 	this.props.prop.navigator
    const { state, navigate } = this.props.navigation;
    // // //console.log(myNavigator)
    // //console.log('done')
    var emailVerified;
    var fb = firebase.auth();
    // const { navigate } = myThis.props.prop.navigation;
    fb.signInWithEmailAndPassword(userEmail, userPassword)
      .then(signedinUser => {
        firebase
          .database()
          .ref("users/" + signedinUser.user.uid + "/")
          .once("value")
          .then(snapshot => {
            var user = fb.currentUser;
            emailVerified = user.emailVerified;

            if (emailVerified === true) {
              var checkForUser = snapshot.val();
              var checking = checkForUser.userName;
              var UID = signedinUser.user.uid;
              AsyncStorage.setItem("auth", UID).then(() => {
                AsyncStorage.setItem("username", checking).then(() => {
                  navigate("Splash", {
                    userName: checking,
                    UID: UID
                  });
                });
              });
            } else {
              alert("email not verified ");
            }
          });
      })
      .catch(err => {
        alert(err.message);
      });
  };

  moveToSignUp = () => {
    // console.log(this.props)
    const { state, navigate } = this.props.navigation;
    navigate("SignUp");
    console.log("navigate");
    // console.log(navigate)
  };

  render() {
    if (this.state.loading) {
      return <AppLoading />;
    }
    return (
      <Container>
        <Header style={styles.mainColor}>
          <Body>
            <Title
              style={{
                color: "white",
                marginLeft: "13%"
              }}
            >
              ZenClause Sign In{" "}
            </Title>
          </Body>
          <Right />
        </Header>
        <Content style={styles.content}>
          <StatusBar hidden={true} />
          <Form style={styles.form}>
            <Item last style={styles.inputField}>
              <Input
                onChangeText={userEmail => this.setState({ userEmail })}
                value={this.state.userEmail}
                placeholder="Email "
              />
            </Item>
            <Item last style={styles.inputField}>
              <Input
                secureTextEntry={true}
                onChangeText={userPassword => this.setState({ userPassword })}
                value={this.state.userPassword}
                placeholder="Password "
              />
            </Item>

            <Button
              block
              style={styles.Login}
              onPress={() => this.signinAction()}
            >
              <Text style={{ marginBottom: 7 }}>Login</Text>
            </Button>
          </Form>
          <Text style={styles.textOfaccountChange}>Don't Have An Account</Text>
          <TouchableOpacity>
            <Text
              onPress={this.moveToSignUp}
              style={{
                color: "black",
                marginLeft: "3%",
                fontSize: 18,
                textDecorationLine: "underline",
                paddingBottom: 10
              }}
            >
              Sign up now
            </Text>
          </TouchableOpacity>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  textOfaccountChange: {
    marginTop: "3%",
    color: "black",
    opacity: 0.7,
    fontSize: 15,
    marginLeft: "3%"
  },
  content: {},
  form: {
    paddingTop: "10%"
  },
  btn: {
    marginTop: "2%  "
  },
  Login: {
    marginLeft: "3%",
    marginRight: "3%",
    marginTop: "3%",
    backgroundColor: "#0F91DC"
  },
  mainColor: {
    backgroundColor: "#0F91DC"
  },
  inputField: {
    marginLeft: "3%"
  }
});
