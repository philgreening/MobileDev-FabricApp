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
  Switch,
// Dimensions
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
import { screenHeight, screenWidth, db } from '../modules/globalVariables.js';


export default function AddItemScreen({ navigation, route }) {
  const [datePicker, setDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());
  // const [dateString, setDateString] = useState(date.toJSON());

  // const [fabName, setFabName] = useState("");
  const [fabricObj, setFabricObj] = useState({
    name: "",
    image_uri: "null",
    colour: "",
    woven_knit: 0,
    type: "Cotton",
    width: 0,
    length_pur: 0,
    length_rem: 0,
    date_pur: date.toDateString(),
    cost: 0,
    project: "",
  });
  // const [imageUri, setImageUri] = useState("null");
  console.log("fabricObject: ", fabricObj);

  const switchOptions = [
    { label: "Woven", value: 0 },
    { label: "Knit", value: 1 },
  ]

  useEffect(() => {
    if (route.params?.photoUri) {
      console.log("succes: ", route);
      setFabricObj({
        name: route.params.data.name,
        image_uri: route.params.photoUri,
        colour: route.params.data.colour,
        woven_knit: route.params.data.woven_knit,
        type: route.params.data.type,
        width: route.params.data.width,
        length_pur: route.params.data.length_pur,
        length_rem: route.params.data.length_rem,
        date_pur: route.params.data.date_pur,
        cost: route.params.data.cost,
        project: route.params.data.project
//      setFabricObj({image_uri: route.params.photoUri,
       });
    }
  }, [route.params?.photoUri]);
  console.log("imageUri: ", fabricObj.image_uri);

  const addFabric = (item) => {
    db.transaction((txn) => {
      txn.executeSql(
        "INSERT INTO fabrics (name, image_uri, colour, woven_knit, type, width, length_pur , length_rem, date_pur, cost, project ) VALUES (?,?,?,?,?,?,?,?,?,?,?)",
        [
          item.name,
          item.image_uri,
          item.colour,
          item.woven_knit,
          item.type,
          item.width,
          item.length_pur,
          item.length_rem,
          item.date_pur,
          item.cost,
          item.project,
        ]
      );
    });
  };

  const onDateSelected = (event, value) => {
    if (Platform.OS === 'android') {
      setDatePicker(false);
    }
   // setDateString(value.toJSON());
    // setDate(new Date(dateString));
    setDate(value);
    setFabricObj({...fabricObj, date_pur: value.toJSON()})
    
    //console.log(fabricObj.date_pur);
 };

 const showDatePicker = () => {
   setDatePicker(true);
 };

  return (

    <SafeAreaView style={styles.container}>
    <ScrollView style={styles.scrollContainer}>

      <View style={styles.imageContainer}>
        <Image
          style={styles.imageThumb}
          source={{
            uri: fabricObj.image_uri,
          }}
        />
        <TouchableOpacity
          style={styles.takePictureButton}
          onPress={() => {
            navigation.navigate("Camera", { data: fabricObj} );
          }}
        >
          <Text style={styles.takePictureButtonText}>
            Take picture
          </Text>
        </TouchableOpacity>
      </View>

        <View style={styles.row}>
        <Text style={styles.label}> Name:  </Text>
          <TextInput
            style={styles.inputBar}
            placeholder="Enter fabric name"
            onChangeText={(value) => setFabricObj({ ...fabricObj, name: value })}
            value={fabricObj.name}
          />
          <Text> {fabricObj.name} </Text>
        </View>

        <View style={styles.row}>
        <Text style={styles.label}> Colour:  </Text>
          <TextInput
            style={styles.inputBar}
            placeholder="Enter fabric colour"
            onChangeText={(value) => setFabricObj({ ...fabricObj, colour: value })}
            value={fabricObj.colour}
          />
          <Text> {fabricObj.colour} </Text>
          </View>

          <SwitchSelector
            style={styles.switch}
            options={switchOptions}
            initial = {0}
            value = {0}
            onPress={value => setFabricObj({...fabricObj, woven_knit: value})}
          >
          </SwitchSelector>

          <View style={styles.row}>
            <Text style={styles.label} > Fabric type: </Text>
            <Picker
              selectedValue={fabricObj.type}
              style={styles.picker}
              onValueChange={(value, itemIndex) =>
              setFabricObj({ ...fabricObj, type: value })
              }>
              <Picker.Item label="Cotton" value="Cotton" />
              <Picker.Item label="Wool" value="Wool" />
              <Picker.Item label="Linen" value="Linen" />
              <Picker.Item label="Jersey" value="Jersey" />
              <Picker.Item label="Synthetic" value="Synthetic" />
              <Picker.Item label="Swim Suiting" value="Swim Suiting" />
              <Picker.Item label="Lycra" value="Lycra" />
              <Picker.Item label="Denim" value="Denim" />
            </Picker>
          </View>

        <View style={styles.row}>
          <Text style={styles.label}>Fabric Width (in m): </Text>
          <NumericInput
          value={fabricObj.width}
          onChange={value => setFabricObj({...fabricObj, width: value})}
          minValue={0}
          totalWidth={screenWidth/3}
          totalHeight={screenHeight/15}
          step={0.5}
          valueType='real'
          rounded
          textColor='#B0228C'
          iconStyle={{ color: 'white' }}
          rightButtonBackgroundColor='#EA3788'
          leftButtonBackgroundColor='#E56B70'/>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Length Purchased (in m): </Text>
          <NumericInput
          value={fabricObj.length_pur}
          onChange={value => setFabricObj({...fabricObj, length_pur: value})}
          minValue={0}
          totalWidth={screenWidth/3}
          totalHeight={screenHeight/15}
          step={0.5}
          valueType='real'
          rounded
          textColor='#B0228C'
          iconStyle={{ color: 'white' }}
          rightButtonBackgroundColor='#EA3788'
          leftButtonBackgroundColor='#E56B70'/>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Length Remaining (in m): </Text>
          <NumericInput
          value={fabricObj.length_rem}
          onChange={value => setFabricObj({...fabricObj, length_rem: value})}
          minValue={0}
          maxValue={fabricObj.length_pur}
          totalWidth={screenWidth/3}
          totalHeight={screenHeight/15}
          step={0.5}
          valueType='real'
          rounded
          textColor='#B0228C'
          iconStyle={{ color: 'white' }}
          rightButtonBackgroundColor='#EA3788'
          leftButtonBackgroundColor='#E56B70'/>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Date Purchased:{"\n"}{date.toDateString()}</Text>
          {!datePicker && (
                        <Button
                        title="Show Date Picker"
                        color="green" onPress={showDatePicker} />
          )}
         
          {datePicker && (
          <DateTimePicker value={date} onChange={onDateSelected} style={{ flex:1, backgroundColor: "white"}}/>
          )}
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Cost (in £): </Text>
          <NumericInput
          value={fabricObj.cost}
          onChange={value => setFabricObj({...fabricObj, cost: value})}
          minValue={0}
          totalWidth={screenWidth/3}
          totalHeight={screenHeight/15}
          step={0.5}
          valueType='real'
          rounded
          textColor='#B0228C'
          iconStyle={{ color: 'white' }}
          rightButtonBackgroundColor='#EA3788'
          leftButtonBackgroundColor='#E56B70'/>
        </View>

        <View style={styles.row}>
        <Text style={styles.label}>Project ideas: </Text>
          <TextInput
            style={styles.inputBar}
            placeholder="Enter project ideas"
            onChangeText={(value) => setFabricObj({ ...fabricObj, project: value })}
            value={fabricObj.project}
          />
          <Text> {fabricObj.project} </Text>
          </View>
          </ScrollView>

          <Button
            title="Add Fabric"
            onPress={() => {
              addFabric(fabricObj),
                navigation.navigate("Home", { name: fabricObj.name });
            }}
          />
        </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  //  padding: '5%',
    // flexDirection: 'row',
    backgroundColor: "#fff",
    //alignItems: 'center',
  },
  scrollContainer :{
    flex: 1,
    padding: '5%'
  },
  imageContainer:{
    //flex: 0.25,
    height: screenHeight/5,
    flexDirection: 'row',
    marginBottom: '5%',
  //  padding: '5%'

  //  flexWrap: 'wrap',
  },
  inputBar: {
    // width: '100%',
    flex: 4,
    borderWidth: 2,
    borderColor: "black",
    padding: "1%"
  },
  imageThumb: {
    flex: 3,
    //width: '80%',
    //height: '20%',
    borderRadius: 30,
    marginRight: '3%',
  },
  takePictureButton: {
    //width: 130,
    flex: 1,
    borderRadius: 4,
    backgroundColor: "#14274e",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: '3%',
    //height: 40,
  },
  takePictureButtonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    marginBottom: '10%',
    alignItems: "center",
    //justifyContent: 'center'
  },
  label: {
    flex: 1,
  },
  switch: {
    flex: 1,
    marginBottom: '5%'
  },
  picker: {
    flex: 2,
  }

});
