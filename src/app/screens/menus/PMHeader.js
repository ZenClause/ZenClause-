import React, { Component } from "react";
import { View, Text } from "react-native";
import { Thumbnail, Icon } from "native-base";

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
          <Thumbnail small source={{ uri: this.props.image }} />
        </View>

        <View
          style={{
            flex: 0.75,
            borderWidth: 2,
            borderRadius: 10,
            backgroundColor: "#fcbc30"
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingHorizontal: 6,
              padddingTop: 4,
              flexGrow: 0.45
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                flex: 0.8
              }}
            >
              {this.props.name}
            </Text>
            <Icon
              type="FontAwesome"
              name="circle"
              style={{
                color: this.props.onlineStatus ? "#39ff14" : "#b92e34",
                fontSize: 14,
                flex: 0.2,
                textAlign: "right",
                marginHorizontal: 2
              }}
            />
          </View>
          <View
            style={{
              paddingLeft: 8,
              flexGrow: 0.55,
              borderBottomEndRadius: 10
            }}
          >
            <Text
              style={{
                paddingBottom: 2,
                fontSize: 10,
                fontWeight: "bold"
              }}
            >
              {this.props.date}
            </Text>
            <Text
              style={{
                fontSize: 10,
                fontWeight: "bold"
              }}
            >
              {this.props.address}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

export default PMHeader;
