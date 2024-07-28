import { Dimensions } from "react-native";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("fabricDB.db");

const screen = Dimensions.get("window");
const screenHeight = screen.height;
const screenWidth = screen.width;

export { screenHeight, screenWidth, db };
