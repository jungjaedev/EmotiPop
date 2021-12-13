import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Button, View, Text, TouchableOpacity, Dimensions, ImageBackground } from 'react-native';
import * as Update from 'expo-updates';
import styled from 'styled-components/native';
import Nav from '../Home/Nav';
import { SimpleLineIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function CalenderContainer({ navigation }) {
  const [getMoment, setMoment] = useState(moment());
  const today = getMoment;

  const [checkDays, setCheckDays] = useState([]);
  const firstWeek = today.clone().startOf('month').week();
  const lastWeek = today.clone().endOf('month').week() === 1 ? 53 : today.clone().endOf('month').week();

  const getCalendarData = async () => {
    const token = await AsyncStorage.getItem('AccessToken');
    const data = await axios.get('http://ec2-13-209-98-187.ap-northeast-2.compute.amazonaws.com:8080/calendar', {
      headers: {
        ContentType: 'application/json',
        authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });

    setCheckDays(data.data.data);
    // console.log('------data.data.data : ', data.data.data);
  };
  useEffect(() => {
    getCalendarData();
  }, []);
  //  글작성안된날짜 누르면 작동 X
  const haveBean = days => {
    if (checkDays.includes(days.format('Y-M-D'))) {
      return navigation.navigate('ChooseRoom', { data: days.format('Y-M-D') });
    } else {
      return console.log('no BEAN!');
    }
  };

  const calendarArr = () => {
    let result = [];
    let week = firstWeek;
    for (week; week <= lastWeek; week++) {
      result = result.concat(
        <Cal key={week} style={{ flexDirection: 'row' }}>
          {Array(7)
            .fill(0)
            .map((data, index) => {
              let days = today.clone().startOf('year').week(week).startOf('week').add(index, 'day'); //d로해도되지만 직관성

              if (days.format('MM') !== today.format('MM')) {
                return (
                  <View key={index} style={{ opacity: 0.3 }}>
                    <Text>{days.format('D')}</Text>
                  </View>
                );
              } else {
                return (
                  <TouchableOpacity key={index} onPress={() => haveBean(days)}>
                    <View style={{ width: 20, height: 20 }}>
                      {checkDays.includes(days.format('Y-M-D')) ? (
                        <View>
                          <EveryDay>{days.format('D')}</EveryDay>
                          <Bean source={require('../../img/blueBean.png')}></Bean>
                        </View>
                      ) : (
                        <EveryDay>{days.format('D')}</EveryDay>
                      )}
                    </View>
                  </TouchableOpacity>
                );
              }
            })}
        </Cal>
      );
    }
    return result;
  };

  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'space-between',
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT - 60,
        //       height: SCREEN_HEIGHT - 40
      }}
    >
      <CalContainer className="App" style={{ marginTop: 20, width: SCREEN_WIDTH }}>
        <CalMenu>
          <TouchableOpacity
            onPress={() => {
              setMoment(getMoment.clone().subtract(1, 'month'));
            }}
          >
            <SimpleLineIcons name="arrow-left" size={24} color="black" style={{ marginVertical: 3 }} />
          </TouchableOpacity>
          <Text style={{ fontSize: 19, fontWeight: '600' }}>{today.format('YYYY 년 MM 월')}</Text>
          <TouchableOpacity
            onPress={() => {
              setMoment(getMoment.clone().add(1, 'month'));
            }}
          >
            <SimpleLineIcons name="arrow-right" size={24} color="black" style={{ marginVertical: 3 }} />
          </TouchableOpacity>
        </CalMenu>
        {/* <Yoil style={{ borderBottomWidth: 3, borderBottomColor: '#a9caf5', borderRadius: 20 }}> */}
        <Yoil style={{ borderBottomWidth: 2, marginVertical: 5, borderBottomColor: '#12244a' }}>
          <Week>일</Week>
          <Week>월</Week>
          <Week>화</Week>
          <Week>수</Week>
          <Week>목</Week>
          <Week>금</Week>
          <Week>토</Week>
        </Yoil>
        <Days>
          <View>{calendarArr()}</View>
        </Days>
      </CalContainer>
    </View>
  );
}

const CalContainer = styled.View``;

const EveryDay = styled.Text`
  font-weight: 700;
`;

const CalMenu = styled.View`
  flex: auto;
  flex-direction: row;
  text-align: center;
  justify-content: space-around;
  width: 100%;
  top: 5%;
  margin-top: 15px;
  /* background-color: slateblue; */
  border-radius: 10px;
`;

const Yoil = styled.View`
  flex: auto;
  text-align: center;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  /* background-color: slateblue; */
  border-radius: 5px;
`;

const Days = styled.View`
  flex: auto;
  flex-direction: row;
  justify-content: space-around;
  /* top: 10%; */
  width: 100%;
  height: 70%;
  border-radius: 10px;
  /* background-color: skyblue; */
  padding-right: 10px;
  padding-left: 10px;
`;

const Cal = styled.View`
  flex: auto;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  height: 30%;
  /* right: 140%; */
  /* padding: 15%; */
  align-items: center;
`;

const Week = styled.Text`
  font-size: 17px;
`;

const Bean = styled.ImageBackground`
  /* flex: 1; */
  height: 30px;
  width: 30px;
  opacity: 0.8;
`;
