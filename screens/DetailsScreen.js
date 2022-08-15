import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Button,
  TextInput,
  Alert,
  Image,
  Dimensions
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Cell, Section, TableView } from "react-native-tableview-simple";
import React, { useState, useRef, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("fabricDB.db");

const screen = Dimensions.get('window');
const screenHeight = screen.height;
const screenWidth = screen.width;



export default function DetailsScreen({ navigation, route }) {
  const fabricData = route.params.data;
  console.log('details fabricData: ', fabricData);
  console.log(fabricData.image_uri);

  const costPerM = () => {
    let cpm = (fabricData.cost / fabricData.length_pur).tofixed(2);
    console.log(cpm);
    return cpm

  }

  const wovenKnitOptions = () => {
    if (fabricData.woven_knit == 1){
      return 'Knit'
    }
    else {
      return 'Woven'
    }
  }
  console.log('wko:', wovenKnitOptions());

  const convertDate = () => {
    const date = new Date(fabricData.date_pur);
    return date.toDateString();
  }

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          title="Edit fabric"
          onPress={() => navigation.navigate("Edit fabric", { data: fabricData })}
        />
      ),
    });
  });

  return (
    <SafeAreaView styles={styles.container}>
      <ScrollView>
      <Image
        style={styles.image}
        source={{
          uri: fabricData.image_uri,
        }}
      />
        <TableView>
          <Section>
            <Cell
               cellStyle="RightDetail"
               title="Name"
               detail={fabricData.name}
               rightDetailColor="red"
            />
            <Cell
             cellStyle="RightDetail"
             title="Colour"
             detail={fabricData.colour}
             rightDetailColor="red"
            />
          </Section>

          <Section>
            <Cell
               cellStyle="RightDetail"
               title="Textile"
               detail={wovenKnitOptions()}
               rightDetailColor="red"
            />
            <Cell
             cellStyle="RightDetail"
             title="Colour"
             detail={fabricData.colour}
             rightDetailColor="red"
            />
            <Cell
             cellStyle="RightDetail"
             title="Type"
             detail={fabricData.type}
             rightDetailColor="red"
            />
          </Section>

          <Section>
            <Cell
               cellStyle="RightDetail"
               title="Width"
               detail={fabricData.width + ' m'}
               rightDetailColor="red"
            />
            <Cell
             cellStyle="RightDetail"
             title="Length purchased"
             detail={fabricData.length_pur + ' m'}
             rightDetailColor="red"
            />
            <Cell
             cellStyle="RightDetail"
             title="Length remaining"
             detail={fabricData.length_rem + ' m'}
             rightDetailColor="red"
            />
          </Section>

          <Section>
          <Cell
             cellStyle="RightDetail"
             title="Date purchased"
             detail={convertDate()}
             rightDetailColor="red"
          />
            <Cell
               cellStyle="RightDetail"
               title="Cost"
               detail={'£ ' + fabricData.cost}
               rightDetailColor="red"
            />
            <Cell
             cellStyle="RightDetail"
             title="Cost per meter"
             detail={'£ ' +  fabricData.cost / fabricData.length_pur}
             rightDetailColor="red"
            />
          </Section>
          <Section>
            <Cell
             cellStyle="RightDetail"
             title="project ideas"
             detail={fabricData.project}
             rightDetailColor="red"
            />
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
  image:{
    width: screenWidth,
    height: screenHeight/4,
    borderRadius: 5,
    margin: 0
  }
});
