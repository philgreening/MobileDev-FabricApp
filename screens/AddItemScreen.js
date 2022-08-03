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
  Image,
  Switch
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Cell, Section, TableView } from "react-native-tableview-simple";
import React, { useState, useRef, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Camera } from "expo-camera";
import SwitchSelector from "react-native-switch-selector";
import {Picker} from '@react-native-picker/picker';
import NumericInput from 'react-native-numeric-input'
import DateTimePicker from '@react-native-community/datetimepicker';

import * as SQLite from "expo-sqlite";

import HomeScreen from "./HomeScreen";
// import * as FB from '../modules/getData';

const db = SQLite.openDatabase("fabricDB.db");

export default function AddItemScreen({ navigation, route }) {
  const [datePicker, setDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const [dateString, setDateString] = useState(date.toJSON());

  const [fabName, setFabName] = useState("");
  const [fabricObj, setFabricObj] = useState({
    name: "",
    imageUri: "null",
    colour: "",
    wovenOrKnit: 0,
    type: "",
    fabricWidth: null,
    lengthPurchased: null,
    lengthRemaining: null,
    datePurchased: dateString,
    cost: null,
    project: "",
  });
  const [imageUri, setImageUri] = useState("null");
  console.log("fabricObject: ", fabricObj);

  const switchOptions = [
    { label: "Woven", value: 0 },
    { label: "Knit", value: 1 },
  ]

  useEffect(() => {
    if (route.params?.photoUri) {
      console.log("succes: ", route);
      setFabricObj({imageUri: route.params.photoUri });
    }
  }, [route.params?.photoUri]);
  console.log("imageUri: ", fabricObj.imageUri);

  const addFabric = (item) => {
    db.transaction((txn) => {
      txn.executeSql(
        "INSERT INTO fabrics (name, image_uri, colour, woven_knit, type, width, length_pur, length_rem, date_pur, cost, project ) VALUES (?,?,?,?,?,?,?,?,?,?,?)",
        [
          item.name,
          item.imageUri,
          item.colour,
          item.wovenOrKnit,
          item.type,
          item.fabricWidth,
          item.lengthPurchased,
          item.lengthRemaining,
          item.datePurchased,
          item.cost,
          item.project,
        ]
      );
    });
  };

  const onDateSelected = (event, value) => {
    setDateString(value.toJSON());
    setFabricObj({...fabricObj, datePurchased: dateString})
    setDate(new Date(dateString));
    setDatePicker(false);
 };

 const showDatePicker = () => {
   setDatePicker(true);
 };

  return (
    <SafeAreaView style={styles.container}>
    <ScrollView>
        <Image
          style={styles.imageThumb}
          source={{
            uri: fabricObj.imageUri,
          }}
        />
        <TouchableOpacity
          style={styles.takePictureButton}
          onPress={() => {
            navigation.navigate("Camera");
          }}
        >
          <Text style={styles.takePictureButtonText}>
            Take picture
          </Text>
        </TouchableOpacity>
        <View style={styles.formContainer}>

        <TextInput
          style={styles.inputBar}
          placeholder="Enter fabric name"
          onChangeText={(value) => setFabricObj({ ...fabricObj, name: value })}
          value={fabricObj.name}
        />
        <Text> {fabricObj.name} </Text>
        <TextInput
          style={styles.inputBar}
          placeholder="Enter fabric colour"
          onChangeText={(value) => setFabricObj({ ...fabricObj, colour: value })}
          value={fabricObj.colour}
        />
        <Text> {fabricObj.colour} </Text>
        <SwitchSelector
          options={switchOptions}
          initial = {0}
          onPress={value => setFabricObj({...fabricObj, wovenOrKnit: value})}
        >
        </SwitchSelector>

        <Picker
          selectedValue={fabricObj.type}
          style={{ height: 50, width: 150 }}
          onValueChange={(value, itemIndex) =>
          setFabricObj({ ...fabricObj, type: value })
          }>
          <Picker.Item label="Cotton" value="Cotton" />
          <Picker.Item label="Wool" value="Wool" />
        </Picker>

        <Text> Fabric Width </Text>
        <NumericInput
        value={fabricObj.fabricWidth}
        onChange={value => setFabricObj({...fabricObj, fabricWidth: value})}
        minValue={0}
        totalWidth={240}
        totalHeight={40}
        step={0.5}
        valueType='real'
        rounded
        textColor='#B0228C'
        iconStyle={{ color: 'white' }}
        rightButtonBackgroundColor='#EA3788'
        leftButtonBackgroundColor='#E56B70'/>

        <Text> Length Purchased </Text>
        <NumericInput
        value={fabricObj.lengthPurchased}
        onChange={value => setFabricObj({...fabricObj, lengthPurchased: value})}
        minValue={0}
        totalWidth={240}
        totalHeight={40}
        step={0.5}
        valueType='real'
        rounded
        textColor='#B0228C'
        iconStyle={{ color: 'white' }}
        rightButtonBackgroundColor='#EA3788'
        leftButtonBackgroundColor='#E56B70'/>

        <Text> Length Remaining </Text>
        <NumericInput
        value={fabricObj.lengthRemaining}
        onChange={value => setFabricObj({...fabricObj, lengthRemaining: value})}
        minValue={0}
        totalWidth={240}
        totalHeight={40}
        step={0.5}
        valueType='real'
        rounded
        textColor='#B0228C'
        iconStyle={{ color: 'white' }}
        rightButtonBackgroundColor='#EA3788'
        leftButtonBackgroundColor='#E56B70'/>

        <Text>selected: {date.toDateString()}</Text>
        <View>
           <Button title="Show Date Picker" color="green" onPress={showDatePicker} />
        </View>
        {datePicker && (
        <DateTimePicker value={date} onChange={onDateSelected} />
        )}

        <Text> Cost </Text>
        <NumericInput
        value={fabricObj.cost}
        onChange={value => setFabricObj({...fabricObj, cost: value})}
        minValue={0}
        totalWidth={240}
        totalHeight={40}
        step={0.5}
        valueType='real'
        rounded
        textColor='#B0228C'
        iconStyle={{ color: 'white' }}
        rightButtonBackgroundColor='#EA3788'
        leftButtonBackgroundColor='#E56B70'/>

        <TextInput
          style={styles.inputBar}
          placeholder="Enter project ideas"
          onChangeText={(value) => setFabricObj({ ...fabricObj, project: value })}
          value={fabricObj.project}
        />
        <Text> {fabricObj.project} </Text>

        <Button
          title="Add Fabric"
          onPress={() => {
            addFabric(fabricObj),
              navigation.navigate("Home", { name: fabricObj.name });
          }}
        />
      </View>
      </ScrollView>
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: 'center',

  },
  formContainer:{
    flex: 4,
    alignItems: 'flex-start',
    padding: '3%'
  },
  inputBar: {
    width: '100%',
    borderWidth: 2,
    borderColor: "black",
    padding: "1%"
  },
  imageThumb: {
    width: '80%',
    height: '20%',
    borderRadius: 10,
  },
  takePictureButton: {
    width: 130,
    borderRadius: 4,
    backgroundColor: "#14274e",
    justifyContent: "center",
    alignItems: "center",
    height: 40,
  },
  takePictureButtonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  }
});
