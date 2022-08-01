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
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Cell, Section, TableView } from "react-native-tableview-simple";
import React, { useState, useRef, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as SQLite from "expo-sqlite";

// import { getFabric } from '../modules/getData';

const db = SQLite.openDatabase("fabricDB.db");

// let data = [];

//https://openbase.com/js/react-native-sqlite-2/documentation
db.transaction((txn) => {
  //txn.executeSql('DROP TABLE IF EXISTS fabrics', [])
  txn.executeSql(
    "CREATE TABLE IF NOT EXISTS fabrics(id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(30))",
    []
  );
});

export default function HomeScreen({ navigation, route }) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          title="Add fabric"
          onPress={() => navigation.navigate("Add fabric")}
        />
      ),
    });
  });

  // const [name, setName] = useState([]);
  const [nameArray, setNameArray] = useState([]);

  // const [id, setId] = useState([]);
  // const [forceUpdate, forceUpdateId] = useForceUpdate();
  console.log(getFabric);

  useEffect(() => {
    // addFabric();
    getFabric();
  }, [route]);

  // const addFabric = (item) => {
  //   db.transaction((txn) => {
  //     txn.executeSql('INSERT INTO fabrics (name) VALUES (?)', [item])
  //     txn.executeSql('INSERT INTO fabrics (name) VALUES (?)', ['fab2'])
  //   })
  // };
  // const data = getFabric()
  // console.log(data);
  // setNameArray(data);
  let fabData = [];

  const getFabric = () => {
    db.transaction((txn) => {
      txn.executeSql("SELECT * FROM `fabrics`", [], (tx, res) => {
        for (let i = 0; i < res.rows.length; ++i) {
          fabData.push(res.rows.item(i));

          // setNameArray([...nameArray, fabData])
          // setName(Prevname => [...Prevname, res.rows.item(i)])
          // setName([...name, data])
          // array([...array, res.rows.item(i)])
          // console.log('Fabric: ', res.rows.item(i))
        }
        // setName(data);
        setNameArray(fabData);
      });
    });
  };
  console.log(nameArray);
  return (
    <SafeAreaView styles={styles.container}>
      <ScrollView>
        <TableView>
          <Section header="" hideSeparator={true} sectionTintColor={"#ccc"}>
            <Text> Fabric one </Text>
            {nameArray.map((i) => (
              <TouchableOpacity
                key={i.id}
                onPress={() => navigation.navigate("Details", { data: i })}
              >
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
});
