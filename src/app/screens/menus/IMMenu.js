import React, { Component } from "react";
import { View, Dimensions } from "react-native";
import CustomButton from "./CustomButton";
import Chat from "./Chat";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

class IMMenu extends Component {
  render() {
    return (
      <View
        style={{
          padding: 5,
          backgroundColor: "#818181",
          borderWidth: 2,
          borderRadius: 6,
          width: deviceWidth / 2.3,
          height: deviceWidth / 2.4
        }}
      >
        <View style={{ flex: 0.58 }}>
          <Chat chatInfo={this.props.chatInfo} />
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
              fontSize={14}
              label="Send"
              topColor="#39bcd6"
              bottomColor="#005fa6"
              bgColor="#0c8fd6"
              height="100%"
              width="31%"
              onPress={this.props.onPress}
            />
            <CustomButton
              fontSize={14}
              label="Username"
              topColor="#6cb2e2"
              bottomColor="#15397c"
              bgColor="#185fe2"
              height="100%"
              width="31%"
              onPress={this.props.onPress}
            />
            <CustomButton
              fontSize={14}
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
              justifyContent: "space-between"
            }}
          >
            <CustomButton
              fontSize={14}
              label="Reply"
              topColor="#7dc836"
              bottomColor="#045000"
              bgColor="#499301"
              height="100%"
              width="31%"
              onPress={this.props.onPress}
            />
            <CustomButton
              fontSize={14}
              label="ZenMoji"
              topColor="#e6a34b"
              bottomColor="#803d1a"
              bgColor="#e63e00"
              height="100%"
              width="31%"
              onPress={this.props.onPress}
            />
            <CustomButton
              fontSize={14}
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
      </View>
    );
  }
}

export default IMMenu;
