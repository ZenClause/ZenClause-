import React, { Component } from "react";
import {
  Container,
  Left,
  Header,
  Content,
  Body,
  Right,
  Title,
  Form,
  Item,
  Input,
  Label,
  Button,
  Text,
  Icon
} from "native-base";
import firebase, { database } from "firebase";
import { AppLoading, ScreenOrientation } from "expo";
import * as Font from "expo-font";
import {
  View,
  ScrollView,
  StyleSheet,
  StatusBar,
  TouchableOpacity
} from "react-native";

export default class SignUp extends Component {
  state = {
    userName: "",
    userEmail: "",
    userPassword: "",
    cnfrmPass: "",
    loading: true
  };

  signupAction = () => {
    let uid;
    let myThis = this;

    this.setState({
      userName: "",

      userEmail: "",
      userPassword: "",
      cnfrmPass: ""
    });
    const { userName } = this.state;

    const { userEmail } = this.state;
    // const {CompanyName} = this.state;
    const { userPassword } = this.state;
    const { cnfrmPass } = this.state;

    var obj = {
      userName: userName,

      mail: userEmail
      // pass : userPassword ,
    };
    const { navigate } = this.props.navigation;
    var str1 = userPassword;
    var str2 = cnfrmPass;
    var myUId;
    // //
    var n = str1.localeCompare(str2);

    if (n === -1) {
      alert("Password not matched");
    } else {
      //  userEmail = 'waqaramjad345@gmail.com'
      //  userPassword = '000000'
      var fb = firebase.auth();
      fb.createUserWithEmailAndPassword(userEmail, userPassword)
        .then(createdUser => {
          alert("signed up successfully");
          myUId = createdUser.user.uid;

          fb.signInWithEmailAndPassword(userEmail, userPassword)
            .then(signedinUser => {
              var user = fb.currentUser;
              user.sendEmailVerification().then(function() {
                alert("Check your Email to uthorize your account");
                // var a = this.props.navigation.navigate("Home")
                // var a = this.props.navigation
                setTimeout(function() {
                  navigate("SignIn");
                }, 5000);
              });
            })
            .catch(function(error) {});
          firebase
            .database()
            .ref("users/" + myUId + "/")
            .set(obj)
            .then(() => {});
        })
        .catch(err => {
          alert(err.message);
        });
    }
  };

  async componentWillMount() {
    await Font.loadAsync({
      Roboto: require("../../../../assets/fonts/Roboto-Regular.ttf"),
      Roboto_medium: require("../../../../assets/fonts/Roboto-Medium.ttf")
    });
    this.setState({ loading: false });
  }

  componentDidMount() {
    ScreenOrientation.lockAsync(ScreenOrientation.Orientation.LANDSCAPE);
  }

  static navigationOptions = {
    header: null
  };

  moveToSignIn = () => {
    const { state, navigate } = this.props.navigation;
    navigate("SignIn");
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
              ZenClause Sign Up
            </Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <StatusBar hidden={true} />
          <Form style={{ paddingTop: "10%" }}>
            <Item>
              <Input
                onChangeText={userName => this.setState({ userName })}
                placeholder="User Name  "
              />
            </Item>
            <Item>
              <Input
                onChangeText={userEmail => this.setState({ userEmail })}
                placeholder="Email "
              />
            </Item>
            <Item last>
              <Input
                secureTextEntry={true}
                secureTextEntry={true}
                onChangeText={userPassword => this.setState({ userPassword })}
                placeholder="Password "
              />
            </Item>
            <Item last>
              <Input
                secureTextEntry={true}
                onChangeText={cnfrmPass => this.setState({ cnfrmPass })}
                placeholder="Confirm Password "
              />
            </Item>

            <Button
              block
              style={styles.Login}
              onPress={() => this.signupAction()}
            >
              <Text>Sign Up </Text>
            </Button>
          </Form>
          <Text style={styles.textOfaccountChange}>Already have account</Text>
          <TouchableOpacity onPress={this.moveToSignIn}>
            <Text
              style={{
                color: "black",
                marginLeft: "3%",
                fontSize: 17,
                textDecorationLine: "underline",
                paddingBottom: 10
              }}
            >
              Sign In now
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
    fontSize: 17,
    marginLeft: "3%"
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
  }
});
