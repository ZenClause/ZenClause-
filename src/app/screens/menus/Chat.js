import React, { Component } from "react";
import { View, Text, FlatList, TextInput, Dimensions } from "react-native";
import { Thumbnail, Icon } from "native-base";

const deviceWidth = Dimensions.get("window").width;

class Chat extends Component {
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
            showsVerticalScrollIndicator={false}
            data={this.props.chatInfo}
            renderItem={({ index, item }) => (
              <View
                style={{
                  flexDirection: "row",
                  flex: 1,
                  justifyContent: "space-between",
                  borderWidth: 2
                }}
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
                      {item.message}
                    </Text>
                  </View>
                </View>
              </View>
            )}
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
              source={{
                uri:
                  "https://content-static.upwork.com/uploads/2014/10/02123010/profilephoto_goodcrop.jpg"
              }}
              style={{ width: deviceWidth / 23, height: deviceWidth / 23 }}
            />
          </View>
          <TextInput
            style={{
              flex: 0.85,
              fontSize: 9,
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
