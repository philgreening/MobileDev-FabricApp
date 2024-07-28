import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState, useEffect, useLayoutEffect } from "react";
import { db } from "../modules/globalVariables.js";

// Imprt icons and stylesheets
import { MaterialIcons } from "@expo/vector-icons";
import { itemStyles } from "../styles/itemStyles";
import { headerStyles } from "../styles/headerStyles";
import { textStyles } from "../styles/textStyles";

//https://openbase.com/js/react-native-sqlite-2/documentation

// Creates sqllite database
db.withTransactionAsync((txn) => {
  //  txn.executeSql('DROP TABLE IF EXISTS fabrics', [])
  txn.executeSql(
    `CREATE TABLE IF NOT EXISTS fabrics(id INTEGER PRIMARY KEY AUTOINCREMENT,
      name VARCHAR(30) NOT NULL,
      image_uri TEXT,
      colour VARCHAR(30),
      woven_knit BOOLEAN,
      type VARCHAR(30),
      width FLOAT,
      length_pur FLOAT,
      length_rem FLOAT,
      date_pur TEXT,
      cost FLOAT,
      project VARCHAR(255))`,
    []
  );
});

export default function HomeScreen({ navigation, route }) {
  //Stores item details in state
  const [fabricData, setFabricData] = useState([]);

  // Array to hold db records
  let dataArray = [];

  // Add icon to the right of header
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate("Add fabric")}
          style={headerStyles.headerRight}
        >
          <MaterialIcons
            name="add-circle-outline"
            size={textStyles.icon.fontSize}
            color="#e4c2ca"
          />
        </TouchableOpacity>
      ),
    });
  });

  // Calls get fabric function on page load and from route
  useEffect(() => {
    getFabric();
  }, [route]);

  // Retreives records from db and creates an array of objects
  const getFabric = () => {
    db.withTransactionAsync((txn) => {
      txn.executeSql("SELECT * FROM fabrics", [], (tx, res) => {
        // pushes items into array
        for (let i = 0; i < res.rows.length; ++i) {
          dataArray.push(res.rows.item(i));
        }
        // pushes array into state variable
        setFabricData(dataArray);
      });
    });
  };

  // Renders add button if no items retrieved from db
  if (fabricData.length < 1) {
    return (
      <SafeAreaView style={styles.containerNoContent}>
        <TouchableOpacity
          style={styles.addFabricButton}
          onPress={() => navigation.navigate("Add fabric")}
        >
          <Text style={[styles.addFabricButtonContent, textStyles.text]}>
            Please add a fabric to get started
          </Text>
          <MaterialIcons
            style={styles.addFabricButtonContent}
            name="add-circle-outline"
            size={32}
            color="#00637f"
          />
        </TouchableOpacity>
      </SafeAreaView>
    );
  } else {
    // Renders items
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
                  <Text style={itemStyles.cardText}>{i.name}</Text>
                  <Text style={itemStyles.cardText}>
                    {i.length_rem}m remaining
                  </Text>
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
  },
  containerNoContent: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  addFabricButton: {
    flexDirection: "row",
    backgroundColor: "#e4c2ca",
    margin: "5%",
    padding: "2%",
    borderColor: "#00637f",
    borderRadius: 30,
  },
  addFabricButtonContent: {
    alignSelf: "center",
    padding: "2%",
  },
});
