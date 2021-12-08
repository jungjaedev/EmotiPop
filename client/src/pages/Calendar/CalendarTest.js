import React, { useState, useEffect } from 'react';
import moment from 'moment';
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
  const [getMoment, setMoment]=useState(moment());     
  const today = getMoment;

  const firstWeek = today.clone().startOf('month').week();
  const lastWeek = today.clone().endOf('month').week() === 1 ? 53 : today.clone().endOf('month').week();

    const calendarArr = () => {

      let result = [];
      let week = firstWeek;
      for ( week; week <= lastWeek; week++) {
        result = result.concat(
          <View key={week} style={{ flexDirection: 'row' }}>
            {
              Array(7).fill(0).map((data, index) => {
                let days = today.clone().startOf('year').week(week).startOf('week').add(index, 'day'); //d로해도되지만 직관성

                if(moment().format('YYYYMMDD') === days.format('YYYYMMDD')){
                  return(
                      <View key={index} style={{backgroundColor:'red'}} >
                        <Text>{days.format('D')}</Text>
                      </View>
                  );
                }else if(days.format('MM') !== today.format('MM')){
                  return(
                      <View key={index} style={{backgroundColor:'gray', opacity: .3}} >
                        <Text>{days.format('D')}</Text>
                      </View>
                  );
                }else{
                  return(
                      <TouchableOpacity key={index} onPress={() => console.log(days.format('D'))}>
                        <Text>{days.format('D')}</Text>
                      </TouchableOpacity>
                  );
                }
              })
            }
          </View>
        );
      }
      return result;
    }

  return (
    <View style={{ 
      alignItems: 'center', 
      justifyContent: 'space-between',
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT - 60
    }}>
      <CalContainer className="App" style={{ marginVertical: 20, width: SCREEN_WIDTH }}>

        <CalMenu >
          <TouchableOpacity onPress={() => { setMoment(getMoment.clone().subtract(1, 'month')) }}>
            <Text>
              이전달
            </Text>
            </TouchableOpacity>
          <Text>{today.format('YYYY 년 MM 월')}</Text> 
          <TouchableOpacity onPress={() => { setMoment(getMoment.clone().add(1, 'month')) }}>
            <Text>
              다음달
            </Text>
          </TouchableOpacity>
        </CalMenu>
        <Yoil>
          <Text>일</Text>
          <Text>월</Text>
          <Text>화</Text>
          <Text>수</Text>
          <Text>목</Text>
          <Text>금</Text>
          <Text>토</Text>
        </Yoil>
        <View>
          <View>
            {calendarArr()}
          </View>
        </View>
      </CalContainer>
    </View>
  );
}

const CalContainer = styled.View`
`
const CalMenu = styled.View`
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
`
const Yoil = styled.View`
  flex-direction: row;
`