import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Button, View, Text, TouchableOpacity, Dimensions, ImageBackground } from 'react-native';
import * as Update from 'expo-updates';
import styled from 'styled-components/native';
import Nav from '../Home/Nav';
import { SimpleLineIcons } from '@expo/vector-icons';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function CalenderContainer({ navigation }) {
  const [getMoment, setMoment] = useState(moment());
  const today = getMoment;
  const firstWeek = today.clone().startOf('month').week();
  const lastWeek = today.clone().endOf('month').week() === 1 ? 53 : today.clone().endOf('month').week();

  // const [dates, setDates] = React.useState([]);
  // const [markedDates, setMarkedDates] = React.useState(null);
  // let obj = dates.reduce(
  //   (c, v) =>
  //   Object.assign(c, {
  //   [v]: { marked: true, dotColor: 'red' },
  //   }),
  //   {},
  //   );
  //   console.log(obj);
  //   setMarkedDates(obj);
  // Todo: Get요청... 글쓴날짜 표시!!

  // Todo: 날짜 누르면 -> ChooseRoom 이동(날짜정보 같이 넘겨줘야함)

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
                  <TouchableOpacity key={index} onPress={() => console.log(days.format('YYYY-MM-DD'))}>
                    <View style={{ width: 20, height: 20 }}>
                      <Text>{days.format('D')}</Text>
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
        <Yoil style={{ borderBottomWidth: 3, marginVertical: 5 }}>
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