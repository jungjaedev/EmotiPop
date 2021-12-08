import React, { useEffect } from 'react';
import { 
    Button, 
    View, 
    Text,
    TouchableOpacity,
    Dimensions,
  } from 'react-native';
import * as Update from "expo-updates";
import styled from 'styled-components/native';


const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');


export default function CalenderContainer({navigation}) {

  return (
    <View style={{ 
      alignItems: 'center', 
      justifyContent: 'space-between',
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT - 60
    }}>
      <Text style={{flex: 1}}>Calender</Text>
    </View>
  );
}