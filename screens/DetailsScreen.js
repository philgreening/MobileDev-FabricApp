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
  TouchableOpacity
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Cell, Section, TableView } from "react-native-tableview-simple";
import React, { useState, useRef, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { screenHeight, screenWidth } from '../modules/globalVariables.js';
import { Feather } from '@expo/vector-icons';

export default function DetailsScreen({ navigation, route }) {
  const fabricData = route.params.data;
  console.log('details fabricData: ', fabricData);
  console.log(fabricData.image_uri);

  //const calc = (fabricData.cost / fabricData.length_pur).toFixed(2);
 // console.log('calc: ', calc)

  const costPerMeter = () => {
    const calc = (fabricData.cost / fabricData.length_pur).toFixed(2);

    if (calc == 'NaN' || fabricData.length_pur == 0 ){
      return 0
    }
    else {
      return calc
    }
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
        <TouchableOpacity
        onPress={() => navigation.navigate("Edit fabric", { data: fabricData })}
        >
        <Feather name="edit-3" size={32} color="#e4c2ca" />
        </TouchableOpacity>
      ),
    });
  });

  // Custom cell to accept large amount of text for project info
  const ProjectCell = (props) => (
  <Cell
    {...props}
    cellContentView={
      <View
        style={styles.projectContainer}
      >
        <Text
          allowFontScaling
          numberOfLines={1}
          style={styles.projectTitleText}
        >
          {props.title}
        </Text>
        <Text
          allowFontScaling
          numberOfLines={5}
          style={styles.projectDetailText}
        >
          {props.detail}
        </Text>
      </View>
    }
  />
);

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
        <Section header='Fabric details'>
            <Cell
               cellStyle="RightDetail"
               title="Name"
               detail={fabricData.name}
               rightDetailColor="#86ae99"
            />
            <Cell
             cellStyle="RightDetail"
             title="Colour"
             detail={fabricData.colour}
             rightDetailColor="#86ae99"
            />

            <Cell
               cellStyle="RightDetail"
               title="Textile"
               detail={wovenKnitOptions()}
               rightDetailColor="#86ae99"
            />
            <Cell
             cellStyle="RightDetail"
             title="Colour"
             detail={fabricData.colour}
             rightDetailColor="#86ae99"
            />
            <Cell
             cellStyle="RightDetail"
             title="Type"
             detail={fabricData.type}
             rightDetailColor="#86ae99"
            />
          </Section>

          <Section header='Measurements'>
            <Cell
               cellStyle="RightDetail"
               title="Width"
               detail={fabricData.width + ' m'}
               rightDetailColor="#86ae99"
            />
            <Cell
             cellStyle="RightDetail"
             title="Length purchased"
             detail={fabricData.length_pur + ' m'}
             rightDetailColor="#86ae99"
            />
            <Cell
             cellStyle="RightDetail"
             title="Length remaining"
             detail={fabricData.length_rem + ' m'}
             rightDetailColor="#86ae99"
            />
          </Section>

          <Section header='Purchase details'>
          <Cell
             cellStyle="RightDetail"
             title="Date purchased"
             detail={convertDate()}
             rightDetailColor="#86ae99"
          />
            <Cell
               cellStyle="RightDetail"
               title="Cost"
               detail={'£ ' + fabricData.cost}
               rightDetailColor="#86ae99"
            />
            <Cell
             cellStyle="RightDetail"
             title="Cost per meter"
             detail={'£ ' +  costPerMeter()}
             rightDetailColor="#86ae99"
            />
          </Section>
          <Section header='Project'>
            <ProjectCell
              title='Project ideas'
              detail={fabricData.project}
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
  imageContainer:{
    //flex: 0.25,
    flex:1,
    margin: 0,
  },
  image:{
    height: screenHeight/4,
    borderRadius: 30,
    margin: '5%'
  },
  projectContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    paddingVertical: 10
  },
  projectTitleText: {
    flex: 1, fontSize: 16
  },
  projectDetailText: {
    flex: 1,
    textAlign: 'right',
    color: '#86ae99',
    fontSize: 16
  }
});
