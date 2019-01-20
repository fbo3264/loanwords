import React, { Component } from "react";
import { View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

export class CardController extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { style } = this.props;
    return (
      <View style={{ backgroundColor: "red" }}>
        <Ionicons style={style} size={30} name={this.props.iconName} />
      </View>
    );
  }
}
