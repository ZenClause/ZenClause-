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
  AsyncStorage,
  AppState
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
  Label,
  Picker
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

import cNumberOne from "../../../assets/images/number-one_c.png";
import cNumberTwo from "../../../assets/images/number-two_c.png";
import cNumberThree from "../../../assets/images/number-three_c.png";
import cNumberFour from "../../../assets/images/number-four_c.png";
import cNumberFive from "../../../assets/images/number-five_c.png";

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

import cHouse1 from "../../../assets/images/house_c_1.png";
import cHouse2 from "../../../assets/images/house_c_2.png";
import cHouse3 from "../../../assets/images/house_c_3.png";
import cHouse4 from "../../../assets/images/house_c_4.png";
import cHouse5 from "../../../assets/images/house_c_5.png";
import cHouse6 from "../../../assets/images/house_c_6.png";
import cHouse7 from "../../../assets/images/house_c_7.png";
import cHouse8 from "../../../assets/images/house_c_8.png";
import cHouse9 from "../../../assets/images/house_c_9.png";
import cHouse10 from "../../../assets/images/house_c_10.png";
import cHouse11 from "../../../assets/images/house_c_11.png";
import cHouse12 from "../../../assets/images/house_c_12.png";
import cHouse13 from "../../../assets/images/house_c_13.png";
import cHouse14 from "../../../assets/images/house_c_14.png";
import cHouse15 from "../../../assets/images/house_c_15.png";
import cHouse16 from "../../../assets/images/house_c_16.png";
import cHouse17 from "../../../assets/images/house_c_17.png";
import cHouse18 from "../../../assets/images/house_c_18.png";
import cHouse19 from "../../../assets/images/house_c_19.png";
import cHouse20 from "../../../assets/images/house_c_20.png";

import { Dropdown } from 'react-native-material-dropdown'

const cHouses = [
  cHouse1,
  cHouse2,
  cHouse3,
  cHouse4,
  cHouse5,
  cHouse6,
  cHouse7,
  cHouse8,
  cHouse9,
  cHouse10,
  cHouse11,
  cHouse12,
  cHouse13,
  cHouse14, 
  cHouse15,
  cHouse16,
  cHouse17,
  cHouse18,
  cHouse19,
  cHouse20
];

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

const settingBtns = [
  SettingImage,
  SettingImage,
  NumberOne,
  NumberTwo,
  NumberThree,
  NumberFour,
  NumberFive
];

