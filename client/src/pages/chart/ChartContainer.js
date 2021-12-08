import React, { useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  Button, 
  TouchableOpacity, 
  Alert,
  ActivityIndicator,
  SafeAreaView,
  Dimensions
  } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components/native';
import Btn from '../User/Button';
import Chart from './Chart'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { getChartData } from '../../modules/chart';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');



export default function ChartContainer() {
  const dispatch = useDispatch();
  const emotionState = useSelector(state => state.chart)

  const getToken = async () => {
    const token = await AsyncStorage.getItem('AccessToken')
    return token;
  }

  useEffect(async() => {
    try {
      const token = await getToken();
      console.log(token, 'flowflowflowflow1');
      dispatch(getChartData(token))
    } catch(err) {
      throw new Error(err)
    }
  }, [])

  const beans = [
    {
      id: 1,
      emotion: 'angry',
      level: 10,
    },
    {
      id: 2,
      emotion: 'happy',
      level: 8,
    },  
    {
      id: 3,
      emotion: 'depressed',
      level: 3,
    },   
    {
      id: 4,
      emotion: 'Shit',
      level: 7,
    },     
    {
      id: 5,
      emotion: 'melancholy',
      level: 5,
    },
    {
      id: 6,
      emotion: 'angry',
      level: 10,
    },
    {
      id: 7,
      emotion: 'happy',
      level: 8,
    },  
    {
      id: 8,
      emotion: 'depressed',
      level: 3,
    },   
    {
      id: 9,
      emotion: 'Shit',
      level: 7,
    },     
    {
      id: 10,
      emotion: 'melancholy',
      level: 5,
    },     
  ]

  const emotions = { 
    emotion: { 
      '행복': 5, '슬픔': 11, '걱정': 18, '화남': 10, '우울': 15, '설렘': 7, '만족': 17, '편안': 10, '뿌듯': 7, '신남': 10
    } 
  }
  function makeAvg(emotion) {
    const arrEmo = Object.entries(emotion.emotion)
    const total = arrEmo.reduce((acc, cur) => acc + cur[1], 0)
    const levels = arrEmo.map(item => item[1])
    const percentage = levels.map(el => Math.round(el / total * 100))
    let beans = [];
    
    for(let i = 0; i < 10; i++) {
      beans.push({[arrEmo[i][0]]: percentage[i]}) 
    }
    return beans;
  }
  const bean = makeAvg(emotions)
  // console.log(bean)
  // getToken()
  
  return (
    <Container style={{width: SCREEN_WIDTH}}>
      <Header >Chart</Header>
      <Chart beans={bean} />
    </Container>
  );
}

const Container = styled.SafeAreaView`
  /* justify-content: center; */
  align-items: center;
  justify-content: center;
  flex: 9 ;
  /* width: 80%; */
  /* margin-left: 10%; */
  /* margin-top: 10%; */
  /* border-radius: 10; */
  /* flex: 1; */
  background-color: #333;
`
const Header = styled.Text`
  font-size: 40px;
  font-weight: bold;
  margin: auto;
  /* margin-top: 100px; */
  /* margin-bottom: 20px; */
  color: #fff;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.08);
  `









/*
import React, { useEffect } from 'react';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";

import {
  Text,
  TextInput,
  View,
  SafeAreaView,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native'

const chartConfig = {
  backgroundGradientFrom: "#1E2923",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#08130D",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false // optional
};

export default function ChartTest({navigation}) {
  return(
    <View>
      <Text>Bezier Line Chart</Text>
      <LineChart
        data={{
          labels: ["January", "February", "March", "April", "May", "June"],
          datasets: [
            {
              data: [
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100
              ]
            }
          ]
        }}
        width={Dimensions.get("window").width} // from react-native
        height={220}
        yAxisLabel="$"
        yAxisSuffix="k"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#ffa726",
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726"
          }
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16
        }}
      />
    </View>
  )
}
*/