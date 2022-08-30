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
  Image,
  //Dimensions
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Cell, Section, TableView } from "react-native-tableview-simple";
import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { screenWidth, screenHeight, db } from "../modules/globalVariables.js";
import { MaterialIcons } from '@expo/vector-icons';

import { itemStyles } from '../styles/itemStyles';
import { headerStyles } from '../styles/headerStyles';
import { textStyles } from '../styles/textStyles';

//https://openbase.com/js/react-native-sqlite-2/documentation
db.transaction((txn) => {
  // txn.executeSql('DROP TABLE IF EXISTS fabrics', [])
  txn.executeSql(
    "CREATE TABLE IF NOT EXISTS fabrics(id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(30) NOT NULL, image_uri TEXT, colour VARCHAR(30), woven_knit BOOLEAN, type VARCHAR(30), width FLOAT, length_pur FLOAT, length_rem FLOAT, date_pur TEXT, cost FLOAT, project VARCHAR(255))",
    []
  );
});

export default function HomeScreen({ navigation, route }) {
  const [fabricData, setFabricData] = useState([]);

  let dataArray = [];

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
        onPress={() => navigation.navigate("Add fabric")}
        style = {headerStyles.headerRight}
        >
        <MaterialIcons name="add-circle-outline" size={32} color="#e4c2ca"
        />
        </TouchableOpacity>
      ),
    });
  });

  console.log("fabric db data: " + getFabric);

  useEffect(() => {
    getFabric();
    console.log("len: " + fabricData.length);
  }, [route]);

  const getFabric = () => {
    db.transaction((txn) => {
      txn.executeSql("SELECT * FROM `fabrics`", [], (tx, res) => {
        for (let i = 0; i < res.rows.length; ++i) {
          dataArray.push(res.rows.item(i));
        }
        setFabricData(dataArray);
      });
    });
  };
  console.log("data: ", fabricData);

  if (fabricData.length < 1) {
    return (
      <SafeAreaView style={styles.containerNoContent}>
        <TouchableOpacity
          style ={styles.addFabricButton}
          onPress={() => navigation.navigate("Add fabric")}
        >
        <Text style ={[styles.addFabricButtonContent, textStyles.text]}>
          Please add a fabric to get started</Text>
        <MaterialIcons
          style ={styles.addFabricButtonContent}
          name="add-circle-outline"
          size={32}
          color="#00637f"
        />
        </TouchableOpacity>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={itemStyles.row}>
            {fabricData.map((i) => (
              <View style={itemStyles.cardViewContainer} key={i.id}>
              <TouchableOpacity
                style={itemStyles.cardContainer}
                key={i.id}
                onPress={() => navigation.navigate("Details", { data: i })}
              >
                <Image
                  style={itemStyles.imageThumb}
                  source={{ uri: i.image_uri }}
                />
                <Text style={itemStyles.cardText}> {i.name}</Text>
                <Text style={itemStyles.cardText}> {i.length_rem}m remaining </Text>
              </TouchableOpacity>
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
   // alignItems: "center",
   // justifyContent: "center",
  },
  containerNoContent: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  //  flexDirection: 'row',
  },
  addFabricButton: {
    flexDirection: 'row',
    backgroundColor:'#e4c2ca',
    margin: '5%',
    padding: '2%',
    borderColor: "#00637f",
    borderRadius: 30
  },
  addFabricButtonContent:{
    alignSelf: 'center',
    padding: '2%',
  }
});
