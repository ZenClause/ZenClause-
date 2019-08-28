import React, { Component } from "react";
import { View, Text, TouchableWithoutFeedback } from "react-native";

class CustomButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topColor: props.topColor,
      bottomColor: props.bottomColor
    };
  }

  handlePressIn() {
    this.setState({
      topColor: this.props.bottomColor,
      bottomColor: this.props.topColor
    });
  }

  handlePressOut() {
    this.setState({
      topColor: this.props.topColor,
      bottomColor: this.props.bottomColor
    });
  }

  render() {
    return (
      <TouchableWithoutFeedback
        onPressIn={() => this.handlePressIn()}
        onPressOut={() => this.handlePressOut()}
        onPress={() => this.props.onPress(this.props.label.toLowerCase())}
      >
        <View
          style={{
            width: this.props.width,
            height: this.props.height,
            backgroundColor: this.props.bgColor,
            borderColor: "#000",
            borderWidth: 2,
            borderRadius: 4
          }}
        >
          <View
            style={{
              width: "100%",
              height: 2,
              backgroundColor: this.state.topColor
            }}
          />
          <View
            style={{
              flex: 2,
              flexDirection: "row",
              justifyContent: "space-between"
            }}
          >
            <View
              style={{
                alignSelf: "flex-start",
                width: 2,
                height: "100%",
                backgroundColor: this.state.topColor
              }}
            />
            <Text
              style={{
                alignSelf: "center",
                color: "#000",
                fontSize: this.props.fontSize,
                fontWeight: "bold"
              }}
            >
              {this.props.label.toUpperCase()}
            </Text>
            <View
              style={{
                alignSelf: "flex-end",
                width: 2,
                height: "100%",
                backgroundColor: this.state.bottomColor
              }}
            />
          </View>
          <View
            style={{
              width: "100%",
              height: 2,
              backgroundColor: this.state.bottomColor
            }}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default CustomButton;
