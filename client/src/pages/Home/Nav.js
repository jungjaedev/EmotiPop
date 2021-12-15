import React, { useState } from 'react';
import { 
    Button, 
    View, 
    Text,
    TouchableOpacity,
    Dimensions,
  } from 'react-native';
import styled from 'styled-components/native';
import { 
    MaterialCommunityIcons, 
    Entypo,
    FontAwesome,
    FontAwesome5,
    Ionicons,
  } from '@expo/vector-icons'
import { useDispatch } from 'react-redux';
import { pageNav } from '../../modules/pages';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');


export default function MainHome() {
  const dispatch = useDispatch();
  const [color, setColor] = useState({
    home: true,
    cal: false,
    chart: false,
    mypage: false
  })
  // console.log(color)

  return (
    <View style={{ 
      // alignItems: 'center', 
      // justifyContent: 'space-between',
      width: SCREEN_WIDTH,
      height: 60,
      // marginVertical: 30
    }}>      
      <NavContainer>
        <Btn onPress={() => {
          dispatch({ type: 'pages/NAV_HOME' })
          setColor({
            ...color,
            home: true,
            cal: false,
            chart: false,
            mypage: false 
          })
        }}>
          <Ionicons name="md-home-outline" size={30} color={ color.home ? 'blue' : 'black'} />
        </Btn>
        <Btn onPress={() => {
          dispatch({ type: 'pages/NAV_CAL' })
          setColor({
            ...color,
            home: false,
            cal: true,
            chart: false,
            mypage: false
          })
        }}>
          <FontAwesome name="calendar-check-o" size={30} color={ color.cal ? 'blue' : 'black'} />
        </Btn>
        <Btn onPress={() => {
          dispatch({ type: 'pages/NAV_CHART' })
          setColor({
            ...color,
            home: false,
            cal: false,
            chart: true,
            mypage: false
          })
        }}>
          <FontAwesome5 name="chart-bar" size={30} color={ color.chart ? 'blue' : 'black'} />
        </Btn>
        <Btn onPress={() => {
          dispatch({ type: 'pages/NAV_MYPAGE' })
          setColor({
            ...color,
            home: false,
            cal: false,
            chart: false,
            mypage: true
          })
        }}>
          <Ionicons name="md-person-circle-outline" size={30} color={ color.mypage ? 'blue' : 'black'} />
        </Btn>
      </NavContainer>
    </View>
  );
}

const NavContainer = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: #fff;
  opacity: .3;
  height: 30px;
`
const Btn = styled.TouchableOpacity`
  flex: 1;
  height: 60px;
  width: 60px;
  /* margin-left: 35px; */
  background: #eee;
  /* border-radius: 50%; */
  align-items: center;
  justify-content: center;
`