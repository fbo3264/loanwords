import React, { Component } from "react";
import { FlatList, View, Text } from "react-native";
import { connect } from "react-redux";
import * as CommonStyles from "./common/card-styles";
import { FlipCard } from "./FlipCard";
import { CardStateActionMapper } from "../actions/CardStateActionMapper";

class StarredCards extends Component {
  _renderItem = ({ item }) => {
    return (
      <View style={CommonStyles.styles.container}>
        <View style={CommonStyles.styles.cardBox}>
          <FlipCard
            onLearnPress={this._handleLearnPress.bind(this, item)}
            onStarPress={this._handleStarPress.bind(this, item)}
            card={item}
          />
          <View />
        </View>
      </View>
    );
  };
  _keyExtractor = item => item.id;

  _handleStarPress = card => {
    this.props.starCard(card);
  };

  _handleLearnPress = card => {
    this.props.learnCard(card);
  };

  render() {
    if (this.props.starredCards && this.props.starredCards.length) {
      return (
        <FlatList
          data={this.props.starredCards}
          renderItem={this._renderItem}
          keyExtractor={this._keyExtractor}
        />
      );
    } else {
      return (
        <View>
          <Text>Du hast dieser Kategorie noch keine Karten hinzugefügt!</Text>;
        </View>
      );
    }
  }
}

const mapStateToProps = state => {
  return { starredCards: state.starredCards };
};

function mapDispatchToProps(dispatch) {
  return CardStateActionMapper.getDefaultMappings(dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StarredCards);
