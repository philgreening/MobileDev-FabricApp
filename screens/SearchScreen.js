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
import { db, iconSize } from "../modules/globalVariables.js";
import { SearchBar } from "@rneui/base";
import Constants from "expo-constants";

// import style sheets
import { itemStyles } from "../styles/itemStyles";

export default function SearchScreen({ navigation, route }) {
  const [search, setSearch] = useState("");
  const [filterData, setFilterData] = useState([]);

  const [fabricData, setFabricData] = useState([]);

  // Array to hold db records
  let dataArray = [];

  // Calls get fabric function on page load and from route
  useEffect(() => {
    getFabric();
  }, [route]);

  // Retreives records from db and creates an array of objects
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
    console.log('getfab called');
  };

  // handle change event of search input
  const handleChange = (value) => {
    setSearch(value);
    searchFilter(value);
  };

  // Customise the header to become searchbar
  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => (
        <View style={styles.header}>
          <SearchBar
            round
            searchIcon={{ size: 24 }}
            onChangeText={(text) => handleChange(text)}
            onClear={(text) => handleChange("")}
            containerStyle={{
              backgroundColor: "#00637f",
              color: "#e4c2ca",
              borderBottomColor: "transparent",
              borderTopColor: "transparent",
            }}
            inputContainerStyle={{ backgroundColor: "#e4c2ca" }}
            inputStyle={{ color: "#00637f90" }}
            placeholder="Search..."
            placeholderTextColor={"#00637f90"}
            searchIcon={{ color: "#00637f", size: iconSize }}
            clearIcon={{ color: "#00637f", size: iconSize }}
            value={search}
          />
        </View>
      ),
    });
  });

  // Changes options from binmary to string
  const wovenKnitOptions = () => {
    for (let i = 0; i < dataArray.length; i++) {
      if (dataArray[i].woven_knit == 1) {
        dataArray[i].woven_knit = "Knit";
      } else {
        dataArray[i].woven_knit = "Woven";
      }
    }
  };

  // filter records by search text
  const searchFilter = (value) => {
    try {
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
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={itemStyles.row}>
          {filterData.map((i) => (
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
                <Text style={itemStyles.cardText}> {i.name} </Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#00637f",
  },
});
