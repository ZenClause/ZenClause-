import React, { Component } from "react";
import { View, Dimensions } from "react-native";
import CustomButton from "./CustomButton";
import PMChat from "./PMChat";
import PMMenuImage from "./PMMenuImage";
import PMHeader from "./PMHeader";

const deviceWidth = Dimensions.get("window").width;

class PMMenu extends Component {
  render() {
    return (
      <View
        style={{
          padding: 5,
          backgroundColor: "#818181",
          borderWidth: 2,
          borderRadius: 6,
          width: deviceWidth / 1.9,
          height: deviceWidth / 2.1
        }}
      >
        <View style={{ flexDirection: "row", flex: 0.65, marginBottom: 4 }}>
          <View
            style={{
              flex: 0.55
            }}
          >
            <PMMenuImage url={this.props.picture} />
          </View>
          <View style={{ flexDirection: "column", flex: 0.45 }}>
            <View style={{ flex: 0.35, marginBottom: 4 }}>
              <PMHeader
                name={this.props.headerName}
                date={this.props.headerDate}
                onlineStatus={this.props.headerOnlineStatus}
                address={this.props.headerAddress}
                image={this.props.userPic}
              />
            </View>
            <View style={{ flex: 0.65 }}>
              <PMChat
                chatInfo={this.props.chatInfo}
                height={deviceWidth / 1.9}
              />
            </View>
          </View>
        </View>
        <View style={{ flex: 0.35 }}>
          <View
            style={{
              marginTop: 3,
              flexDirection: "row",
              justifyContent: "space-between",
              flex: 1
            }}
          >
            <CustomButton
              fontSize={17}
              label="Invite"
              topColor="#39bcd6"
              bottomColor="#005fa6"
              bgColor="#0c8fd6"
              height="100%"
              width="29%"
              onPress={this.props.onPress}
            />
            <CustomButton
              fontSize={17}
              label="Like"
              topColor="#6cb2e2"
              bottomColor="#15397c"
              bgColor="#185fe2"
              height="100%"
              width="29%"
              onPress={this.props.onPress}
            />
            <CustomButton
              fontSize={17}
              label="Cancel"
              topColor="#ffdc37"
              bottomColor="#997533"
              bgColor="#ffa400"
              height="100%"
              width="39%"
              onPress={this.props.onPress}
            />
          </View>
          <View
            style={{
              marginTop: 3,
              flexDirection: "row",
              justifyContent: "space-between",
              flex: 1
            }}
          >
            <CustomButton
              fontSize={17}
              label="Delete"
              topColor="#7dc836"
              bottomColor="#045000"
              bgColor="#499301"
              height="100%"
              width="29%"
              onPress={this.props.onPress}
            />
            <CustomButton
              fontSize={17}
              label="Add"
              topColor="#e6a34b"
              bottomColor="#803d1a"
              bgColor="#e63e00"
              height="100%"
              width="29%"
              onPress={this.props.onPress}
            />
            <CustomButton
              fontSize={17}
              label="Next"
              topColor="#ff9999"
              bottomColor="#df0000"
              bgColor="#f90f18"
              height="100%"
              width="39%"
              onPress={this.props.onPress}
            />
          </View>
        </View>
      </View>
    );
  }
}

export default PMMenu;
