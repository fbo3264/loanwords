import { StyleSheet, Platform } from "react-native";
import {
  lightGreen,
  white,
  brown,
  lightgrey,
  warmOrange,
  purple
} from "./colors";

export const styles = StyleSheet.create({
  resultContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    padding: 40,
    backgroundColor: lightgrey
  },
  resultText: {
    textAlign: "center",
    fontSize: 30,
    color: brown,
    marginBottom: 20
  },
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    padding: 20,
    backgroundColor: lightgrey
  },
  cardBox: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center"
  },
  cardBack: {
    position: "absolute",
    alignSelf: "center"
  },
  card: {
    backgroundColor: white,

    minHeight: 400,
    borderRadius: Platform.OS === "ios" ? 16 : 2,
    paddingHorizontal: 10,
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: "rgba(0, 0, 0, 0.24)",
    shadowOffset: {
      width: 0,
      height: 3
    }
  },
  iconCardStyle: {
    marginRight: 10,
    marginLeft: 5
  },
  starredCardIcon: {
    color: warmOrange
  },
  learnCardIcon: {
    color: lightGreen
  },
  text: {
    fontSize: 30,
    color: brown,
    textAlign: "center"
  },
  smallText: {
    fontSize: 20,
    color: brown,
    textAlign: "left"
  }
});
