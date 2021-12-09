import React, { useEffect, useState } from 'react';
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
import Nav from './Nav'
import CalendarContiner from '../Calendar/CalendarContainer'
import ChartContainer from '../chart/ChartContainer';
// import ChartTest from '../chart/ChartTest';
// import ChartTest2 from '../chart/ChartTest2'
import MyPage from '../User/MyPage';
import Home from './Home'
import Main from '../Main/Main'


const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');


export default function MainHome({ navigation }) {
  const pageState = useSelector(state => state.pages)

  const [page, setPage] = useState({
    home: true,
    cal: false,
    chart: true,
    mypage: false
  })
  
  // console.log(page)
  return (
    <View style={{ 
      alignItems: 'center', 
      justifyContent: 'space-between',
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT
    }}>
      <StatusBar style='dark'/>
      { pageState.pages.home ? <Main navigation={navigation}/> : null }
      { pageState.pages.cal ? <CalendarContiner/> : null }
      { pageState.pages.chart ? <ChartContainer />: null }
      { pageState.pages.mypage ? <MyPage />: null}
      <Nav navigation={navigation}/>
    </View>
  );
}