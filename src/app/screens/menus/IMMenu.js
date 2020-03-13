import React, { Component } from "react";
import { View, Dimensions,Image, StyleSheet, TextInput, Text,TouchableOpacity } from "react-native";
import CustomButton from "./CustomButton";
import Chat from "./Chat";
import firebase from "firebase";
import Modal from "react-native-modal";
import { Thumbnail, Icon } from "native-base";
import animatedHappyGif from "../../../../assets/images/happy.gif";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;
const defaultPic = {
  uri:
    "https://content-static.upwork.com/uploads/2014/10/02123010/profilephoto_goodcrop.jpg"
};
class IMMenu extends Component {
  chatRef = null;
  setChatRef = r => (this.chatRef = r);

  state = {
    messages: [],
    msgId: "",
    user: {},
    message: "",
    profile_picture: null,
    visibleIMMenu: false,
    chatIndex: 0,
    msgIds: [],
    emojiVisible: false
  };

  componentDidMount() {
    this.getMsg();
    this.getUserProfile();
  }

  onSend = (emoji) => {
    const { msgId, user } = this.state;
    this.chatRef.sendIM(this.props.uid, this.props.neighborID, msgId, user,emoji);
  };

  getUserProfile = async () => {
    const uid = this.props.uid;
    let neighborPicture = undefined;
    try {
      neighborPicture = await firebase
        .storage()
        .ref(`${uid}/profile_picture`)
        .getDownloadURL();
    } catch (err) {
    } finally {
      if (neighborPicture) {
        this.setState({ profile_picture: { uri: neighborPicture } });
      }
    }
  };

  getMsg = async () => {
    let { uid, neighborID } = this.props;
    try {
      await firebase
        .database()
        .ref("/message-list/" + neighborID)
        .on("value", snap => {
          let value = snap.val();
          if (value) {
            this.setState({
              msgIds: value.messages
                ? Object.keys(value.messages).map(key => key)
                : [],
              msgId: neighborID,
              messages: value.messages
                ? Object.keys(value.messages).map(key => value.messages[key])
                : []
            });
          }
        });
    } catch (error) {
      alert(error);
    }

    await firebase
      .database()
      .ref("/users/" + uid)
      .once("value", snap => {
        this.setState({
          user: snap.val()
        });
      });

    let mssgs = this.state.messages || [];

    if (mssgs.length > 0) {
      if (mssgs.indexOf(uid) !== -1) {
        mssgs.splice(mssgs.indexOf(uid), 1);
        await firebase
          .database()
          .ref("/neighborhood/" + neighborID)
          .update({
            messages: mssgs
          });
      }
    }
  };

  zenImoji = () => {
    this.setState({ emojiVisible: true });
  };

  onreply = () => {
    var f = this.chatRef.onReply();
    if (f != -1) {
      this.setState({ visibleIMMenu: true, chatIndex: f });
    }
  };

