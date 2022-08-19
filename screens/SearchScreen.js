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
  //   Dimensions
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Cell, Section, TableView } from "react-native-tableview-simple";
import React, { useState, useRef, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { GetFabric } from '../modules/getData.js';
import { screenWidth, screenHeight, db } from "../modules/globalVariables.js";
import { SearchBar } from "@rneui/base";

export default function SearchScreen({ navigation, route }) {
  const [search, setSearch] = useState("");
  const [filterData, setFilterData] = useState([]);

  const [fabricData, setFabricData] = useState([]);

  let dataArray = [];

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
        wovenKnitOptions();
        setFabricData(dataArray);
        setFilterData(fabricData);
      });
    });
  };

  // handle change event of search input
  const handleChange = (value) => {
    setSearch(value);
    searchFilter(value);
  };

  const wovenKnitOptions = () => {
    for (let i = 0; i < dataArray.length; i++) {
      if (dataArray[i].woven_knit == 1) {
        dataArray[i].woven_knit = "Knit";
      } else {
        dataArray[i].woven_knit = "Woven";
      }
      console.log("wOrk121", dataArray[i].woven_knit);
    }
  };

  // filter records by search text
  const searchFilter = (value) => {
    const lowercasedValue = value.toLowerCase().trim();
    if (lowercasedValue === "") setFilterData(fabricData);
    else {
      const filteredData = fabricData.filter((item) => {
        return Object.keys(item).some((key) =>
          item[key].toString().toLowerCase().includes(lowercasedValue)
        );
      });
      setFilterData(filteredData);
    }
  };

  return (
    <SafeAreaView styles={styles.container}>
      <ScrollView>
        <SearchBar
          round
          searchIcon={{ size: 24 }}
          onChangeText={(text) => handleChange(text)}
          onClear={(text) => handleChange("")}
          placeholder="Type Here..."
          value={search}
        />
        {filterData.map((i) => (
          <TouchableOpacity
            style={styles.cardContainer}
            key={i.id}
            onPress={() => navigation.navigate("Details", { data: i })}
          >
            <Image style={styles.imageThumb} source={{ uri: i.image_uri }} />
            <Text> {i.name} </Text>
            <Text> {i.length_rem} </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 20,
    //    alignItems: "center",
    //  justifyContent: "center",
  },
  scrollContainer: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  imageThumb: {
    flex: 2,
  },
  cardContainer: {
    width: screenWidth / 2 - 50,
    height: screenHeight / 5,
    borderWidth: 1,
    margin: 10,
  },
});
