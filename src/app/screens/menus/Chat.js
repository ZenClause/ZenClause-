import React, { Component, PureComponent } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  Dimensions,
  ToastAndroid,
  TouchableOpacity,
  Image
} from "react-native";
import { Thumbnail, Icon } from "native-base";
import firebase from "firebase";
import moment from "moment";
import HappyGif from "../../../../assets/images/emojis/Happy.gif";
import LovevGif from "../../../../assets/images/emojis/Love.gif";
import SadGif from "../../../../assets/images/emojis/Sad.gif";
import SmileyGif from "../../../../assets/images/emojis/Smile.gif";
import TearGif from "../../../../assets/images/emojis/Tear.gif";
import WinkGif from "../../../../assets/images/emojis/Wink.gif";

const today = moment().format();
const deviceWidth = Dimensions.get("window").width;
const defaultPic = {
  uri:
    "https://content-static.upwork.com/uploads/2014/10/02123010/profilephoto_goodcrop.jpg"
};

const emojis = {
  'Happy': HappyGif,
  'Love': LovevGif,
  'Sad': SadGif,
  'Smile': SmileyGif,
  'Tear': TearGif,
  'Wink': WinkGif
};

class Chat extends PureComponent {
  getMessageItemColor(index) {
    index += 4;
    switch (index % 4) {
      case 0:
        return "#67bcff";
      case 1:
        return "#f9622d";
      case 2:
        return "#a2b224";
      default:
        return "#fcbc30";
    }
  }

  state = {
    messages: [],
    msgId: "",
    user: {},
    message: "",
    selected: -1
  };

  sendIM = async (uid, neighborID, msgId, user, emoji) => {
    let { message } = this.state;
    const imgProfile = this.props.profile_picture
      ? this.props.profile_picture
      : defaultPic;
    let msgRef;
    try {
      const newMsgId = firebase.database().ref("message-list/" + neighborID);
      // .child(neighborID);

      if (msgId) {
        msgRef = firebase.database().ref("/message-list/" + msgId);
      } else {
        msgRef = firebase.database().ref("/message-list/" + neighborID);
      }

      await msgRef
        .update({
          updatedAt: today,
          user1: uid,
          user2: neighborID,
          createdAt: today
        })
        .then(() => {
          ToastAndroid.show("Sending message...!", ToastAndroid.SHORT);
        });
      let pushedData;
      if (emoji) {
        pushedData = {
          emoji,
          message: message,
          uid,
          image: imgProfile.uri,
          name: user.userName,
          createdAt: today
        };
      } else {
        pushedData = {
          message: message,
          uid,
          image: imgProfile.uri,
          name: user.userName,
          createdAt: today
        };
      }

      msgRef
        .child("/messages")
        .push(pushedData)
        .then(() => {
          ToastAndroid.show("Message sent...!", ToastAndroid.SHORT);
          // this.getMsg()
          this.setState({ message: "" });

          // this.props.onSendIM()

          // firebase
          //   .database()
          //   .ref("/neighborhood/" + neighborID)
          //   .once("value", snap => {
          //     let value = snap.val();
          //     if (value) {
          //       if (value.message) {
          //         if (value.messages.indexOf(neighborID) === -1) {
          //           value.messages.push(neighborID);
          //           firebase
          //             .database()
          //             .ref("/neighborhood/" + neighborID)
          //             .update({
          //               whoSeen: []
          //             });
          //         }
          //       } else {
          //         firebase
          //           .database()
          //           .ref("/neighborhood/" + neighborID)
          //           .update({
          //             whoSeen: []
          //           });
          //       }
          //     }
          //   });
        })
        .catch(e => {
          ToastAndroid.show("Something wrong...!", ToastAndroid.SHORT);
          // this.props.onSendIM()
        });

      try {
        await firebase
          .database()
          .ref("/neighborhood/" + neighborID)
          .update({
            whoSeen: { 0: uid },
            lastMsg: message
          });
      } catch (error) {
        alert(error);
      }
    } catch (error) {
      alert(error);
    }

    // this.props.onSendIM(this.state.message)
  };

  sendReply = async (
    msgId,
    user,
    uid,
    neighborID,
    message,
    replyMsgId,
    replyToUser
  ) => {
    const imgProfile = this.props.profile_picture
      ? this.props.profile_picture
      : defaultPic;
    let msgRef;
    try {
      const newMsgId = firebase.database().ref("message-list/" + neighborID);
      // .child(neighborID);

      if (msgId) {
        msgRef = firebase.database().ref("/message-list/" + msgId);
      } else {
        msgRef = firebase.database().ref("/message-list/" + neighborID);
      }

      await msgRef
        .update({
          updatedAt: today,
          user1: uid,
          user2: neighborID,
          createdAt: today
        })
        .then(() => {
          ToastAndroid.show("Sending message...!", ToastAndroid.SHORT);
        });

      msgRef
        .child("/messages")
        .push({
          message: message,
          uid,
          image: imgProfile.uri,
          name: user.userName,
          createdAt: today,
          replyTo: replyMsgId,
          replyToUser
        })
        .then(() => {
          ToastAndroid.show("Message sent...!", ToastAndroid.SHORT);
          // this.getMsg()
          this.setState({ message: "" });

          // this.props.onSendIM()

          // firebase
          //   .database()
          //   .ref("/neighborhood/" + neighborID)
          //   .once("value", snap => {
          //     let value = snap.val();
          //     if (value) {
          //       if (value.message) {
          //         if (value.messages.indexOf(neighborID) === -1) {
          //           value.messages.push(neighborID);
          //           firebase
          //             .database()
          //             .ref("/neighborhood/" + neighborID)
          //             .update({
          //               whoSeen: []
          //             });
          //         }
          //       } else {
          //         firebase
          //           .database()
          //           .ref("/neighborhood/" + neighborID)
          //           .update({
          //             whoSeen: []
          //           });
          //       }
          //     }
          //   });
        })
        .catch(e => {
          ToastAndroid.show("Something wrong...!", ToastAndroid.SHORT);
          // this.props.onSendIM()
        });

      try {
        await firebase
          .database()
          .ref("/neighborhood/" + neighborID)
          .update({
            whoSeen: { 0: uid },
            lastMsg: message
          });
      } catch (error) {
        alert(error);
      }
    } catch (error) {
      alert(error);
    }
  };
  setSelected = selected => {
    this.setState({ selected });
  };

