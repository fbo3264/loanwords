import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  TouchableHighlight,
  Text,
  Animated,
  ScrollView
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import * as CommonStyles from "./common/card-styles";

export class TestComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pressed: false
    };
  }

  render() {
    const { style } = this.props;
    return (
      <TouchableHighlight
        style={[CommonStyles.styles.iconCardStyle]}
        onPress={this.props.onPress}
      >
        <Ionicons style={style} size={30} name={this.props.iconName} />
      </TouchableHighlight>
    );
  }
}
