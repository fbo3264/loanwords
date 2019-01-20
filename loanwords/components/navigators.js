// Navigators
import {
  createDrawerNavigator,
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import React, { Component } from "react";

import Ionicons from "react-native-vector-icons/Ionicons";

// StackNavigator screens
import ItemList from "./ItemList";
import Item from "./Item";

// TabNavigator screens
import Settings from "./Settings";
import CardsExplorer from "./CardsExplorer";
import LearnedCards from "./LearnedCards";
import StarredCards from "./StarredCards";

export const OverviewNavigator = createStackNavigator(
  {
    OverviewItemList: {
      screen: ItemList
    },
    CardsExplorer: { screen: CardsExplorer },
    LearnedCards: { screen: LearnedCards },
    StarredCards: { screen: StarredCards }
  },
  {
    initialRouteName: "OverviewItemList"
  }
);

export const RootNavigator = createBottomTabNavigator(
  {
    Start: { screen: OverviewNavigator },
    Settings: { screen: Settings }
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === "Settings") {
          iconName = `ios-options${focused ? "" : "-outline"}`;
        } else if (routeName === "Start") {
          iconName = `ios-archive${focused ? "" : "-outline"}`;
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return (
          <Ionicons
            name={iconName}
            size={horizontal ? 25 : 30}
            color={tintColor}
          />
        );
      }
    }),
    order: ["Start", "Settings"]
  }
);
