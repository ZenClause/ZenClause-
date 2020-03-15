import * as React from "react";

import {
  Dimensions,
  View,
  StyleSheet,
  ImageBackground,
  StatusBar,
  Image,
  TouchableOpacity,
  AsyncStorage,
  AppState
} from "react-native";

import { Container, Text, Icon, Item, Input, Label, Picker } from "native-base";
import Modal from "react-native-modal";
import email from "react-native-email";
import ModalFilterPicker from "react-native-modal-filter-picker";
import validator from "validator";

import firebase from "firebase";
import { ScreenOrientation } from "expo";
import * as ImagePicker from "expo-image-picker";

import {
  houses,
  housesActived,
  numbers,
  numbersActived
} from "../../utils/images";

import BckImage from "../../../assets/images/bg.png";
import SettingImage from "../../../assets/images/setting-icon.png";
import HomeImage from "../../../assets/images/home.png";
import DialogImage from "../../../assets/images/dialog.png";

import House from "../../../assets/images/house.png";
import blueHouse from "../../../assets/images/house_c_x.png";

import Profile from "../../../assets/images/user.png";

import RenderUserPanel from "./dashboard/RenderUserPanel";
import RenderIM from "./dashboard/RenderIM";
import { RenderPost, RenderViewPost } from "./dashboard";

import HouseMenu from "./menus/HouseMenu";
import PMMenu from "./menus/PMMenu";
import CustomButton from "./menus/CustomButton";

import { IMMenu } from "./dashboard/";

const housesImages = Object.keys(houses).map(cH => houses[cH]);
const housesActivedImages = Object.keys(housesActived).map(
  h => housesActived[h]
);

const numbersImages = Object.keys(numbers).map(n => numbers[n]);
const numbersActivedImages = Object.keys(numbersActived).map(
  h => numbersActived[h]
);

const settingBtns = [SettingImage, HomeImage, ...numbersImages];

const cSettingBtns = numbersActivedImages;

let UID = "";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

