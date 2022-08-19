import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Button, TextInput, TouchableOpacity, Image,
//   Dimensions
 } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Cell, Section, TableView } from 'react-native-tableview-simple';
import React, { useState, useRef, useEffect} from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { GetFabric } from '../modules/getData.js';
import { screenWidth, screenHeight, db } from '../modules/globalVariables.js';
import { SearchBar } from '@rneui/base';




// import * as SQLite from 'expo-sqlite';
//
// const db = SQLite.openDatabase('fabricDB.db')

// const screen = Dimensions.get('window');
// const screenHeight = screen.height;
// const screenWidth = screen.width;

export default function SearchScreen({navigation, route}) {

  const [search, setSearch] = useState('');
  const [filterData, setFilterData] = useState([]);

  const [fabricData, setFabricData] = useState([]);

  let dataArray = [];

  useEffect(() => {
    getFabric()
    console.log('len: ' + fabricData.length)

  }, [route]);

//   useEffect(() => {
//   fetch('https://jsonplaceholder.typicode.com/posts')
//     .then((response) => response.json())
//     .then((responseJson) => {
//       setFilteredDataSource(responseJson);
//       setMasterDataSource(responseJson);
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// }, []);

  const getFabric = () => {
    db.transaction((txn) => {
      txn.executeSql("SELECT * FROM `fabrics`", [], (tx, res) => {
        for (let i = 0; i < res.rows.length; ++i) {
          dataArray.push(res.rows.item(i));
        }
        setFabricData(dataArray);
        setFilterData(fabricData);
      });
    });
  };
  console.log('data: ', fabricData.name);

  // const searchFilterFunction = (text) => {
  //   // Check if searched text is not blank
  //   if (text) {
  //     // Inserted text is not blank
  //     // Filter the masterDataSource
  //     // Update FilteredDataSource
  //     const newData = fabricData.filter(function (item) {
  //       console.log(item);
  //       const itemData = item.name
  //         ? item.name.toUpperCase()
  //       : ''.toUpperCase();
  //       const textData = text.toUpperCase();
  //       return itemData.indexOf(textData) > -1;
  //     });
  //     setFilterData(newData);
  //     console.log(filterData);
  //     setSearch(text);
  //   } else {
  //     // Inserted text is blank
  //     // Update FilteredDataSource with masterDataSource
  //     setFilterData(fabricData);
  //     setSearch(text);
  //   }
  // };


  // handle change event of search input
const handleChange = value => {
  setSearch(value);
  searchFilter(value);
};

// filter records by search text
const searchFilter = (value) => {
  const lowercasedValue = value.toLowerCase().trim();
  if (lowercasedValue === "") setFilterData(fabricData);
  else {
    const filteredData = fabricData.filter(item => {
      return Object.keys(item).some(key =>
       item[key].toString().toLowerCase().includes(lowercasedValue)
      );
    });
    setFilterData(filteredData);
  }
}




  return (
    <SafeAreaView styles={styles.container}>
    <ScrollView>
    <SearchBar
       round
       searchIcon={{ size: 24 }}
       onChangeText={(text) => handleChange(text)}
       onClear={(text) => handleChange('')}
       placeholder="Type Here..."
       value={search}
     />
        {filterData.map((i) => (
      <TouchableOpacity
        style={styles.cardContainer}
        key={i.id}
        onPress={() => navigation.navigate("Details", { data: i })}
      >
      <Image
        style={styles.imageThumb}
        source={{uri: i.image_uri}}
      />
        <Text> {i.name} </Text>
        <Text> {i.length_rem} </Text>
      </TouchableOpacity>
    ))}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 20
//    alignItems: "center",
  //  justifyContent: "center",
  },
  scrollContainer:{
    flex:1,
  },
  row:{
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start'
  },
  imageThumb: {
    flex:2,
  },
  cardContainer: {
    width: screenWidth /2 -50,
    height: screenHeight / 5,
    borderWidth: 1,
    margin: 10
  },
});
