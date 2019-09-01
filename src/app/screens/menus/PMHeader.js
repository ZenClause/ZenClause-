import React, { Component } from "react";
import { View, Text, Dimensions } from "react-native";
import { Thumbnail, Icon } from "native-base";

const deviceWidth = Dimensions.get("window").width;

class PMHeader extends Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          paddingLeft: 4,
          flexDirection: "row",
          justifyContent: "space-between"
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
            source={{ uri: this.props.image }}
            style={{ width: deviceWidth / 20, height: deviceWidth / 20 }}
          />
        </View>

        <View
          style={{
            flex: 0.75,
            borderWidth: 2,
            borderRadius: 4,
            backgroundColor: "#fcbc30",
            paddingTop: 2
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-start",
              paddingRight: 6,
              paddingLeft: 4
            }}
          >
            <View
              style={{
                flexDirection: "column",
                flex: 0.8
              }}
            >
              <Text
                style={{
                  fontSize: deviceWidth / 59,
                  fontWeight: "bold"
                }}
              >
                {this.props.name}
              </Text>
              <Text
                style={{
                  fontSize: deviceWidth / 99,
                  fontWeight: "bold",
                  lineHeight: deviceWidth / 99
                }}
              >
                {this.props.date}
              </Text>
              <Text
                style={{
                  fontSize: deviceWidth / 85,
                  fontWeight: "bold",
                  lineHeight: deviceWidth / 90
                }}
              >
                {this.props.address}
              </Text>
            </View>
            <Icon
              type="FontAwesome"
              name="circle"
              style={{
                color: this.props.onlineStatus ? "#39ff14" : "#b92e34",
                fontSize: deviceWidth / 63,
                flex: 0.2,
                textAlign: "right",
                marginHorizontal: 2
              }}
            />
          </View>
        </View>
      </View>
    );
  }
}

export default PMHeader;