const cSettingBtns = [
  cNumberOne,
  cNumberTwo,
  cNumberThree,
  cNumberFour,
  cNumberFive
];



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
    console.log(state.params);
    UserName = state.params.userName || "";
    UID = state.params.UID || "";
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
    users: false,
    neighbors: false,
    neighborID: 1,
    appState: AppState.currentState,
  };

  async componentDidMount() {
    // const { navigate } = this.props.navigation;

    // var a = this.props.navigation;
    await AppState.addEventListener('change', this._handleAppStateChange);
    ScreenOrientation.allowAsync(ScreenOrientation.Orientation.LANDSCAPE_RIGHT);
      this._setOnlineStatus(true);
  }

  async componentWillMount() {
    await AppState.removeEventListener('change', this._handleAppStateChange);
    this._RefreshHouse();
      this._setOnlineStatus(true);
  }

   _handleAppStateChange = (nextAppState) => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      console.log('App has come to the foreground!');
      this._setOnlineStatus(true);
    } else {
      console.log('App has come to background')
      this._setOnlineStatus(false);
    }
    this.setState({appState: nextAppState});
  };

  _setOnlineStatus = (status) => {
    firebase
        .database()
        .ref('/neighborhood/' + UID)
        .update({
          online: status
        })
  }

  _RefreshHouse = () => {
    this.getNeighbors();
  }

  getUsers = () => {
    var users = firebase
      .database()
      .ref("/users/")
      .once("value")
      .then(res => {
        this.setState({
          users: Object.values(res.val())
        });
      })
      .catch(console.error);
  };

  getNeighbors = () => {
    var users = firebase
      .database()
      .ref("/neighborhood/")
      .orderByChild('neighborID')
      .equalTo(this.state.neighborID)
      .on("value", snap => {
        this.setState({
          neighbors: snap.val()
        });
      })
  };

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
            setTimeout(function () {
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
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3]
    });

    console.log(result);

    if (!result.cancelled) {
      await this.setState({ image: result.uri });
      try {
        await this.uploadImage()
      } catch (e) {
        console.log(e)
      }
    }
  };

  uploadImage = async () => {
    var uri = this.state.image;
    var imageName = "profile-image-" + Math.random(new Date()).toString(36);
    const response = await fetch(uri);
    const blob = await response.blob();
    // var projectNameText = this.state.projectNameText;
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
            setTimeout(function () {
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

  renderPrivacyPolicy = () => (
    <View style={styles.modalContent}>
      <Item>
        <Label style={{fontSize: 18, marginBottom: 5}}>Privacy And Policy</Label>
      </Item>
      <View>
        <Text>Read our Privacy and Policy</Text>
      </View>
      {/* <TouchableOpacity onPress={()=>this.changeEmail(this.state.currentPasswordForEmail , this.state.currentPasswordForEmail)}> */}
      <TouchableOpacity onPress={() => this.setState({privacyModal: null})}>
        <View style={styles.button}>
          <Text>Close</Text>
        </View>
      </TouchableOpacity>
    </View>
  )

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
      {this.renderUser()}
    </View>
  );

  renderUser = () => (
    <View style={{ textAlign: 'left' }}>
      <Text>User full Name</Text>
      <Text>User Info</Text>
    </View>
  )

  callFun = async (b_no) => {
    await this.setState({ 
      visibleModal: b_no === -1 ? true : null, // -1 setting button
      privacyModal: b_no === 0 ? true : null,
      neighborID: b_no > 0 ? b_no : this.state.neighborID
    });
    this._RefreshHouse();
  };


  renderSettingBtn = () =>
    settingBtns.map((btnImg, j) => {
      let b_no = j;

      return (
        <TouchableOpacity
          key={b_no}
          activeOpacity={0.5}
          onPress={() => this.callFun(b_no - 1)}
          style={[
            styles.settingImgTouch,
            styles[`settingImgTouch_${b_no}`] &&
            styles[`settingImgTouch_${b_no}`]
          ]}
        >
          
          {b_no !== 0 && b_no - 1 === this.state.neighborID
            ? <Image source={cSettingBtns[this.state.neighborID - 1]} style={styles.settingImg} />
            : <Image source={btnImg} style={styles.settingImg} />
          }
        </TouchableOpacity>
      );
    });

  render() {
    return (
      <Container style={{ flex: 1 }}>
        <StatusBar hidden={true} />
        {/* </View> */}
        <ImageBackground source={BckImage} style={styles.bckImage} />
        {/* Setting */}
        {this.renderSettingBtn()}

        {Houses.map((house, i) => {
          let h_no = i + 1;
          return (
            <RenderHouse
              key={Math.random(h_no).toString(36)}
              h_no={h_no}
              house={house}
              neighbors={this.state.neighbors}
              RefreshHouse={this._RefreshHouse}
              neighborID={this.state.neighborID}
            />
          );
        })}

        <Modal
          isVisible={this.state.visibleModal === true}
          onBackdropPress={() => this.setState({ visibleModal: null })}
        >
          {this.renderModalContent()}
        </Modal>
        {/* /*************************************Modal pass  */}
        <Modal
          isVisible={this.state.visbleModalForEmail === true}
          onBackdropPress={() => this.setState({ visbleModalForEmail: null })}
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
          isVisible={this.state.privacyModal === true}
          onBackdropPress={() =>
            this.setState({ privacyModal: null })
          }
        >
          {this.renderPrivacyPolicy()}
        </Modal>
        
      </Container>
    );
  }
}


const percentageX = (value) => {
  return height * (value / 100); // 340 px my device
}

const percentageY = (value) => {
  return width * (value / 100); // 640 my device
}

const settingBtn = value =>
  value === 0
    ? width - 60 // Gap between two button should 50. 
    : width - (50 * (8 - value)) - 10 // First button should 50 so substruct 10 from other button to make balance

const styles = StyleSheet.create({
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
  modalContentAction: {
    backgroundColor: "white",
    padding: 22,
    width: '50%',
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
    height: 50
  },

  settingImgTouch: {
    position: "absolute",
    zIndex: 9999,
    top: 0
  },

  settingImgTouch_0: {
    left: settingBtn(0),
  },
  settingImgTouch_1: {
    // left: settingBtn(1)
  },
  settingImgTouch_2: {
    left: settingBtn(2)
  },
  settingImgTouch_3: {
    left: settingBtn(3)
  },
  settingImgTouch_4: {
    left: settingBtn(4)
  },
  settingImgTouch_5: {
    left: settingBtn(5)
  },
  settingImgTouch_6: {
    left: settingBtn(6)
  },

  contView: {
    flex: 1,
    flexDirection: "column"
  },
  house: {
    width: percentageX(22),
    height: percentageX(22)
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
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 999
  }
});

export default Dashboard;


class RenderHouse extends React.Component {
  state = {
    visibleInviteResident: null,
    house_no: "",
    action: "invite",
    inviteEmail: "",
    searchValue: "",
    neighborInfo: {}
  }

  _onPress = (h_no, neighborID="") => {
    this._checkUser(neighborID)
    this.setState({
      visibleInviteResident: true,
      house_no: h_no,
      neighborID
    })
  }

  _onChangeAction = (itemValue, itemIndex) => {
    this.setState({ action: itemValue })
  }

  _onPressDelete = () => {
    let userRef = firebase
      .database()
      .ref("/neighborhood/" + this.state.neighborID)
      .remove()
      .then(() => {
        this.props.RefreshHouse()
      }); 
  }

  _checkUser = (id) => {
    let userRef = firebase.database().ref("/users/"); 
    userRef
      .orderByKey()
      .equalTo(id)
      .on('value', snap => {
        if (snap.val()) {
          this.setState({
            neighborInfo: snap.val()[id]
          })
        } 
      })
  }

  _onPressSearch = async (value) => {
    let user = this.state.searchValue; // Searching user mail
    let userRef = firebase.database().ref("/users/");
    let ts = this;
    let neighborID = this.props.neighborID;
    let uid = await AsyncStorage.getItem("auth");
    userRef
      .orderByChild('mail')
      .equalTo(user)
      .on('value', snap => {
        if (!snap.val()) {
          alert("User not exists")
        } else {
          let keys = Object.keys(snap.val());
          let neighborhoodID = ''
          keys.forEach((objKey) => {
            if (!neighborhoodID) {
              neighborhoodID = objKey;
              let obj = {
                houseID: this.state.house_no,
                uid, 
                neighborID
              }

              firebase.database().ref('neighborhood/' + neighborhoodID).set(obj).then((res) => {
                ts.setState({
                  visibleInviteResident: null
                })
                this.props.RefreshHouse();
              })
            }
          })
        }
      })
    
  }

  _onPressMove = () => {

  }

  _onPressInvite = () => {
    const to = this.state.inviteEmail; // string or array of email addresses
    if (validator.isEmail(to)) {
      email(to, {
        // Optional additional arguments
        subject: "Invitation from - ZenClause",
        body: "Hello, try this app"
      }).catch(console.error);
    } else {
      alert("Email is misformatted");
    }
  }

  renderAddNewResident = () => {
    return (
      <View>
        <Item
          style={{ height: 50, width: '100%' }}
        >
          <Input
            onChangeText={searchValue =>
              this.setState({ searchValue })
            }
            value={this.state.searchValue}
            placeholder="Type Username... "
          />
        </Item>
        <TouchableOpacity onPress={this._onPressSearch}>
          <View style={styles.button}>
            <Text>Add To Resident</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }



  renderInviteResident = () => {
    return (
      <View>
        <Item
          style={{ height: 50, width: '100%' }}
        >
          <Input
            onChangeText={inviteEmail =>
              this.setState({ inviteEmail })
            }
            placeholder="Type Email... "
          />
        </Item>
        <TouchableOpacity onPress={this._onPressInvite}>
          <View style={styles.button}>
            <Text>Invite </Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  renderMoveResident = () => {
    let houses = [];
    for(var i=1;i<=20;i++) {
      houses.push(<Picker.Item key={i} label={"House-" + i} value={"house_"+i} />)
    }
    return (
      <View>
        <Item
          style={{ height: 50, width: '100%' }}
        >
          <Picker
            selectedValue={this.state.action}
            style={{ height: 50, width: '100%' }}
            onValueChange={this._onChangeAction}
          >
            {houses}
          </Picker>
        </Item>
        <TouchableOpacity onPress={this._onPressMove}>
          <View style={styles.button}>
            <Text>Save </Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  renderDeleteResident = () => (
    <View style={{height: 50}}>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <TouchableOpacity onPress={this._onPressDelete} style={{styles}}>
          <View style={styles.button}>
            <Text>Confirm ?</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={this._onPressSearch}>
          <View style={styles.button}>
            <Text>Cancel </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )

  renderActionModal = () => {
    return (
      <Modal
        isVisible={this.state.visibleInviteResident === true}
        onBackdropPress={() =>
          this.setState({ visibleInviteResident: null })
        }
      >
        <View style={styles.modalContent}>
          <Text>Neighbor ID: #{this.props.neighborID}</Text>
          <Text>House No.: #{this.state.house_no}</Text>
          {this.state.neighborInfo.mail 
            ? <Text>Email: {this.state.neighborInfo.mail}</Text>
            : <Text>Add New Resident to this home</Text>
          }
          
          <Item
            style={{ height: 50, width: '100%' }}
          >
          <Picker
            selectedValue={this.state.action}
            style={{ height: 50, width: '100%' }}
            onValueChange={this._onChangeAction}>
            <Picker.Item label="Invite Resident" value="invite" />
            <Picker.Item label="Move Resident" value="move" />
            <Picker.Item label="Delete Resident" value="delete" />
            <Picker.Item label="Add New Resident" value="add" />
          </Picker>
          </Item>
          {this.state.action === 'invite' && this.renderInviteResident()}
          {this.state.action === 'add' && this.renderAddNewResident()}
          {this.state.action === 'move' && this.renderMoveResident()}
          {this.state.action === 'delete' && this.renderDeleteResident()}
        </View>
      </Modal>
    )
  }

  render() {
    const { house, h_no, neighbors, ...props } = this.props;
    
    let flag = false;
    let neighborID = '';
    return (
      <View style={styles.houseContainer}>
        {this.renderActionModal()}
        <TouchableOpacity
          activeOpacity={0.5}
          style={[
            styles.houseTouchable,
            styles[`house_${h_no}`] && styles[`house_${h_no}`]
          ]}
          onPress={() => this._onPress(h_no, neighborID)}
        >
      
          {neighbors && Object.keys(neighbors).map((id, p) => {
            if (neighbors[id].houseID === h_no) {
              flag = true;
              neighborID = id;
            }
            return neighbors[id].houseID === h_no && <React.Fragment>
              <Icon 
                type="FontAwesome" 
                name="circle" 
                style={{
                  color: neighbors[id].online ? "rgb(116, 233, 31)" : "rgb(239, 68, 48)",
                  fontSize: 12,
                  position: 'absolute',
                  top: 10,
                  right: 6,
                  zIndex: 9999999
                }}
                
              />
              <Image key={neighbors[id].houseID} source={cHouses[h_no - 1]} style={styles.house} />
              {/* <Image key={'c_'+neighbors[id].houseID} source={Profile} style={styles.profile} /> */}
            </React.Fragment>
          })}

          {!flag && <Image source={house} style={styles.house} />}
          
        </TouchableOpacity>
      </View>
    )
  }
}