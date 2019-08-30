import React, { Component } from "react";
import { View, Dimensions } from "react-native";
import CustomButton from "./CustomButton";

const deviceWidth = Dimensions.get("window").width;

class HouseMenu extends Component {
  render() {
    return (
      <View
        style={{
          padding: 5,
          backgroundColor: "#818181",
          borderWidth: 2,
          borderRadius: 6,
          width: deviceWidth / 2.8,
          height: deviceWidth / 2.8
        }}
      >
        <View style={{ flex: 0.65 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              flex: 0.5
            }}
          >
            <CustomButton
              fontSize={deviceWidth / 40}
              label="Invite"
              topColor="#39bcd6"
              bottomColor="#005fa6"
              bgColor="#0c8fd6"
              width="49%"
              onPress={this.props.onPress}
            />
            <CustomButton
              fontSize={deviceWidth / 40}
              label="Move"
              topColor="#6cb2e2"
              bottomColor="#15397c"
              bgColor="#185fe2"
              width="49%"
              onPress={this.props.onPress}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              flex: 0.5,
              marginTop: "2%"
            }}
          >
            <CustomButton
              fontSize={deviceWidth / 40}
              label="Delete"
              topColor="#7dc836"
              bottomColor="#045000"
              bgColor="#499301"
              width="49%"
              onPress={this.props.onPress}
            />
            <CustomButton
              fontSize={deviceWidth / 40}
              label="Add"
              topColor="#e6a34b"
              bottomColor="#803d1a"
              bgColor="#e63e00"
              width="49%"
              onPress={this.props.onPress}
            />
          </View>
        </View>
        <View style={{ flex: 0.35, marginTop: "2%", marginBottom: "1.5%" }}>
          <View
            style={{
              flex: 0.5
            }}
          >
            <CustomButton
              fontSize={deviceWidth / 40}
              label="Cancel"
              topColor="#ffdc37"
              bottomColor="#997533"
              bgColor="#ffa400"
              height="100%"
              width="100%"
              onPress={this.props.onPress}
            />
          </View>
          <View style={{ marginTop: "2%", flex: 0.5 }}>
            <CustomButton
              fontSize={deviceWidth / 40}
              label="Next"
              topColor="#ff9999"
              bottomColor="#df0000"
              bgColor="#f90f18"
              height="100%"
              width="100%"
              onPress={this.props.onPress}
            />
          </View>
        </View>
      </View>
    );
  }
}

export default HouseMenu;
