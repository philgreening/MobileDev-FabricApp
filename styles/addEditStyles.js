import { StyleSheet } from 'react-native';
import { screenHeight, screenWidth } from '../modules/globalVariables.js';

export const addEditStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer :{
    flex: 1,
    padding: '5%',
  },
  imageContainer:{
    height: screenHeight/5,
    flexDirection: 'row',
    marginBottom: '5%',
  },
  inputBar: {
    flex: 6,
    paddingVertical: '2%',
    paddingHorizontal: '5%',
    backgroundColor: "#e4c2ca",
    borderRadius: 15,
  },
  imageThumb: {
    flex: 3,
    backgroundColor: "#e4c2ca",
    borderRadius: 30,
    marginRight: '3%',
  },
  takePictureButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    marginBottom: '10%',
    alignItems: "center",
  },
  label: {
    flex: 2,
    marginRight: 20
  },
  switch: {
    flex: 1,
    marginBottom: '5%',
  },
  picker: {
    flex: 2,
    backgroundColor: "#e4c2ca",
    color: '#00637f'
  },
  datePicker: {
    flex: 1,
    alignItems: "center",
  },
  submitButton: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: screenWidth/2,
    height: screenHeight/17,
    backgroundColor: '#00637f',
    borderRadius: 15,
    margin: '3%',
  },
  submitButtonText:{
    fontSize: screenWidth * 0.045,
    fontWeight: 'bold',
    color: '#e4c2ca'
  }
});
