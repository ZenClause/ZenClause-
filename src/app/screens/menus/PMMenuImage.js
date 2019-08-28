import React, { Component } from "react";
import { Image, Dimensions, View } from "react-native";

const deviceWidth = Dimensions.get("window").width;

class PMMenuImage extends Component {
  render() {
    return (
      <View
        style={{
          borderWidth: 3,
          borderColor: "#000",
          borderRadius: 10,
          flex: 1
        }}
      >
        <Image
          style={{
            height: "100%",
            width: "100%",
            borderRadius: 10
          }}
          source={{ uri: this.props.url }}
          resizeMode="cover"
        />
      </View>
    );
  }
}

export default PMMenuImage;
