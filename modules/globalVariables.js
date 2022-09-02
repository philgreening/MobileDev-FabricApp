import { Dimensions } from "react-native";
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('fabricDB.db')

const screen = Dimensions.get('window');
const screenHeight = screen.height;
const screenWidth = screen.width;

const iconSize = Math.round(screenWidth * 0.082);
const largeIconSize = Math.round(screenWidth * 0.082);

export { screenHeight, screenWidth, db, iconSize }
