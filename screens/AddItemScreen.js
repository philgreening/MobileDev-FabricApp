import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Button,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Cell, Section, TableView } from "react-native-tableview-simple";
import React, { useState, useRef, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Camera } from "expo-camera";

import * as SQLite from "expo-sqlite";

import HomeScreen from "./HomeScreen";
// import * as FB from '../modules/getData';

const db = SQLite.openDatabase("fabricDB.db");

export default function AddItemScreen({ navigation, route }) {
  const [fabName, setFabName] = useState("");
  const [imageUri, setImageUri] = useState("");

  useEffect(() => {
      if (route.params?.photoUri) {
        console.log('succes: ', route);
        setImageUri(route.params.photoUri);
        console.log('imageUri: ', imageUri);
      }
  }, [route.params?.photoUri]);

  const addFabric = (item) => {
    db.transaction((txn) => {
      txn.executeSql("INSERT INTO fabrics (name) VALUES (?)", [item]);
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <TextInput
          style={styles.inputBar}
          placeholder="Enter fabric name"
          onChangeText={setFabName}
          value={fabName}
        />
        <Text> {fabName} </Text>

        <TouchableOpacity
          style={{
            width: 130,
            borderRadius: 4,
            backgroundColor: "#14274e",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            height: 40,
          }}
          onPress={() => {
            navigation.navigate("Camera");
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Take picture
          </Text>
        </TouchableOpacity>
      </View>
      <Button
        title="Add Fabric"
        onPress={() => {
          addFabric(fabName), navigation.navigate("Home", { name: fabName });
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: "5%",
    backgroundColor: "#fff",
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  inputBar: {
    borderWidth: 2,
    borderColor: "black",
    margin: "5%",
    padding: "3%",
  },
});
