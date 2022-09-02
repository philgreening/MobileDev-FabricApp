import { StyleSheet } from "react-native";
import { screenHeight, screenWidth } from "../modules/globalVariables.js";

export const itemStyles = StyleSheet.create({
  row: {
    margin: "5%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  imageThumb: {
    flex: 2,
    backgroundColor: "#e4c2ca",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  cardViewContainer: {
    width: "50%",
    padding: "2%",
    backgroundColor: "#fff",
  },
  cardContainer: {
    height: screenHeight / 5,
    backgroundColor: "#00637f",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderRadius: 20,
  },
  cardText: {
    paddingVertical: "2%",
    paddingHorizontal: "5%",
    alignSelf: "center",
    color: "#e4c2ca",
    fontSize: Math.round(screenWidth * 0.04),
    fontFamily: "Karla-Regular",
  },
});
