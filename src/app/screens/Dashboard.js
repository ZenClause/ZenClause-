import * as React from "react";

import {
  AppRegistry,
  Dimensions,
  View,
  StyleSheet,
  ImageBackground,
  StatusBar,
  Image,
  TouchableHighlight,
  TouchableOpacity,
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
  Radio,
  Item,
  Input,
  Card,
  CardItem,
  Label
} from "native-base";
import Modal from "react-native-modal";
import email from "react-native-email";
import validator from 'validator';
// import RadioForm, {
//   RadioButton,
//   RadioButtonInput,
//   RadioButtonLabel
// } from "react-native-simple-radio-button";
import firebase from "firebase";
import { ScreenOrientation, ImagePicker } from "expo";
import BckImage from "../../../assets/images/bg.png";
import SettingImage from "../../../assets/images/setting-icon.png";
import NumberOne from "../../../assets/images/number-one.png";
import NumberTwo from "../../../assets/images/number-two.png";
import NumberThree from "../../../assets/images/number-three.png";
import NumberFour from "../../../assets/images/number-four.png";
import NumberFive from "../../../assets/images/number-five.png";
import House from '../../../assets/images/house.png'
import Profile from '../../../assets/images/profile.png'

import House1 from '../../../assets/images/house_1.png';
import House2 from "../../../assets/images/house_2.png";
import House3 from "../../../assets/images/house_3.png";
import House4 from "../../../assets/images/house_4.png";
import House5 from "../../../assets/images/house_5.png";
import House6 from "../../../assets/images/house_6.png";
import House7 from "../../../assets/images/house_7.png";
import House8 from "../../../assets/images/house_8.png";
import House9 from "../../../assets/images/house_9.png";
import House10 from "../../../assets/images/house_10.png";
import House11 from "../../../assets/images/house_11.png";
import House12 from "../../../assets/images/house_12.png";
import House13 from "../../../assets/images/house_13.png";
import House14 from "../../../assets/images/house_14.png";
import House15 from "../../../assets/images/house_15.png";
import House16 from "../../../assets/images/house_16.png";
import House17 from "../../../assets/images/house_17.png";
import House18 from "../../../assets/images/house_18.png";
import House19 from "../../../assets/images/house_19.png";
import House20 from '../../../assets/images/house_20.png';

const Houses = [
  House1,
  House2,
  House3,
  House4,
  House5,
  House6,
  House7,
  House8,
  House9,
  House10,
  House11,
  House12,
  House13,
  House14,
  House15,
  House16,
  House17,
  House18,
  House19,
  House20
]



var UserName;
var UID = "";

var width = Dimensions.get("window").width;
var height = Dimensions.get("window").height;

var distance = (width / 0.63) - 13;

