import { StyleSheet } from 'react-native';
import { screenHeight, screenWidth } from '../modules/globalVariables.js';

export const textStyles = StyleSheet.create({
  text:{
    //fontFamily: 'Reikna-Regular',
    fontSize: Math.round(screenWidth * 0.04),
    fontWeight: 'bold',
    color: '#00637f'
  },
  icon:{
    fontSize: Math.round(screenWidth * 0.082),
  },
  largeIcon:{
    fontSize: Math.round(screenWidth * 0.092),
  }
});