  selectNext = () => {
    const { selected } = this.state;
    const messageCount = this.props.chatInfo.length;

    if (selected && selected < (messageCount - 1)) {
      const newIndex = selected + 1;
      this.setState({ selected: newIndex });
      this.flatListRef.scrollToIndex({ animated: true, index: newIndex });
    }
  }

  onReply = () => {
    return this.state.selected;
  };



  releaseSelected = (index, item) => {
    if (item.replyToUser) {
      const { msgIds, chatInfo } = this.props;
      const indexGetting = msgIds.indexOf(item.replyTo)
      this.flatListRef.scrollToIndex({ animated: true, index: indexGetting });
    }
    if (this.state.selected != -1) {
      this.setState({ selected: -1 });
    }
  };
  flatListRef = null;
  flatListRefSet = r => (this.flatListRef = r);
  render() {
    return (
      <View
        style={{
          backgroundColor: "#000",
          borderWidth: 2,
          borderColor: "#000",
          borderRadius: 10,
          flex: 1,
          padding: 4,
          paddingHorizontal: 8,
          justifyContent: "space-between"
        }}
      >
        <View style={{ flex: 0.8 }}>
          <FlatList
            ref={this.flatListRefSet}
            onContentSizeChange={() => this.state.selected === -1 ? this.flatListRef.scrollToEnd({ animated: true }) : null}
            onLayout={() => this.state.selected === -1 ? this.flatListRef.scrollToEnd({ animated: true }) : null}
            showsVerticalScrollIndicator={false}
            data={this.props.chatInfo}
            extraData={this.state.selected}
            renderItem={({ index, item }) => {
              return (
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => this.releaseSelected(index, item)}
                  onLongPress={() => this.setSelected(index)}
                  style={[
                    {
                      flexDirection: "row",
                      flex: 1,
                      justifyContent: "space-between",
                      borderWidth: 2
                    },
                    this.state.selected == index && {
                      backgroundColor: "rgba(255,255,255,.4)"
                    }
                  ]}
                >
                  <View style={{ flex: 0.15, marginRight: "2%" }}>
                    <Thumbnail
                      small
                      source={{ uri: item.image }}
                      style={{
                        width: deviceWidth / 23,
                        height: deviceWidth / 23
                      }}
                    />
                  </View>
                  <View
                    style={{
                      borderBottomWidth: 1,
                      borderBottomColor: "#000",
                      flex: 0.85
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: this.getMessageItemColor(index),
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
                          {item.name}
                        </Text>
                        {item.replyToUser && (
                          <View
                            style={{
                              flexDirection: "row",
                              position: "absolute",
                              right: 20,
                              top: 0,

                              justifyContent: "center",
                              alignItems: "center"
                            }}
                          >
                            <Icon
                              type="FontAwesome"
                              name="reply"
                              style={{
                                color: "#fff",
                                fontSize: deviceWidth / 75,
                                flex: 0.2,
                                textAlign: "right",
                                marginHorizontal: 2
                              }}
                            />

                            <Text
                              style={{
                                fontSize: deviceWidth / 65,
                                fontWeight: "bold",
                                flex: 0.8,
                                color: "#fff"
                              }}
                            >
                              {item.replyToUser}
                            </Text>
                          </View>
                        )}
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
                      {item.emoji && (
                        <Image
                          source={emojis[item.emoji]}
                          style={{ width: 50, height: 50 }}
                        />
                      )}
                      <Text
                        style={{
                          paddingHorizontal: 6,
                          paddingBottom: 2,
                          fontSize: deviceWidth / 79,
                          fontWeight: "bold",
                          flex: 0.55
                        }}
                      >
                        {item.message}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
            keyExtractor={(item, index) => item.name}
          />
        </View>
        <View
          style={{
            flex: 0.2,
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
                this.props.profile_picture
                  ? this.props.profile_picture
                  : defaultPic
              }
              style={{ width: deviceWidth / 23, height: deviceWidth / 23 }}
            />
          </View>
          <TextInput
            onChangeText={message => this.setState({ message })}
            style={{
              flex: 0.85,
              fontSize: 18,
              fontWeight: "bold",
              borderWidth: 2,
              borderRadius: 6,
              backgroundColor: this.getMessageItemColor(
                this.props.chatInfo ? this.props.chatInfo.length : 0
              ),
              paddingHorizontal: 6
            }}
            multiline={true}
            numberOfLines={3}
          />
        </View>
      </View>
    );
  }
}

export default Chat;
