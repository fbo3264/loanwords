import React, { Component } from "react";
import { View, Text, Animated } from "react-native";

import { connect } from "react-redux";
import * as CommonStyles from "./common/card-styles";
import { FlipCard } from "./FlipCard";
import { CardStateActionMapper } from "../actions/CardStateActionMapper";

class CardsExplorer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showingFront: true
    };
  }

  componentWillMount() {
    this.props.loadRandomCard();
  }

  _handleStarPress = () => {
    this.props.starCard(this.props.currentRandomCard);
    this.props.loadRandomCard();
  };

  _handleLearnedPress = () => {
    this.props.learnCard(this.props.currentRandomCard);
    this.props.loadRandomCard();
  };

  render() {
    const { currentRandomCard } = this.props;
    if (!currentRandomCard) {
      return <Text style={CommonStyles.styles.text}>No cards left!</Text>;
    }
    return (
      <View style={CommonStyles.styles.container}>
        <View style={CommonStyles.styles.cardBox}>
          <FlipCard
            showShuffle="true"
            onShufflePress={this.props.loadRandomCard}
            onStarPress={this._handleStarPress}
            onLearnPress={this._handleLearnedPress}
            card={currentRandomCard}
          />
          <View />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

function mapDispatchToProps(dispatch) {
  return CardStateActionMapper.getDefaultMappings(dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardsExplorer);
