import React, { useEffect, useState } from 'react';
import { Button, View, Text, TouchableOpacity, Dimensions, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components/native';
import { StatusBar } from 'expo-status-bar';
import Nav from './Nav';
import CalendarContiner from '../Calendar/CalendarContainer';
import ChartContainer from '../chart/ChartContainer';
// import ChartTest from '../chart/ChartTest';
// import ChartTest2 from '../chart/ChartTest2'
import MyPage from '../User/MyPage';
import Home from './Home';
import Main from '../Main/Main';
import TutorialPage1 from '../Tutorial/TutorialPage1';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function MainHome({ navigation }) {
  const pageState = useSelector(state => state.pages);

  const [page, setPage] = useState({
    home: true,
    cal: false,
    chart: true,
    mypage: false,
  });
  // const [intro, setIntro] = useState(true);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setIntro(false)
  //   }, 2000)
  // }, [])

  // console.log(page)
  return (
    <BackGround
      style={{
        alignItems: 'center',
        justifyContent: 'space-between',
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
      }}
      source={require('../../img/background.jpeg')}
    >
      <StatusBar style="dark" />
      {/* {
        intro 
        ? <TutorialPage1 /> 
        : (
          <>
            {pageState.pages.home ? <Main navigation={navigation} /> : null}
            {pageState.pages.cal ? <CalendarContiner navigation={navigation} /> : null}
            {pageState.pages.chart ? <ChartContainer /> : null}
            {pageState.pages.mypage ? <MyPage navigation={navigation} /> : null}
            <Nav navigation={navigation} />
          </>
        ) 
      } */}
      {pageState.pages.home ? <Main navigation={navigation} /> : null}
      {pageState.pages.cal ? <CalendarContiner navigation={navigation} /> : null}
      {pageState.pages.chart ? <ChartContainer /> : null}
      {pageState.pages.mypage ? <MyPage navigation={navigation} /> : null}
      <Nav navigation={navigation} />
      
    </BackGround>
  );
}

const BackGround = styled.ImageBackground``;
