import React, { Component } from "react";
import {
  View,
  Text,
  Animated,
  ScrollView,
  TouchableOpacity
} from "react-native";

import * as CommonStyles from "./common/card-styles";
import { TouchableIcon } from "./TouchableIcon";
import { CardStatus } from "./common/card-status";

export class FlipCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isScrolling: false,
      showingFront: true
    };
  }
  componentWillMount() {
    this.animatedValue = new Animated.Value(0);
    this.value = 0;
    this.animatedValue.addListener(({ value }) => {
      this.value = value;
    });
    this.frontInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ["0deg", "180deg"]
    });
    this.backInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ["180deg", "360deg"]
    });
    this.frontOpacity = this.animatedValue.interpolate({
      inputRange: [89, 90],
      outputRange: [1, 0]
    });
    this.backOpacity = this.animatedValue.interpolate({
      inputRange: [89, 90],
      outputRange: [0, 1]
    });
  }

  flipCard = () => {
    this.setState({ showingFront: !this.state.showingFront });
    if (this.value >= 90) {
      Animated.spring(this.animatedValue, {
        toValue: 0,
        friction: 3,
        tension: 1
      }).start();
    } else {
      Animated.spring(this.animatedValue, {
        toValue: 180,
        friction: 3,
        tension: 1
      }).start();
    }
  };

  _renderGenericTextDescription(meanings) {
    if (meanings && meanings.length) {
      const meaningsJsx = [];
      let meaningCount = 0;
      for (const meaning of meanings) {
        meaningsJsx.push(
          <Text
            key={meaningCount.toString()}
            style={CommonStyles.styles.smallText}
          >
            {meaning}
          </Text>
        );
        meaningCount++;
      }
      return meaningsJsx;
    }
  }

  render() {
    const cardStyle = {
      transform: [
        {
          rotateY: this.state.showingFront
            ? this.frontInterpolate
            : this.backInterpolate
        }
      ],
      opacity: this.state.showingFront ? this.frontOpacity : this.backOpacity
    };
    const cardTitle = this.props.card.title;
    const cardMeanings = this.props.card.meanings;
    const cardSynonmys = this.props.card.synonyms;
    const cardStatus = this.props.card.status;
    let cardView = undefined;
    if (this.state.showingFront) {
      cardView = <Text style={CommonStyles.styles.text}>{cardTitle}</Text>;
    } else {
      cardView = (
        // <ScrollView style={{ paddingVertical: 20, paddingHorizontal: 10 }}>
        <View style={{ paddingVertical: 20, paddingHorizontal: 10 }}>
          {this._renderGenericTextDescription(cardMeanings)}
          {this._renderGenericTextDescription(cardSynonmys)}
        </View>
        //</ScrollView>
      );
    }

    let shuffleView = this.props.showShuffle ? (
      <TouchableIcon
        iconName="ios-shuffle"
        onPress={this.props.onShufflePress}
      />
    ) : (
      undefined
    );

    return (
      <Animated.View style={cardStyle}>
        <TouchableOpacity onPress={this.flipCard}>
          <View style={CommonStyles.styles.card}>
            <View style={{ justifyContent: "center", flex: 1 }}>
              {cardView}
            </View>
            <View
              style={{
                flexDirection: "row",
                alignSelf: "stretch",
                marginTop: 15,
                justifyContent: "flex-end"
              }}
            >
              <TouchableIcon iconName="ios-sync" onPress={this.flipCard} />

              <TouchableIcon
                style={[
                  cardStatus === CardStatus.STARRED
                    ? CommonStyles.styles.starredCardIcon
                    : []
                ]}
                iconName={
                  cardStatus === CardStatus.STARRED
                    ? "ios-star"
                    : "ios-star-outline"
                }
                onPress={() => {
                  if (!this.state.showingFront) {
                    this.flipCard();
                  }
                  this.props.onStarPress.call(this, cardStatus);
                }}
              />

              <TouchableIcon
                style={[
                  cardStatus === CardStatus.LEARNED
                    ? CommonStyles.styles.learnCardIcon
                    : []
                ]}
                iconName={`ios-checkmark-circle${
                  cardStatus !== CardStatus.LEARNED ? "-outline" : ""
                }`}
                onPress={() => {
                  if (!this.state.showingFront) {
                    this.flipCard();
                  }
                  this.props.onLearnPress.call(this, cardStatus);
                }}
              />
              {shuffleView}
            </View>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  }
}
