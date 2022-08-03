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
  Image
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Cell, Section, TableView } from "react-native-tableview-simple";
import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("fabricDB.db");

//https://openbase.com/js/react-native-sqlite-2/documentation
db.transaction((txn) => {
  txn.executeSql('DROP TABLE IF EXISTS fabrics', [])
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
        <Button
          title="Add fabric"
          onPress={() => navigation.navigate("Add fabric")}
        />
      ),
    });
  });

  console.log('fabric db data: ' + getFabric);

  useEffect(() => {
    getFabric();
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
  console.log('data: ' + fabricData);

  return (
    <SafeAreaView styles={styles.container}>
      <ScrollView>
        <TableView>
          <Section header="" hideSeparator={true} sectionTintColor={"#ccc"}>
            <Text> Fabric one </Text>
            {fabricData.map((i) => (
              <TouchableOpacity
                key={i.id}
                onPress={() => navigation.navigate("Details", { data: i })}
              >
              <Image
                style={styles.imageThumb}
                source={{uri: i.image_uri}}
              />
                <Text> {i.name} </Text>
              </TouchableOpacity>
            ))}
          </Section>
        </TableView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  imageThumb: {
    width: 50,
    height: 50
  }
});
