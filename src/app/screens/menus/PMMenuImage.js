import React, { Component } from "react";
import { Image, Dimensions, View } from "react-native";

const deviceWidth = Dimensions.get("window").width;

import { images } from "../../../utils/images";

class PMMenuImage extends Component {
  render() {
    const image =
      this.props.url !== undefined
        ? { uri: this.props.url }
        : images.default_picture;

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
          source={image}
          resizeMode="cover"
        />
      </View>
    );
  }
}

export default PMMenuImage;