class Dashboard extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    const { state, navigate } = this.props.navigation;
    // console.log(state.params);
    // UserName = state.params.userName || "";
    // UID = state.params.UID || "";
  }

  state = {
    userName: "",
    visibleModal: false,
    visbleModalForEmail: false,
    visbleModalForPassword: false,
    visbleModalForHeaderText: false,
    visbleModalForImage: false,
    visibleInviteResident: false,
    newEmail: "",
    currentPasswordForEmail: "",
    currentPasswordForPassword: "",
    newPassword: "",
    headerText: "",
    image: null,
    btnValue: "Vibrate",
    residentEmail: "",
    users: false
  };

  componentDidMount() {
    const { navigate } = this.props.navigation;

    var a = this.props.navigation;

    ScreenOrientation.allowAsync(ScreenOrientation.Orientation.LANDSCAPE_RIGHT);
  }

  componentWillMount() {
    this.getUsers();
  }

  getUsers = () => {
    var users = firebase.database().ref('/users/').once('value').then((res) => {
      this.setState({
        users: Object.values(res.val())
      });
    }).catch(console.error)

  }

  changeBtn() {
    var data = this.state.btnValue;

    if (data == "Vibrate") {
      this.setState({
        btnValue: "Key Click On"
      });
    } else if (data == "Key Click On") {
      this.setState({
        btnValue: "Key Click Off"
      });
    } else if (data == "Key Click Off") {
      this.setState({
        btnValue: "Vibrate"
      });
    }
  }

  reauthenticate = currentPassword => {
    var user = firebase.auth().currentUser;
    var cred = firebase.auth.EmailAuthProvider.credential(
      user.email,
      currentPassword
    );
    return user.reauthenticateWithCredential(cred);
  };

  changePassword = () => {
    var currentPassword = this.state.currentPasswordForPassword;
    var newPassword = this.state.newPassword;
    var myThis = this;
    this.reauthenticate(currentPassword)
      .then(() => {
        var user = firebase.auth().currentUser;
        user
          .updatePassword(newPassword)
          .then(() => {
            console.log("Password updated!");
            alert("Password Updated ");
            // navigate("SignIn" )
            myThis.setState({
              visbleModalForPassword: false
            });
            const { navigate } = myThis.props.navigation;
            setTimeout(function() {
              navigate("SignIn");
            }, 3000);
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        console.log(error);
      });
  };

  changeText = () => {
    var changeText = this.state.headerText;
    //c alert(changeText)
    console.log(UID);
    console.log(UID);
    // console.log(firebase )
    var a = { userName: changeText };
    this.setState({
      visbleModalForHeaderText: false
    });
    firebase
      .database()
      .ref("users/" + UID)
      .update(a);
    alert("Header Text Updated ");
  };

  _pickImage = async () => {
    console.log("image");
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3]
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
      var a = this.uploadImage()
        .then(() => {
          alert("Success! Your Profile Image is Updated");
          console.log(a);
        })
        .catch(error => {
          alert(error);
        });
    }
  };

  uploadImage = async () => {
    var uri = this.state.image;
    console.log(uri);
    var imageName = "profile";
    const response = await fetch(uri);
    const blob = await response.blob();
    var projectNameText = this.state.projectNameText;
    var ref = firebase
      .storage()
      .ref()
      .child(UID + "/" + imageName);
    return ref.put(blob);
  };

  changeEmail = () => {
    var currentPassword = this.state.currentPasswordForEmail;
    var newEmail = this.state.newEmail;
    var myThis = this;

    this.reauthenticate(currentPassword)
      .then(() => {
        var user = firebase.auth().currentUser;
        user
          .updateEmail(newEmail)
          .then(() => {
            console.log("Email updated!");
            alert("Email Updated ");
            // navigate("SignIn" )
            myThis.setState({
              visbleModalForEmail: false
            });
            const { navigate } = myThis.props.navigation;
            setTimeout(function() {
              navigate("SignIn");
            }, 3000);
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        console.log(error);
      });
  };

  sendInvitation = () => {
    const to = this.state.residentEmail; // string or array of email addresses
    if (validator.isEmail(to)) {
      email(to, {
        // Optional additional arguments
        subject: "Invitation from - ZenClause",
        body: "Hello, try this app"
      }).catch(console.error);
    } else {
      alert("Email is misformatted");
    }
  };

  renderModalContent = () => (
    <Container style={{ backgroundColor: "transparent" }}>
      <View style={styles.contView}>
        <View style={{ flexDirection: "row", flex: 1 }}>
          <View style={{ flex: 1 }}>
            <Card
              style={{
                backgroundColor: "#1fbbd4",
                justifyContent: "center",
                alignItems: "center",
                flex: 1
              }}
            >
              <CardItem
                button
                onPress={() => {
                  this.setState({
                    visbleModalForEmail: true,
                    visibleModal: false
                  });
                }}
                style={{ backgroundColor: "#1fbbd4" }}
              >
                <Text style={{ backgroundColor: "#1fbbd4" }}>Change Email</Text>
              </CardItem>
            </Card>
          </View>
          <View style={{ flex: 1 }}>
            <Card
              style={{
                backgroundColor: "#66bcff",
                justifyContent: "center",
                alignItems: "center",
                flex: 1
              }}
            >
              <CardItem
                button
                onPress={() => {
                  this.setState({
                    visbleModalForHeaderText: true,
                    visibleModal: false
                  });
                }}
                style={{ backgroundColor: "#66bcff" }}
              >
                <Text style={{ backgroundColor: "#66bcff" }}>
                  Change Banner Text
                </Text>
              </CardItem>
            </Card>
          </View>
        </View>
        <View style={{ flexDirection: "row", flex: 1 }}>
          <View style={{ flex: 1 }}>
            <Card
              style={{
                backgroundColor: "#a1b223",
                justifyContent: "center",
                alignItems: "center",
                flex: 1
              }}
            >
              <CardItem
                button
                onPress={() => {
                  this._pickImage();
                }}
                style={{ backgroundColor: "#a1b223" }}
              >
                <Text style={{ backgroundColor: "#a1b223" }}>Change Image</Text>
              </CardItem>
            </Card>
          </View>
          <View style={{ flex: 1 }}>
            <Card
              style={{
                backgroundColor: "#f9622d",
                justifyContent: "center",
                alignItems: "center",
                flex: 1
              }}
            >
              <CardItem
                button
                onPress={() => {
                  this.setState({
                    visbleModalForPassword: true,
                    visibleModal: false
                  });
                }}
                style={{ backgroundColor: "#f9622d" }}
              >
                <Text style={{ backgroundColor: "#f9622d" }}>
                  Change Password
                </Text>
              </CardItem>
            </Card>
          </View>
        </View>
        <View style={{ flexDirection: "row", flex: 1 }}>
          <View style={{ flex: 1 }}>
            <Card
              style={{
                backgroundColor: "#fcbc2f",
                justifyContent: "center",
                alignItems: "center",
                flex: 1
              }}
            >
              <CardItem
                button
                onPress={() => {
                  this.changeBtn();
                }}
                style={{ backgroundColor: "#fcbc2f" }}
              >
                <Text style={{ backgroundColor: "#fcbc2f" }}>
                  {this.state.btnValue}
                </Text>
              </CardItem>
            </Card>
          </View>

          <View style={{ flex: 1 }}>
            <Card
              style={{
                backgroundColor: "#c32222",
                justifyContent: "center",
                alignItems: "center",
                flex: 1
              }}
            >
              <CardItem
                button
                onPress={() => {
                  this.setState({ visibleModal: null });
                }}
                style={{ backgroundColor: "#c32222" }}
              >
                <Text style={{ backgroundColor: "#c32222" }}>Cancel</Text>
              </CardItem>
            </Card>
          </View>
        </View>
      </View>
    </Container>
  );

  renderModalContentForEmail = () => (
    <View style={styles.modalContent}>
      <Item>
        {/* <Icon active name='lock' /> */}

        <Input
          onChangeText={newEmail => this.setState({ newEmail })}
          placeholder="Please Enter New Email "
        />
      </Item>
      <Item>
        {/* <Icon active name='lock' /> */}

        <Input
          onChangeText={currentPasswordForEmail =>
            this.setState({ currentPasswordForEmail })
          }
          placeholder="Please Enter Your Password "
        />
      </Item>
      <TouchableOpacity
        onPress={() =>
          this.changeEmail(
            this.state.currentPasswordForEmail,
            this.state.currentPasswordForEmail
          )
        }
      >
        <View style={styles.button}>
          <Text>Change Email </Text>
        </View>
      </TouchableOpacity>
      {/* {this.renderButton("Close", () => this.setState({ visibleModal: null }))} */}
    </View>
  );

  renderModalContentForPassword = () => (
    <View style={styles.modalContent}>
      <Item>
        {/* <Icon active name='lock' /> */}

        <Input
          onChangeText={currentPasswordForPassword =>
            this.setState({ currentPasswordForPassword })
          }
          placeholder="Current Password "
        />
      </Item>
      <Item>
        {/* <Icon active name='lock' /> */}

        <Input
          onChangeText={newPassword => this.setState({ newPassword })}
          placeholder="New Password "
        />
      </Item>
      <TouchableOpacity onPress={() => this.changePassword()}>
        <View style={styles.button}>
          <Text>Change Password </Text>
        </View>
      </TouchableOpacity>

      {/* {this.renderButton("Close", () => this.setState({ visibleModal: null }))} */}
    </View>
  );
  renderModalContentForHeaderText = () => (
    <View style={styles.modalContent}>
      <Item>
        <Input
          onChangeText={headerText => this.setState({ headerText })}
          placeholder="Enter New Banner Text"
        />
      </Item>

      {/* <TouchableOpacity onPress={()=>this.changeEmail(this.state.currentPasswordForEmail , this.state.currentPasswordForEmail)}> */}
      <TouchableOpacity onPress={() => this.changeText()}>
        <View style={styles.button}>
          <Text>Change Banner Text </Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  renderModalContentForInviteResident = () => (
    <View style={styles.modalContent}>
      <Label>House No: #{this.state.house_no}</Label>
      <Item>
        <Input
          onChangeText={residentEmail => this.setState({ residentEmail })}
          placeholder="Enter Resident Email"
        />
      </Item>

      {/* <TouchableOpacity onPress={()=>this.changeEmail(this.state.currentPasswordForEmail , this.state.currentPasswordForEmail)}> */}
      <TouchableOpacity onPress={() => this.sendInvitation()}>
        <View style={styles.button}>
          <Text>Send Invitation </Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  callFun = () => {
    this.setState({ visibleModal: true });
  };

  renderHouses = () =>
    Houses.map((house, i) => {
      let h_no = i + 1;
      return (
        <View key={i} style={styles.houseContainer}>
          <TouchableOpacity
            activeOpacity={0.5}
            style={[
              styles.houseTouchable,
              styles[`house_${i + 1}`] && styles[`house_${i + 1}`]
            ]}
            onPress={() =>
              this.setState({
                visibleInviteResident: true,
                house_no: h_no
              })
            }
          >
            <Image source={house} style={styles.house} />
            {this.state.users[h_no-1] && this.state.users[h_no-1].mail && (
              <Image source={Profile} style={styles.profile} />
            )}
          </TouchableOpacity>
        </View>
      );
    });

  render() {
    console.log(this.state.users[0]);
    return (
      <Container style={{ flex: 1 }}>
        <StatusBar hidden={true} />
        {/* </View> */}
        <ImageBackground source={BckImage} style={styles.bckImage} />
        {/* Setting */}
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={this.callFun}
          style={styles.settingImgTouch}
        >
          <Image source={SettingImage} style={styles.settingImg} />
        </TouchableOpacity>
        {/* Number 1 */}
        <TouchableOpacity
          activeOpacity={0.5}
          // onPress={this.callFun}
          style={styles.settingImgTouch}
        >
          <Image source={NumberOne} style={styles.numberOneImg} />
        </TouchableOpacity>
        {/* Number 2 */}
        <TouchableOpacity
          activeOpacity={0.5}
          // onPress={this.callFun}
          style={styles.settingImgTouch}
        >
          <Image source={NumberTwo} style={styles.numberTwoImg} />
        </TouchableOpacity>
        {/* Number 3 */}
        <TouchableOpacity
          activeOpacity={0.5}
          // onPress={this.callFun}
          style={styles.settingImgTouch}
        >
          <Image source={NumberThree} style={styles.numberThreeImg} />
        </TouchableOpacity>
        {/* Number 4 */}
        <TouchableOpacity
          activeOpacity={0.5}
          // onPress={this.callFun}
          style={styles.settingImgTouch}
        >
          <Image source={NumberFour} style={styles.numberFourImg} />
        </TouchableOpacity>
        {/* Number 5 */}
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={this.callFun}
          style={styles.settingImgTouch}
        >
          <Image source={NumberFive} style={styles.numberFiveImg} />
        </TouchableOpacity>

        {this.renderHouses()}

        <Modal
          isVisible={this.state.visibleModal === true}
          onBackdropPress={() => this.setState({ visibleModal: null })}
        >
          {this.renderModalContent()}
        </Modal>
        {/* /*************************************Modal pass  */}
        <Modal
          isVisible={this.state.visbleModalForEmail === true}
          onBackdropPress={() =>
            this.setState({ visbleModalForEmail: null })
          }
        >
          {this.renderModalContentForEmail()}
        </Modal>
        {/* /*************************************Modal header text  */}
        <Modal
          isVisible={this.state.visbleModalForPassword === true}
          onBackdropPress={() =>
            this.setState({ visbleModalForPassword: null })
          }
        >
          {this.renderModalContentForPassword()}
        </Modal>
        {/* /*************************************Modal header text  */}
        <Modal
          isVisible={this.state.visbleModalForHeaderText === true}
          onBackdropPress={() =>
            this.setState({ visbleModalForHeaderText: null })
          }
        >
          {this.renderModalContentForHeaderText()}
        </Modal>
        {/* /*************************************Modal header text  */}

        <Modal
          isVisible={this.state.visbleModalForImage === true}
          onBackdropPress={() =>
            this.setState({ visbleModalForHeaderText: null })
          }
        >
          {this.renderModalContentForHeaderText()}
        </Modal>
        <Modal
          isVisible={this.state.visibleInviteResident === true}
          onBackdropPress={() =>
            this.setState({ visibleInviteResident: null })
          }
        >
          {this.renderModalContentForInviteResident()}
        </Modal>
      </Container>
    );
  }
}


const percentageX = (value) => {
  return height * (value/100); // 340 px my device
}

const percentageY = (value) => {
  return width * (value / 100); // 640 my device
}


const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   justifyContent: 'center',

  // },
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
  },

  imageContainer: {
    flex: 1,
    alignItems: "stretch"
  },

  image: {
    flex: 1
    // width : '80%',
    // height : null
  },
  bgImageWrapper: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  bgImage: {
    flex: 1,
    resizeMode: "stretch"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    backgroundColor: "lightblue",
    padding: 12,
    margin: 16,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)"
  },
  buttonForVib: {
    backgroundColor: "lightblue",
    padding: 12,
    marginRight: 16,
    // marginLeft: '10'
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)"
  },
  modalContent: {
    backgroundColor: "white",
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)"
  },
  bottomModal: {
    justifyContent: "flex-end",
    margin: 0
  },
  scrollableModal: {
    height: 300
  },
  scrollableModalContent1: {
    height: 200,
    backgroundColor: "orange",
    alignItems: "center",
    justifyContent: "center"
  },
  scrollableModalContent2: {
    height: 200,
    backgroundColor: "lightgreen",
    alignItems: "center",
    justifyContent: "center"
  },
  rowConrainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  closeButton: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end"
  },
  bckImage: {
    // flex : 2 ,
    height: "100%",
    // marginLeft: 3 ,
    width: "100%"
    // marginRight : 3
    // padding : '2%'
  },
  settingImg: {
    width: 50,
    height: 50,
    resizeMode: "contain",
    marginLeft: distance
  },
  settingImgTouch: {
    zIndex: 200,
    position: "absolute"
  },
  numberOneImg: {
    width: 50,
    height: 50,
    resizeMode: "contain",
    marginLeft: distance - 180
  },
  numberTwoImg: {
    width: 50,
    height: 50,
    resizeMode: "contain",
    marginLeft: distance - 140
  },
  numberThreeImg: {
    width: 50,
    height: 50,
    resizeMode: "contain",
    marginLeft: distance - 100
  },
  numberFourImg: {
    width: 50,
    height: 50,
    resizeMode: "contain",
    marginLeft: distance - 60
  },
  numberFiveImg: {
    width: 50,
    height: 50,
    resizeMode: "contain",
    marginLeft: distance - 20
  },
  settingImg: {
    width: 50,
    height: 50,
    resizeMode: "contain",
    marginLeft: distance + 20
  },
  contView: {
    flex: 1,
    flexDirection: "column"
  },
  house: {
    width: percentageX(22),
    height: percentageX(22),
  },
  house_1: {
    bottom: percentageX(0),
    left: percentageY(2)
  },
  house_2: {
    bottom: percentageX(12),
    left: percentageY(15)
  },
  house_3: {
    bottom: percentageX(11),
    left: percentageY(28)
  },
  house_4: {
    bottom: percentageX(12.5),
    left: percentageY(53)
  },
  house_5: {
    bottom: percentageX(0),
    left: percentageY(65)
  },
  house_6: {
    bottom: percentageX(2),
    left: percentageY(88)
  },
  house_7: {
    bottom: percentageX(24),
    left: percentageY(1)
  },
  house_8: {
    bottom: percentageX(41),
    left: percentageY(10)
  },
  house_9: {
    bottom: percentageX(30),
    left: percentageY(30)
  },
  house_10: {
    bottom: percentageX(23),
    left: percentageY(42)
  },
  house_11: {
    bottom: percentageX(26),
    left: percentageY(61)
  },
  house_12: {
    bottom: percentageX(36),
    left: percentageY(74)
  },
  house_13: {
    bottom: percentageX(19),
    left: percentageY(82)
  },
  house_14: {
    bottom: percentageX(52),
    left: percentageY(0)
  },
  house_15: {
    bottom: percentageX(62),
    left: percentageY(14)
  },
  house_16: {
    bottom: percentageX(49),
    left: percentageY(24)
  },
  house_17: {
    bottom: percentageX(61),
    left: percentageY(49)
  },
  house_18: {
    bottom: percentageX(53),
    left: percentageY(60)
  },
  house_19: {
    bottom: percentageX(68),
    left: percentageY(76)
  },
  house_20: {
    bottom: percentageX(59),
    left: percentageY(87)
  },
  houseTouchable: {
    position: "absolute",
    zIndex: 9999
  },
  profile: { 
    width: 25, 
    height: 25,
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 9999999
  }
});

export default Dashboard;


