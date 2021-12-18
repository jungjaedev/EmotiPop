import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Text, TextInput, View, SafeAreaView, ScrollView, Dimensions, TouchableOpacity, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import Plotly from 'react-native-plotly';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getChartData } from '../../modules/chart';
import { reloadAsync } from 'expo-updates';
import Nodata from './Nodata';
import { PieChart } from 'react-native-gifted-charts';
import axios from 'axios';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function ChartContainer() {
  const [getData, setGetData] = useState(false);
  const [emotionList, setEmotionList] = useState([]);

  useEffect(() => {
    getToken();
  }, []);

  // const emotionList = [];
  const getToken = async () => {
    const token = await AsyncStorage.getItem('AccessToken');
    // dispatch(getChartData(token));
    const res = await axios.get(`http://ec2-13-209-98-187.ap-northeast-2.compute.amazonaws.com:8080/stats`, {
      headers: {
        ContentType: 'application/json',
        authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });

    const colors = ['#177AD5', '#79D2DE', '#ED6665', '#fcba03', '#4b35db', '#db358e', '#81ed7b', '#4a5e49', '#11ff00', '#870c48'];
    const Arr = Object.entries(res.data.emotion);
    console.log('0000000000000', Arr);
    const newArr = [];
    Arr.forEach((el, idx) => {
      newArr.push({ value: el[1], text: el[0], color: colors[idx] });
    });
    setGetData(true);
    setEmotionList(newArr);
  };
  // console.log('222222', emotionList);

  return (
    <Container style={{ width: screenWidth }}>
      {emotionList.length !== 0 ? (
        <ChartView>
          <Header>
            <Title style={{ borderBottomWidth: 3, borderBottomColor: '#a9caf5', borderRadius: 10 }}>
              <TitleText>감정통계</TitleText>
            </Title>
          </Header>

          <View style={{ marginBottom: 50, flexDirection: 'row' }}>
            <PieChart
              innerRadius={70}
              innerCircleColor={'#c0ecfa'}
              textColor="navy"
              // shiftTextX={-110}
              // shiftTextY={210}
              data={emotionList}
              donut
              fontStyle={'normal'}
            />
            <Colors>
              {emotionList.map((el, idx) => {
                return (
                  <View style={{ flexDirection: 'row', margin: 5, justifyContent: 'center', alignItems: 'center' }} key={idx}>
                    <Text>{el.text}</Text>
                    <View style={{ backgroundColor: el.color, width: 10, height: 10, borderRadius: 30, marginLeft: 5 }}></View>
                  </View>
                );
              })}
            </Colors>
          </View>
        </ChartView>
      ) : (
        <Nodata />
      )}
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  /* align-items: center; */
  justify-content: center;
`;

const ChartView = styled.View`
  /* align-items: center; */
  justify-content: center;
  weight: 100%;
  margin-right: auto;
  margin-left: auto;
`;
const Title = styled.View`
  /* align-items: center; */
  padding: 5px;
`;
const Header = styled.View`
  margin-bottom: 70px;
  weight: 100%;
  /* align-items: center; */
`;
const Colors = styled.View`
  /* flex-direction: row; */
  margin-top: 30px;
`;
const TitleText = styled.Text`
  font-size: 23px;
  font-weight: bold;
`;
