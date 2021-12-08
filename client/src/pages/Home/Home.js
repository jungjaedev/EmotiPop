import React, { useEffect, } from 'react';
import { 
    Button, 
    View, 
    Text,
    TouchableOpacity,
    Dimensions,
  } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components/native';
import { StatusBar } from 'expo-status-bar';
import ChartTest from '../chart/ChartTest';
// import ChartTest2 from '../chart/ChartTest2';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');


export default function Home({ navigation }) {
  // const pageState = useSelector(state => state.pages)
  // console.log(pageState)

  return (
    <View style={{ 
      alignItems: 'center', 
      justifyContent: 'space-between',
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT -60
    }}>
      <ChartTest />
    </View>
  );
}