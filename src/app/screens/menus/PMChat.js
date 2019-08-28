import React, { Component } from "react";
import { View, Text, FlatList } from "react-native";
import { Thumbnail, Icon } from "native-base";

class PMChat extends Component {
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
          height: this.props.height,
          flex: 1,
          paddingLeft: 4
        }}
      >
        <FlatList
          showsVerticalScrollIndicator={false}
          data={this.props.chatInfo}
          renderItem={({ index, item }) => (
            <View
              style={{
                flexDirection: "row",
                flex: 1,
                justifyContent: "space-between"
              }}
            >
              <View
                style={{
                  flex: 0.15,
                  marginRight: "2%"
                }}
              >
                <Thumbnail small source={{ uri: item.image }} />
              </View>
              <View
                style={{
                  flex: 0.75
                }}
              >
                <View
                  style={{
                    backgroundColor: this.getMessageItemColor(index),
                    borderTopLeftRadius: index ? 0 : 10,
                    borderTopRightRadius: index ? 0 : 10,
                    borderBottomLeftRadius:
                      index === this.props.chatInfo.length - 1 ? 10 : 0,
                    borderBottomRightRadius:
                      index === this.props.chatInfo.length - 1 ? 10 : 0,
                    borderTopWidth: index ? 0 : 2,
                    borderBottomWidth:
                      index === this.props.chatInfo.length - 1 ? 2 : 1,
                    borderLeftWidth: 2,
                    borderRightWidth: 2,
                    flex: 1
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
                        fontSize: 14,
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
                        fontSize: 10,
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
                      fontSize: 9,
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
    );
  }
}

export default PMChat;
