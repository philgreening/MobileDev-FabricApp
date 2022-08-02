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
  Image
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
  const [fabricObj, setFabricObj] = useState({
    name: '',
    imageUri: 'null',
  });
  const [imageUri, setImageUri] = useState("null");
  console.log(fabricObj);

  useEffect(() => {
      if (route.params?.photoUri) {
        console.log('succes: ', route);
        setFabricObj({ imageUri: route.params.photoUri });
      }
  }, [route.params?.photoUri]);
  console.log('imageUri: ', fabricObj.imageUri);


  const addFabric = (item) => {
    db.transaction((txn) => {
      txn.executeSql("INSERT INTO fabrics (name, image_uri) VALUES (?,?)", [item.name, item.imageUri]);
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Image
          style={styles.imageThumb}
          source={{
            uri: fabricObj.imageUri
          }}
        />

        <TextInput
          style={styles.inputBar}
          placeholder="Enter fabric name"
          onChangeText={(value)=> setFabricObj({...fabricObj, name: value})}
          value={fabricObj.name}
        />
        <Text> {fabricObj.name} </Text>

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
          addFabric(fabricObj), navigation.navigate("Home", { name: fabricObj.name });
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
  imageThumb: {
    width: '40%',
    height: '40%',
    borderRadius: 10
  }
});