class Dashboard extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    const { state } = this.props.navigation;
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
    neighbors: [],
    neighborID: 1,
    appState: AppState.currentState,
    emailOptions: []
  };

  async componentDidMount() {
    // const { navigate } = this.props.navigation;

    // var a = this.props.navigation;
    await AppState.addEventListener("change", this._handleAppStateChange);
    ScreenOrientation.lockAsync(ScreenOrientation.Orientation.LANDSCAPE);
    this._setOnlineStatus(true);

    this._loadEmailOptions();
  }

  async componentWillMount() {
    await AppState.removeEventListener("change", this._handleAppStateChange);
    this._RefreshHouse();
    this._setOnlineStatus(true);
  }

  _loadEmailOptions = () => {
    const ref = firebase.database().ref("users");

    ref.once("value").then(snap => {
      const val = snap.val();

      if (!val) {
        return;
      }
      const keys = Object.keys(val);
      const options = keys.map(key => {
        return { key: val[key].userName, label: val[key].userName };
      });

      options.sort(this.compare);

      this.setState({ emailOptions: options });
    });
  };

  compare = (a, b) => {
    var nameA = a.key.toLowerCase(),
      nameB = b.key.toLowerCase();
    if (nameA < nameB)
      //sort string ascending
      return -1;
    if (nameA > nameB) return 1;
    return 0; //default return value (no sorting)
  };

  _handleAppStateChange = nextAppState => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      this._setOnlineStatus(true);
    } else {
      this._setOnlineStatus(false);
    }
    this.setState({ appState: nextAppState });
  };

  _setOnlineStatus = status => {
    firebase
      .database()
      .ref("/neighborhood/" + UID)
      .once("value", snap => {
        if (snap.val()) {
          return firebase
            .database()
            .ref("/neighborhood/" + UID)
            .update({
              online: status
            });
        }
      });
  };

  _RefreshHouse = deleteId => {
    let remainingNeighbors = {};

    if (deleteId) {
      Object.keys(this.state.neighbors).forEach((id, p) => {
        if (id !== deleteId) {
          remainingNeighbors[id] = this.state.neighbors[id];
        }
      });

      this.setState({
        neighbors: remainingNeighbors
      });

      return;
    }

    this.getNeighbors();
  };

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
      .orderByChild("neighborID")
      .equalTo(this.state.neighborID)
      .on("value", snap => {
        this.setState({
          neighbors: snap.val()
        });
      });
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

    const response = await fetch(result.uri);
    const blob = await response.blob();

    if (!result.cancelled) {
      await this.setState({ image: result.uri });
      try {
        var uploadImgUrl = await this.uploadImage();
      } catch (e) {
        console.log(e);
      }
    }
  };

  uploadImage = async () => {
    var uri = this.state.image;
    var imageName = "profile_picture";
    const response = await fetch(uri);
    const blob = await response.blob();
    // var projectNameText = this.state.projectNameText;
    const imgUrl = UID + "/" + imageName;
    var ref = firebase
      .storage()
      .ref()
      .child(imgUrl);
    await ref.put(blob);

    var uploadImgUrl = await firebase
      .storage()
      .ref(imgUrl)
      .getDownloadURL();
    const storeImg = { profile: uploadImgUrl };
    firebase
      .database()
      .ref("users/" + UID)
      .update(storeImg);
    return storeImg;
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
        body:
          "Hello, try this app https://play.google.com/store/apps/details?id=com.zenclause.zenclause"
      }).catch(console.error);
    } else {
      alert("Email is misformatted");
    }
  };

  handleLogout = () => {
    AsyncStorage.multiRemove(["auth", "username"], err => {
      this.setState({
        visibleModal: !this.state.visibleModal
      });
      this.props.navigation.navigate("SignIn");
    });
  };

  renderModalContent = () => (
    <Container style={{ backgroundColor: "transparent" }}>
      <View style={styles.contView}>
        <View style={{ flexDirection: "row", flex: 1 }}>
          <View style={{ flex: 1 }}>
            <CustomButton
              fontSize={styles.deviceWidth / 41}
              label="Change Email"
              topColor="#39bcd6"
              bottomColor="#005fa6"
              bgColor="#0c8fd6"
              height="100%"
              width="100%"
              onPress={() => {
                this.setState({
                  visbleModalForEmail: true,
                  visibleModal: false
                });
              }}
            />
          </View>
          <View style={{ flex: 1 }}>
            <CustomButton
              fontSize={styles.deviceWidth / 41}
              label="Change Banner Text"
              topColor="#6cb2e2"
              bottomColor="#15397c"
              bgColor="#185fe2"
              height="100%"
              width="100%"
              onPress={() => {
                this.setState({
                  visbleModalForHeaderText: true,
                  visibleModal: false
                });
              }}
            />
          </View>
        </View>
        <View style={{ flexDirection: "row", flex: 1 }}>
          <View style={{ flex: 1 }}>
            <CustomButton
              fontSize={styles.deviceWidth / 41}
              label="Change Image"
              topColor="#7dc836"
              bottomColor="#045000"
              bgColor="#499301"
              height="100%"
              width="100%"
              onPress={() => {
                this._pickImage();
              }}
            />
          </View>
          <View style={{ flex: 1 }}>
            <CustomButton
              fontSize={styles.deviceWidth / 41}
              label="Change Password"
              topColor="#e6a34b"
              bottomColor="#803d1a"
              bgColor="#e63e00"
              height="100%"
              width="100%"
              onPress={() => {
                this.setState({
                  visbleModalForPassword: true,
                  visibleModal: false
                });
              }}
            />
          </View>
        </View>
        <View style={{ flexDirection: "row", flex: 1 }}>
          <View style={{ flex: 1 }}>
            <CustomButton
              fontSize={styles.deviceWidth / 41}
              label={this.state.btnValue}
              topColor="#ffdc37"
              bottomColor="#997533"
              bgColor="#ffa400"
              height="100%"
              width="100%"
              onPress={() => {
                this.changeBtn();
              }}
            />
          </View>

          <View style={{ flex: 1, flexDirection: "row" }}>
            <CustomButton
              fontSize={styles.deviceWidth / 41}
              label="Cancel"
              topColor="#ff9999"
              bottomColor="#df0000"
              bgColor="#f90f18"
              height="100%"
              width="49%"
              onPress={() => {
                this.setState({ visibleModal: null });
              }}
            />
            <CustomButton
              fontSize={styles.deviceWidth / 41}
              label="Logout"
              topColor="#ff9999"
              bottomColor="#df0000"
              bgColor="#f90f18"
              height="100%"
              width="49%"
              style={{ marginLeft: "1%" }}
              onPress={this.handleLogout}
            />
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
        <Label style={{ fontSize: 18, marginBottom: 5 }}>
          Privacy And Policy
        </Label>
      </Item>
      <View>
        <Text>Read our Privacy and Policy</Text>
      </View>
      {/* <TouchableOpacity onPress={()=>this.changeEmail(this.state.currentPasswordForEmail , this.state.currentPasswordForEmail)}> */}
      <TouchableOpacity onPress={() => this.setState({ privacyModal: null })}>
        <View style={styles.button}>
          <Text>Close</Text>
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
      {this.renderUser()}
    </View>
  );

  renderUser = () => (
    <View style={{ textAlign: "left" }}>
      <Text>User full Name</Text>
      <Text>User Info</Text>
    </View>
  );

  callFun = async b_no => {
    await this.setState({
      visibleModal: b_no === -1 ? true : false, // -1 setting button
      privacyModal: b_no === 0 ? true : false,
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
          {b_no !== 0 && b_no - 1 === this.state.neighborID ? (
            <Image
              source={cSettingBtns[this.state.neighborID - 1]}
              style={styles.settingImg}
            />
          ) : (
            <Image source={btnImg} style={styles.settingImg} />
          )}
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

        {housesImages.map((house, i) => {
          let h_no = i + 1;

          return (
            <RenderHouse
              key={Math.random(h_no).toString(36)}
              h_no={h_no}
              house={house}
              neighbors={this.state.neighbors}
              RefreshHouse={this._RefreshHouse}
              neighborID={this.state.neighborID}
              emailOptions={this.state.emailOptions}
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
          onBackdropPress={() => this.setState({ privacyModal: null })}
        >
          {this.renderPrivacyPolicy()}
        </Modal>
      </Container>
    );
  }
}

const percentageX = value => {
  return height * (value / 100); // 340 px my device
};

const percentageY = value => {
  return width * (value / 100); // 640 my device
};

const settingBtn = value =>
  value === 0
    ? width - 60 // Gap between two button should 50.
    : width - 50 * (8 - value) - 10; // First button should 50 so substruct 10 from other button to make balance

const styles = StyleSheet.create({
  deviceWidth: Dimensions.get("window").width,
  deviceHeight: Dimensions.get("window").height,
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
    width: "50%",
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
    left: settingBtn(0)
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
    bottom: percentageX(28),
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
    width: Dimensions.get("window").width / 25,
    height: Dimensions.get("window").width / 25,
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 9999999999,
    borderRadius: 100
  },
  userPanel: {},
  testProfile: {
    borderBottomWidth: 5,
    borderBottomColor: "red"
  }
});

export default Dashboard;

const UserProfileShow = ({ userId }) => {
  const [ProfilePic, SetProfilePic] = React.useState(Profile);
  async function getUserProfile() {
    let neighborPicture = undefined;
    try {
      neighborPicture = await firebase
        .storage()
        .ref(`${userId}/profile_picture`)
        .getDownloadURL();
    } catch (err) {
    } finally {
      if (neighborPicture) {
        SetProfilePic({ uri: neighborPicture });
      }
    }
  }

  React.useEffect(() => {
    getUserProfile();
  }, []);
  return <Image source={ProfilePic} style={styles.profile} />;
};

class RenderHouse extends React.Component {
  state = {
    visibleHouseMenu: false,
    visibleIMMenu: false,
    showActionModal: false,
    visibleInviteResident: null,
    visibleUserPanel: false,
    visiblePMMenu: false,
    visibleIM: false,
    visibleSeePost: false,
    house_no: "",
    neighborID: "",
    action: "invite",
    inviteEmail: "",
    searchValue: "",
    neighborInfo: {},
    messages: [],
    housePressCount: 0,
    dataFlag: false,
    visible: false,
    profiles: {}
  };

  componentDidMount() {
    const userKeys = this.props.neighbors && Object.keys(this.props.neighbors);
  }

  clickTimeout = null;
  _onPress = (h_no, neighborID) => {
    if (neighborID) {
      if (this.clickTimeout !== null) {
        this.setState({
          visibleHouseMenu: true,
          house_no: h_no
        });
        clearTimeout(this.clickTimeout);
        this.clickTimeout = null;
      } else {
        this.clickTimeout = setTimeout(() => {
          this.setState({
            visiblePMMenu: true,
            house_no: h_no,
            neighborID
          });
          clearTimeout(this.clickTimeout);
          this.clickTimeout = null;
        }, 500);
      }
    } else {
      this.setState({
        // visibleInviteResident: true,
        //showActionModal: true,
        visibleHouseMenu: true,
        house_no: h_no,
        neighborID
      });
    }
    this._checkUser(neighborID);
  };

  _onChangeAction = (itemValue, itemIndex) => {
    // if (itemValue == this.state.house_no) {
    //   alert("The house is already occupied!");
    //   return;
    // }

    this.setState({ action: itemValue });
  };

  _onPressDelete = () => {
    if (!this.state.neighborInfo.id) {
      alert("No resident to delete!");
      return;
    }

    let userRef = firebase
      .database()
      .ref("/neighborhood/" + this.state.neighborInfo.id)
      .remove()
      .then(res => {
        this.props.RefreshHouse();
        this.setState({ showActionModal: false });
      })
      .catch(function(error) {
        console.log("Remove failed: " + error.message);
      });
  };

  _checkUser = id => {
    let userRef = firebase.database().ref("/users/");
    userRef
      .orderByKey()
      .equalTo(id)
      .on("value", snap => {
        if (snap.val()) {
          let neighbor = snap.val()[id];
          neighbor.id = id;

          this.setState({
            neighborInfo: neighbor
          });
        }
      });
  };

  _onPressSearch = async value => {
    let user = this.state.searchValue; // Searching user mail
   
    let userRef = firebase.database().ref("/users/");
    let ts = this;
    let neighborID = this.props.neighborID;
    let uid = await AsyncStorage.getItem("auth");
    userRef
      .orderByChild("userName")
      .equalTo(user)
      .on("value", snap => {
        if (!snap.val()) {
          alert("User not exists");
        } else {
          let keys = Object.keys(snap.val());
          let neighborhoodID = "";
          keys.forEach(objKey => {
            if (!neighborhoodID) {
              neighborhoodID = objKey;
              let onlineStatus = snap.val()[objKey].online ? true : false;

              let obj = {
                houseID: this.state.house_no,
                uid,
                neighborID,
                online: onlineStatus
              };

              firebase
                .database()
                .ref("neighborhood/" + neighborhoodID)
                .set(obj)
                .then(res => {
                  ts.setState({
                    visibleInviteResident: null
                  });
                  this.props.RefreshHouse();
                });
            }
          });
        }
      });
  };

  _onPressMove = async () => {
    const { id } = this.state.neighborInfo;
    let uid = await AsyncStorage.getItem("auth");

    let obj = {
      houseID: this.state.house_no,
      uid
    };

    firebase
      .database()
      .ref("neighborhood/" + id)
      .update(obj)
      .then(res => {
        this.props.RefreshHouse();
      })
      .catch(err => {
        console.log(err);
      });
  };

  _onPressInvite = () => {
    const to = this.state.inviteEmail; // string or array of email addresses
    if (validator.isEmail(to)) {
      email(to, {
        // Optional additional arguments
        subject: "Invitation from - ZenClause",
        body:
          "Hello, try this app https://play.google.com/store/apps/details?id=com.zenclause.zenclause"
      }).catch(console.error);
    } else {
      alert("Email is misformatted");
    }
  };

  _onSelectTopic = picked => {
    this.setState({
      visible: false
    });

    this.setState({ searchValue: picked });
  };

  _onCancel = () => {
    this.setState({
      visible: false
    });
  };

  _onShow = () => {
    this.setState({ visible: true });
  };

  renderAddNewResident = () => {
    const { visible } = this.state;
    return (
      <View>
        <Item style={{ height: 50, width: "100%" }}>
          <TouchableOpacity onPress={this._onShow}>
            <Text>Tap to select User to Add</Text>
          </TouchableOpacity>
          <ModalFilterPicker
            visible={visible}
            disabled={this.props.emailOptions.length === 0}
            onSelect={this._onSelectTopic}
            onCancel={this._onCancel}
            options={this.props.emailOptions}
          />
        </Item>
        <TouchableOpacity onPress={this._onPressSearch}>
          <View style={styles.button}>
            <Text>Add To House</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  renderInviteResident = () => {
    return (
      <View>
        <Item style={{ height: 50, width: "100%" }}>
          <Input
            onChangeText={inviteEmail => this.setState({ inviteEmail })}
            placeholder="Enter an Email address to send an invite to ZenClause!"
          />
        </Item>
        <TouchableOpacity onPress={this._onPressInvite}>
          <View style={styles.button}>
            <Text>Invite </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  renderMoveResident = () => {
    if (!this.state.neighborInfo.id) {
      return (
        <View>
          <Text>No resident to move!</Text>
        </View>
      );
    }

    let houses = [];

    for (var i = 1; i <= 20; i++) {
      houses.push(<Picker.Item key={i} label={"House-" + i} value={i} />);
    }

    return (
      <View>
        <Item style={{ height: 50, width: "100%" }}>
          <Picker
            selectedValue={this.state.house_no}
            style={{ height: 50, width: "100%" }}
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
    );
  };

  renderDeleteResident = () => (
    <View style={{ height: 50 }}>
      <View style={{ flex: 1, flexDirection: "row" }}>
        <TouchableOpacity onPress={this._onPressDelete} style={{ styles }}>
          <View style={styles.button}>
            <Text>Confirm ?</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.setState({ showActionModal: false })}
        >
          <View style={styles.button}>
            <Text>Cancel </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );

  renderActionModal = (h_no) => {
    return (
      <Modal
        // isVisible={this.state.visibleInviteResident === true}
        isVisible={this.state.showActionModal}
        onBackdropPress={() => this.setState({ showActionModal: false })}
        backdropOpacity={0.2}
      >
        <View style={styles.modalContent}>
          <Text>Neighbor ID: #{this.props.neighborID}</Text>
          
          <Text style={{marginBottom:8}}>House No.: #{this.state.house_no}</Text>
          {this.state.neighborInfo.mail ? (
            <Text>Email: {this.state.neighborInfo.mail}</Text>
          ) : (
            <Text>Add New Resident to this home</Text>
          )}

          {/* <Item style={{ height: 50, width: "100%" }}>
            <Picker
              selectedValue={this.state.action}
              style={{ height: 50, width: "100%" }}
              onValueChange={this._onChangeAction}
            >
              <Picker.Item label="Invite Resident" value={'invite'} />
              <Picker.Item label="Move Resident" value={'move'} />
              <Picker.Item label="Delete Resident" value={'delete'} />
              <Picker.Item label="Add New Resident" value={'add'} />
            </Picker>
          </Item> */}

          {this.state.action === "invite" && this.renderInviteResident()}
          {this.state.action === "add" && this.renderAddNewResident()}
          {this.state.action === "move" && this.renderMoveResident()}
          {this.state.action === "delete" && this.renderDeleteResident()}
        </View>
      </Modal>
    );
  };

  renderUserPanel = (h_no, neighborID) => {
    return (
      <Modal
        isVisible={this.state.visibleUserPanel}
        onBackdropPress={() => this.setState({ visibleUserPanel: false })}
        backdropOpacity={0.2}
        style={styles.userPanel}
      >
        <RenderUserPanel
          onCancel={() => this.setState({ visibleUserPanel: false })}
          openIMWindow={() => {
            if (UID !== neighborID) {
              this.setState({
                visibleUserPanel: false,
                visibleIM: true
              });
            } else {
              alert("Invalid...! This is you");
            }
          }}
          openPostWindow={() => {
            this.setState({
              visibleUserPanel: false,
              visiblePost: true
            });
          }}
          seePost={() => {
            this.setState({
              visibleUserPanel: false,
              visibleSeePost: true
            });
          }}
          uid={UID}
          neighborID={neighborID}
          houseNo={h_no}
        />
      </Modal>
    );
  };

  getPost = neighborID => {
    const { neighbors } = this.props;

    for (var id in neighbors) {
      if (id === neighborID) {
        const postID = neighbors[id]["postID"];
        firebase
          .database()
          .ref("/post-list/" + postID)
          .once("value", snap => {
            let value = snap.val();

            if (!value) {
              return;
            }

            this.setState({
              chatInfo: value.comments,
              title: value.title,
              picture: value.picture,
              headerName: value.userName,
              date: value.date,
              headerOnlineStatus: value.onlineStatus,
              userPic: value.userPic
            });
          });
      }
    }
  };

  renderPMMenu = neighborID => {
    this.getPost(neighborID);
    const {
      chatInfo,
      headerName,
      title,
      picture,
      date,
      userPic,
      headerOnlineStatus
    } = this.state;

    return (
      <Modal
        isVisible={this.state.visiblePMMenu}
        onBackdropPress={() => this.setState({ visiblePMMenu: false })}
        backdropOpacity={0.2}
        style={styles.userPanel}
      >
        <PMMenu
          neighborID={neighborID}
          chatInfo={chatInfo}
          headerName={headerName}
          userPic={userPic}
          picture={picture}
          headerOnlineStatus={headerOnlineStatus}
          headerDate={date}
          headerAddress={title}
          onPress={() =>
            this.setState({ visiblePMMenu: !this.state.visiblePMMenu })
          }
        />
      </Modal>
    );
  };

  getMessages = neighborID => {
    firebase
      .database()
      .ref("/message-list/" + neighborID)
      .once("value", snap => {
        let value = snap.val();
        if (!value) {
          return;
        }

        this.setState({ imChatInfo: value.messages, dataFlag: true });
      });
  };

  renderIMMenu = neighborID => {
    // if (!this.state.dataFlag) {
    //   this.getMessages(neighborID);
    // }
    const { imChatInfo } = this.state;
    return (
      <Modal
        isVisible={this.state.visibleIMMenu}
        onBackdropPress={() => this.setState({ visibleIMMenu: false })}
        backdropOpacity={0.2}
        style={{ marginTop: styles.deviceHeight / 20 }}
      >
        <IMMenu
          neighborID={neighborID}
          chatInfo={imChatInfo}
          uid={UID}
          onPress={() =>
            this.setState({ visibleIMMenu: !this.state.visibleIMMenu })
          }
          // onSendIM={status => {
          //   this.setState({ visibleIMMenu: true });
          // }}
          // neighbor={neighbor}

          // refresh={this.RefreshHouse}
        />
      </Modal>
    );
  };

  renderHouseMenu = (h_no, neighborID) => {
    return (
      <Modal
        isVisible={this.state.visibleHouseMenu}
        onBackdropPress={() => this.setState({ visibleHouseMenu: false })}
        backdropOpacity={0.2}
        style={{ marginTop: "5%" }}
      >
        <HouseMenu
          onCancel={() => this.setState({ visibleHouseMenu: false })}
          onPress={output => {
            if (UID !== neighborID) {
              if (output == "cancel" || output == "next") {
                this.setState({
                  visibleHouseMenu: false
                });
              } else {
                this.setState({
                  house_no:h_no,
                  showActionModal: true,
                  visibleHouseMenu: false,
                  action: output
                });
              }
            } else {
              alert("Invalid...! This is you");
            }
          }}
          openPostWindow={() => {
            this.setState({
              visibleHouseMenu: false,
              visiblePost: true
            });
          }}
          seePost={() => {
            this.setState({
              visibleHouseMenu: false,
              visibleSeePost: true
            });
          }}
          uid={UID}
          neighborID={neighborID}
          houseNo={h_no}
        />
      </Modal>
    );
  };

  renderIM = (h_no, neighbor, neighborID) => {
    return (
      <Modal
        isVisible={this.state.visibleIM}
        onBackdropPress={() => this.setState({ visibleIM: false })}
        backdropOpacity={0.2}
        style={styles.userPanel}
      >
        <RenderIM
          onSendIM={status => {
            this.setState({ visibleIM: true });
          }}
          neighbor={neighbor}
          neighborID={neighborID}
          h_no={h_no}
          uid={UID}
          // refresh={this.RefreshHouse}
        />
      </Modal>
    );
  };

  renderPost = (h_no, neighbor, neighborID) => {
    return (
      <Modal
        isVisible={this.state.visiblePost}
        onBackdropPress={() => this.setState({ visiblePost: false })}
        backdropOpacity={0.2}
      >
        <RenderPost
          onSendPost={status => {
            this.setState({ visiblePost: true });
          }}
          neighbor={neighbor}
          neighborID={neighborID}
          h_no={h_no}
          uid={UID}
          // refresh={this.RefreshHouse}
        />
      </Modal>
    );
  };

  isIMRecieved = (messages = [], neighborID) => {
    if (messages.length > 0) {
      return messages.indexOf(neighborID) !== 1;
    } else {
      return false;
    }
  };

  seePost = (h_no, neighbor, neighborID) => {
    return (
      <Modal
        isVisible={this.state.visibleSeePost}
        onBackdropPress={() => this.setState({ visibleSeePost: false })}
        backdropOpacity={0.2}
      >
        <RenderViewPost
          neighbor={neighbor}
          neighborID={neighborID}
          h_no={h_no}
          uid={UID}
          refreshView={async () => {
            await this.setState({ visibleSeePost: true });
          }}
        />
      </Modal>
    );
  };

  openIMMenu = (n, neighborID_) => {
    this.setState({ visibleIMMenu: true });
    if (n.whoSeen) {
      if (this.checkWhoSeened(n)) {
        // var newData = n.whoSeen.map((n,index) => {
        //   return {i:n}
        // })
        // var n = newData.length -1
        // newData = [...newData,{n:UID}]
        newData = n.whoSeen;
        newData.push(UID);
        newData = Object.assign({}, newData);
        firebase
          .database()
          .ref("/neighborhood/" + neighborID_)
          .update({
            whoSeen: newData
          });
      }
    }
  };

  checkWhoSeened = data => {
    if (data.whoSeen) {
      // alert(JSON.stringify(data))
      const d = data.whoSeen.filter(n => n == UID);
      if (d.length) {
        return false;
      }
      return true;
    }
    return false;
  };

  render() {
    const { house, h_no, neighbors, ...props } = this.props;
    let flag = false;
    let neighborID = "";

    return (
      <View style={styles.houseContainer}>
        {this.renderActionModal(h_no)}
        <TouchableOpacity
          activeOpacity={0.5}
          style={[
            styles.houseTouchable,
            styles[`house_${h_no}`] && styles[`house_${h_no}`]
          ]}
          onPress={() => this._onPress(h_no, neighborID)}
        >
          {neighbors &&
            Object.keys(neighbors).map((id, p) => {
              if (neighbors[id].houseID === h_no) {
                flag = true;
                neighborID = id;
              }

              return (
                neighbors &&
                neighbors[id].houseID === h_no && (
                  <React.Fragment key={neighbors[id].houseID}>
                    <Icon
                      type="FontAwesome"
                      name="circle"
                      style={{
                        color: neighbors[id].online
                          ? id === UID
                            ? "rgb(116, 233, 31)"
                            : "rgb(116, 233, 31)"
                          : "rgb(239, 68, 48)",
                        fontSize: styles.deviceWidth / 51,
                        position: "absolute",
                        top: 10,
                        right: 6,
                        zIndex: 9999999
                      }}
                    />

                    {flag && (
                      <React.Fragment>
                        {neighbors &&
                        id !== UID &&
                        this.isIMRecieved(neighbors[id].messages, id) ? (
                          <React.Fragment>
                            <Image source={blueHouse} style={styles.house} />
                            {neighbors[id] && neighbors[id].profile ? (
                              <Image source={{ uri: neighbors[id].profile }} />
                            ) : (
                              <Image source={Profile} style={styles.profile} />
                            )}
                          </React.Fragment>
                        ) : neighbors &&
                          neighbors[id].post &&
                          neighbors[id].post.seen &&
                          neighbors[id].post.seen.indexOf(UID) === -1 ? (
                          <React.Fragment>
                            <Image source={House} style={styles.house} />
                            {neighbors[id].profile ? (
                              <Image
                                source={{ uri: neighbors[id].profile }}
                                style={styles.profile}
                              />
                            ) : (
                              <Image source={Profile} style={styles.profile} />
                            )}
                          </React.Fragment>
                        ) : neighbors &&
                          neighbors[id].post &&
                          !neighbors[id].post.seen ? (
                          <React.Fragment>
                            <Image source={House} style={styles.house} />
                            {neighbors[id].profile ? (
                              <Image
                                source={{ uri: neighbors[id].profile }}
                                style={styles.profile}
                              />
                            ) : (
                              <Image source={Profile} style={styles.profile} />
                            )}
                          </React.Fragment>
                        ) : (
                          neighbors && (
                            <React.Fragment>
                              <Image
                                source={housesActivedImages[h_no - 1]}
                                style={styles.house}
                              />
                              {neighbors[id].profile ? (
                                <Image
                                  source={{ uri: neighbors[id].profile }}
                                  style={styles.profile}
                                />
                              ) : (
                                <TouchableOpacity
                                  onPress={() =>
                                    this.openIMMenu(neighbors[id], id)
                                  }
                                  style={styles.profile}
                                >
                                  <UserProfileShow userId={id} />
                                </TouchableOpacity>
                              )}
                            </React.Fragment>
                          )
                        )}
                      </React.Fragment>
                    )}

                  

                    {this.checkWhoSeened(neighbors[id])?
                      neighbors[id].lastMsg ? (
                        <View
                          style={{
                            position: "absolute",
                            zIndex: 999999999,
                            top: 0,
                            right: -10
                          }}
                        >
                          <Image
                            source={DialogImage}
                            style={{ width: 60, height: 40 }}
                          />
                          <Text
                            style={{
                              position: "absolute",
                              top: 2,
                              left: 10,
                              fontSize: 11,
                              color: "#0081ee"
                            }}
                          >
                            {neighbors[id].lastMsg.substr(0, 15)}
                          </Text>
                        </View>
                      ):null:null}
                  </React.Fragment>
                )
              );
            })}

          {/* {this.renderUserPanel(h_no, neighborID)} */}
          {this.renderPMMenu(neighborID)}
          {flag && (
            <React.Fragment>
              {/* {this.renderIM(h_no, neighbors[neighborID], neighborID)} */}
              {this.renderIMMenu(neighborID)}
              {this.renderPost(h_no, neighbors[neighborID], neighborID)}
              {this.seePost(h_no, neighbors[neighborID], neighborID)}
            </React.Fragment>
          )}

          {!flag && <Image source={house} style={styles.house} />}
          {this.renderHouseMenu(h_no, neighborID)}
        </TouchableOpacity>
      </View>
    );
  }
}
