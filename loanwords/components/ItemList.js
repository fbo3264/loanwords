import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

class ItemList extends Component {
  static navigationOptions = {
    header: null
  };

  renderItem = (item, i) => {
    return (
      <TouchableOpacity
        key={i}
        style={styles.item}
        onPress={() =>
          this.props.navigation.navigate("OverviewItem", { title: item.name })
        }
      >
        <Text style={styles.itemText}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Smartacus</Text>
        <TouchableOpacity
          style={styles.item}
          onPress={() => this.props.navigation.navigate("CardsExplorer", {})}
        >
          <Text style={styles.itemText}>Neue Begriffe entdecken</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.item}
          onPress={() => this.props.navigation.navigate("StarredCards", {})}
        >
          <Text style={styles.itemText}>Vorgemerkte Begriffe</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.item}
          onPress={() => this.props.navigation.navigate("LearnedCards", {})}
        >
          <Text style={styles.itemText}>Bereits gelernte Begriffe</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default ItemList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2980b9",
    padding: 20
  },
  text: {
    color: "white",
    fontSize: 40,
    fontWeight: "bold"
  },
  item: {
    padding: 10
  },
  itemText: {
    color: "white",
    fontSize: 20
  }
});
