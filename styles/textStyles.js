import { StyleSheet } from "react-native";
import { screenHeight, screenWidth } from "../modules/globalVariables.js";

export const textStyles = StyleSheet.create({
  text: {
    fontFamily: "Karla-Regular",
    fontSize: Math.round(screenWidth * 0.04),
    color: "#00637f",
  },
  labelText:{
    fontFamily: 'Reikna-Regular',
    fontSize: Math.round(screenWidth * 0.07),
    color: "#00637f",
  },
  headerText:{
    fontFamily: 'Reikna-Regular',
    fontSize: Math.round(screenWidth * 0.1),
  },
  icon: {
    fontSize: Math.round(screenWidth * 0.082),
  },
  largeIcon: {
    fontSize: Math.round(screenWidth * 0.092),
  },
});
