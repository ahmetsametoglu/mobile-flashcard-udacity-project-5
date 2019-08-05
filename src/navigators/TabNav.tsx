import React from "react";
import { Platform } from "react-native";
import {
  createBottomTabNavigator,
  createAppContainer,
  createMaterialTopTabNavigator
} from "react-navigation";
import { FontAwesome, Ionicons } from "@expo/vector-icons";

import Decks from "../screens/Decks";
import AddDeck from "../screens/AddDeck";
import { Colors } from "../utils/color";

const router = {
  Decks: {
    screen: Decks,
    navigationOptions: {
      tabBarLabel: "Decks",
      tabBarIcon: ({ tintColor }) => (
        <Ionicons name="ios-bookmarks" size={30} color={tintColor} />
      )
    }
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: "Add Deck",
      tabBarIcon: ({ tintColor }) => (
        <FontAwesome name="plus-square" size={30} color={tintColor} />
      )
    }
  }
};

const navigationOptions = {
  tabBarOptions: {
    activeTintColor: Colors.primaryColor,
    inactiveTintColor: Colors.grey,
    indicatorStyle: {
      backgroundColor: Colors.darkgoldenrod
    },
    style: {
      padding: 10,
      height: Platform.OS === "ios" ? 60 : "auto",
      backgroundColor: Colors.white,
      fontSize: 18,
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
};

const TabNav =
  Platform.OS === "ios"
    ? createBottomTabNavigator(router, navigationOptions)
    : createMaterialTopTabNavigator(router, navigationOptions);

export default createAppContainer(TabNav);
