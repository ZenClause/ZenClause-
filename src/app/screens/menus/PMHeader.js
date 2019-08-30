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
              flexGrow: 0.3
            }}
          >
            <Text
              style={{
                fontSize: deviceWidth / 59,
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
                fontSize: deviceWidth / 67,
                flex: 0.2,
                textAlign: "right",
                marginHorizontal: 2
              }}
            />
          </View>
          <View
            style={{
              paddingLeft: 6,
              flexGrow: 0.7,
              borderBottomEndRadius: 4
            }}
          >
            <Text
              style={{
                paddingBottom: 1,
                fontSize: deviceWidth / 81,
                fontWeight: "bold"
              }}
            >
              {this.props.date}
            </Text>
            <Text
              style={{
                fontSize: deviceWidth / 81,
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