  sendReply = () => {
    const { message, msgIds, msgId, chatIndex, messages, user } = this.state;
    let { uid, neighborID } = this.props;
    this.chatRef.sendReply(
      msgId,
      user,
      uid,
      neighborID,
      message,
      msgIds[chatIndex],
      messages[chatIndex].name
    );
  };
  render() {
    const item = this.state.messages;
    return (
      <View
        style={{
          padding: 5,
          paddingVertical: 6,
          backgroundColor: "#818181",
          borderWidth: 2,
          borderRadius: 13,
          width: deviceWidth / 2.3,
          height: deviceWidth / 2.4
        }}
      >
        <View style={{ flex: 0.58 }}>
          <Chat
          msgIds={this.state.msgIds}
            profile_picture={this.state.profile_picture}
            ref={this.setChatRef}
            chatInfo={this.state.messages}
          />
        </View>
        <View style={{ flex: 0.42 }}>
          <View
            style={{
              flex: 0.5,
              flexDirection: "row",
              marginTop: "2%",
              justifyContent: "space-between"
            }}
          >
            <CustomButton
              fontSize={deviceWidth / 51}
              label="Send"
              topColor="#39bcd6"
              bottomColor="#005fa6"
              bgColor="#0c8fd6"
              height="100%"
              width="31%"
              onPress={this.onSend}
            />
            <CustomButton
              fontSize={deviceWidth / 51}
              label="Username"
              topColor="#6cb2e2"
              bottomColor="#15397c"
              bgColor="#185fe2"
              height="100%"
              width="31%"
              onPress={this.props.onPress}
            />
            <CustomButton
              fontSize={deviceWidth / 51}
              label="Cancel"
              topColor="#ffdc37"
              bottomColor="#997533"
              bgColor="#ffa400"
              height="100%"
              width="37%"
              onPress={this.props.onPress}
            />
          </View>
          <View
            style={{
              flex: 0.5,
              flexDirection: "row",
              marginTop: "2%",
              marginBottom: "2%",
              justifyContent: "space-between"
            }}
          >
            <CustomButton
              fontSize={deviceWidth / 51}
              label="Reply"
              topColor="#7dc836"
              bottomColor="#045000"
              bgColor="#499301"
              height="100%"
              width="31%"
              onPress={this.onreply}
            />
            <CustomButton
              fontSize={deviceWidth / 51}
              label="ZenMoji"
              topColor="#e6a34b"
              bottomColor="#803d1a"
              bgColor="#e63e00"
              height="100%"
              width="31%"
              onPress={this.zenImoji}
            />
            <CustomButton
              fontSize={deviceWidth / 51}
              label="Next"
              topColor="#ff9999"
              bottomColor="#df0000"
              bgColor="#f90f18"
              height="100%"
              width="37%"
              onPress={this.props.onPress}
            />
          </View>
        </View>

        {this.state.emojiVisible && (
          <Modal
            isVisible={this.state.emojiVisible}
            onBackdropPress={() => this.setState({ emojiVisible: false })}
            backdropOpacity={0.2}
          >
            <View style={[styles.main,{flexDirection:'row',flexWrap:'wrap'}]}>
              <TouchableOpacity
              activeOpacity={.9}
              onPress={() => this.onSend('happy')}
              >
                <Image
                  source={animatedHappyGif}
                  style={{ width: 50, height: 50 }}
                />
              </TouchableOpacity>
            </View>
          </Modal>
        )}
        {this.state.visibleIMMenu && (
          <Modal
            isVisible={this.state.visibleIMMenu}
            onBackdropPress={() => this.setState({ visibleIMMenu: false })}
            backdropOpacity={0.2}
          >
            <View style={styles.main}>
              <View
                style={[
                  {
                    flexDirection: "row",
                    width: "100%",
                    height: 60,
                    justifyContent: "space-between",
                    borderWidth: 2,
                    borderColor: "rgba(0,0,0,.2)",
                    borderRadius: 5
                  }
                ]}
              >
                <View style={{ flex: 0.15, marginRight: "2%" }}>
                  <Thumbnail
                    small
                    source={{ uri: item[this.state.chatIndex].image }}
                    style={{
                      width: deviceWidth / 23,
                      height: deviceWidth / 23
                    }}
                  />
                </View>
                <View
                  style={{
                    flex: 0.85
                  }}
                >
                  <View
                    style={{
                      backgroundColor: "#67bcff",
                      borderRadius: 6,
                      flex: 1,
                      paddingVertical: 5
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        paddingHorizontal: 6,
                        flex: 0.45
                      }}
                    >
                      <Text
                        style={{
                          fontSize: deviceWidth / 65,
                          fontWeight: "bold",
                          flex: 0.8
                        }}
                      >
                        {item[this.state.chatIndex].name}
                      </Text>
                      <Icon
                        type="FontAwesome"
                        name="circle"
                        style={{
                          color: item.onlineStatus ? "#39ff14" : "#b92e34",
                          fontSize: deviceWidth / 75,
                          flex: 0.2,
                          textAlign: "right",
                          marginHorizontal: 2
                        }}
                      />
                    </View>
                    <Text
                      style={{
                        paddingHorizontal: 6,
                        paddingBottom: 2,
                        fontSize: deviceWidth / 79,
                        fontWeight: "bold",
                        flex: 0.55
                      }}
                    >
                      {item[this.state.chatIndex].message}
                    </Text>
                  </View>
                </View>
              </View>
              <View>
                <View
                  style={{
                    width: "100%",
                    height: 40,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingBottom: 4
                  }}
                >
                  <View
                    style={{
                      flex: 0.15,
                      marginRight: "2%"
                    }}
                  >
                    <Thumbnail
                      small
                      source={
                        this.state.profile_picture
                          ? this.state.profile_picture
                          : defaultPic
                      }
                      style={{
                        width: deviceWidth / 23,
                        height: deviceWidth / 23
                      }}
                    />
                  </View>
                  <TextInput
                    onChangeText={message => this.setState({ message })}
                    style={{
                      flex: 0.85,
                      height: 40,
                      fontSize: 9,
                      fontWeight: "bold",
                      borderWidth: 2,
                      borderRadius: 6,
                      paddingHorizontal: 6
                    }}
                    multiline={true}
                    numberOfLines={3}
                  />
                </View>

                <CustomButton
                  fontSize={deviceWidth / 51}
                  label="Reply"
                  topColor="#ff9999"
                  bottomColor="#df0000"
                  bgColor="#f90f18"
                  height={40}
                  width="100%"
                  onPress={this.sendReply}
                />
              </View>
            </View>
          </Modal>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: "white",
    borderRadius: 5,
    width: "40%",
    height: "80%",
    paddingHorizontal: 5,
    paddingVertical: 10,
    justifyContent: "space-between"
  }
});

export default IMMenu;
