import React, { useState, } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  Button, 
  TouchableOpacity, 
  Alert,
  ActivityIndicator,
  SafeAreaView
  } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components/native';
import Btn from '../User/Button';
import Chart from './Chart'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'; 



export default function ChartContainer({navigation}) {
  const beanInfo = async () => {
    const token = await AsyncStorage.getItem('AccessToken')
    console.log(token)
    // const res = await axios('http://10.0.2.2:80/calendar')
    // console.log(res)
  }
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
  console.log(bean)
  beanInfo()
  
  return (
    <Container>
      <Header>Chart</Header>
      <Chart beans={bean}/>
    </Container>
  );
}

const Container = styled.SafeAreaView`
  /* justify-content: center; */
  align-items: center;
  justify-content: center;
  height: 80%; 
  width: 80%;
  margin-left: 10%;
  margin-top: 10%;
  /* border-radius: 10; */
  /* flex: 1; */
  background-color: #333;
`
const Header = styled.Text`
  font-size: 40px;
  font-weight: bold;
  margin: auto;
  margin-top: 100px;
  margin-bottom: 20px;
  color: #fff;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.08);
  `



