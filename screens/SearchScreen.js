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


// import * as SQLite from 'expo-sqlite';
//
// const db = SQLite.openDatabase('fabricDB.db')

// const screen = Dimensions.get('window');
// const screenHeight = screen.height;
// const screenWidth = screen.width;

export default function SearchScreen({navigation, route}) {

  const [fabricData, setFabricData] = useState([]);

  let dataArray = [];

  useEffect(() => {
    getFabric();
    console.log('len: ' + fabricData.length)

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
  console.log('data: ', fabricData.name);


  return (
    <SafeAreaView styles={styles.container}>
    <ScrollView>
    {fabricData.map((i) => (
      <TouchableOpacity
        style={styles.cardContainer}
        key={i.id}
        onPress={() => navigation.navigate("Details", { data: i })}
      >
      <Image
        style={styles.imageThumb}
        source={{uri: i.image_uri}}
      />
        <Text> {i.name} {i.length_rem} </Text>
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
