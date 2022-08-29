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
      <SafeAreaView styles={styles.container}>
        <Text>No fabric</Text>
        <Button
          title="Add fabric"
          onPress={() => navigation.navigate("Add fabric")}
        />

      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView styles={styles.container}>
        <ScrollView styles={styles.scrollContainer}>
          {/*  <TableView>
          <Section header="" hideSeparator={true} sectionTintColor={"#ccc"}>
            {fabricData.map((i) => (
              <TouchableOpacity
                style={{flex:1}}
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
        </TableView> */}

          <View style={styles.row}>
            {fabricData.map((i) => (
              <View style={styles.viewContainer} key={i.id}>
              <TouchableOpacity
                style={styles.cardContainer}
                key={i.id}
                onPress={() => navigation.navigate("Details", { data: i })}
              >
                <Image
                  style={styles.imageThumb}
                  source={{ uri: i.image_uri }}
                />
                <Text> {i.name}</Text>
                <Text> {i.length_rem}m remaining </Text>
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
    //alignItems: "center",
    //justifyContent: "center",
  },
  viewContainer: {
  width: '50%',
  padding: '2%',
  },
  scrollContainer: {
    flex: 1,
  },
  row: {
    margin: '5%',
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  imageThumb: {
    flex: 2,
  },
  cardContainer: {
  //  width: '50%',
    height: screenHeight / 5,

  //  borderWidth: 1,
    //padding: 5
  },
});
