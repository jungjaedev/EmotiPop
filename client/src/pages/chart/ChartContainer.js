import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Text,
  TextInput,
  View,
  SafeAreaView,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import styled from 'styled-components/native';
import Plotly from 'react-native-plotly';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { getChartData } from '../../modules/chart';
import { reloadAsync } from 'expo-updates';


const { width: screenWidth, height: screenHeight } = Dimensions.get('window')

// const emotions = { 
//   emotion: { 
//     '행복': 5, '슬픔': 11, '걱정': 18, '화남': 10, '우울': 15, '설렘': 7, '만족': 17, '편안': 10, '뿌듯': 7, '신남': 10
//   } 
// }




export default function ChartContainer() {
  const dispatch = useDispatch();
  const emotions = useSelector(state => state.chart.chart.data)
  useEffect(async() => {
    try {
      const token = await getToken();
      // console.log(token, 'flowflowflowflow1');
      dispatch(getChartData(token))
    } catch(err) {
      throw new Error(err)
    }
  }, [])

  const getToken = async () => {
    const token = await AsyncStorage.getItem('AccessToken')
    return token;
  }

  console.log(emotions, 'This is Chart Page !@!!@!@!@!@!@!@!@!@!@')
  console.log(typeof emotions)

  // chart data
  const data = [
    {
    type: 'scatterpolar', // chart type
    r: [5, 11, 18, 10, 15, 7, 17, 10, 7, 10, 5], // data
    theta: ['기쁨','행복','만족', '뿌듯', '설렘', '슬픔', '우울', '걱정', '분노', '실망', '기쁨'], // data category
    fill: 'toself', // fill option
    name: 'ToTal', // data group name
    },
    {
      type: 'scatterpolar', // chart type
      r: [15, 6, 12, 15, 20, 3, 10, 9, 13, 10, 15], // data
      theta: ['행복','슬픔','걱정', '화남', '우울', '설렘', '만족', '편안', '뿌듯', '신남', '행복'], // data category
      fill: 'toself', // fill option
      name: 'Week' // data group name
    }
  ]
  // chart layout
  const layout = {
    // margin: {
    //   l: 0,
    //   r: 0,
    //   t: 0,
    //   d: 0,
    // },
    polar: {
      radialaxis: { 
        visible: true,
        range: [0, 50],
        color: 'red',
        ticklen: 0,
        // showticklabels: false,
      },
      angularaxis: {
        rotation: 18,
        color: 'black',
      },
      gridshape: 'linear',
    },
    title: '감정의 분포',
    // showlegend: false,
    // displayModeBar: false
  }



  return (
    <Container style={{width: screenWidth, marginVertical: 20}}>
      <Plotly 
        data={data} 
        layout={layout} 
        debug 
        enableFullPlotly
        style={{
          width: screenWidth,
          height: screenHeight,
          flex: 9
        }} 
      />
    </Container>
  )
}

const Container = styled.View`
  flex: 1;
`