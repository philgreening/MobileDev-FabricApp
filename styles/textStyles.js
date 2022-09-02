import { StyleSheet } from 'react-native';
import { screenHeight, screenWidth } from '../modules/globalVariables.js';

export const textStyles = StyleSheet.create({
  text:{
    //fontFamily: 'Reikna-Regular',
    fontSize: screenWidth * 0.04,
    fontWeight: 'bold',
    color: '#00637f'
  },
  icon:{
    fontSize: screenWidth * 0.045,
  }
});
