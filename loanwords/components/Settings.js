import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { TouchableIcon } from "./TouchableIcon";
import { saveCurrentCardsState } from "../utils/helpers";

class Settings extends Component {
  static navigationOptions = ({ navigation }) => ({
    // TODO: use labels to get language depending title
  });

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Settings</Text>
        <TouchableIcon
          onPress={() => saveCurrentCardsState(this.props.cardsState)}
          iconName="ios-swap"
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return { cardsState: state };
};

export default connect(mapStateToProps)(Settings);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#8e44ad",
    padding: 20
  },
  text: {
    color: "white",
    fontSize: 40,
    fontWeight: "bold"
  }
});
