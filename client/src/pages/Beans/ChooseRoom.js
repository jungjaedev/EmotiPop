import React from 'react';
import Styled from 'styled-components/native';
// import { Link } from 'react-router-dom';
import Btn from '../User/Button';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Feather } from '@expo/vector-icons';

export default function ChooseRoom({ navigation, route }) {
  // const  { gourdKinds } = req.params;
  const goBack = () => {
    // console.log('BACK!!!');
    navigation.goBack();
  };
  const reqList = async n => {
    const token = await AsyncStorage.getItem('AccessToken');
    // 날짜 + 토큰 + 박종류
    // console.log(token);
    // console.log(route.params.data);

    const data = await axios.get(`http://ec2-13-209-98-187.ap-northeast-2.compute.amazonaws.com:8080/calendar/${route.params.data}/${n}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    // console.log(`-------------`, data.data);
    if (n === 1) {
      navigation.navigate('ListOfMyPositiveBeans', { data: data.data.data });
    } else {
      navigation.navigate('ListOfMyNegativeBeans', { data: data.data.data });
    }
  };

  return (
    <Container>
      <ImageBackgrounds source={require('../../img/background.jpeg')} resizemode="cover">
        <TouchableOpacity activeOpacity={0.8} style={{ position: 'absolute', width: 35, height: 35 }} onPress={goBack}>
          <Text>
            <Feather name="arrow-left-circle" size={35} color="black" />
          </Text>
        </TouchableOpacity>
        <Blue>
          <Btn name="Positive" onPress={() => reqList(1)} />
        </Blue>
        <Red>
          <Btn name="Negative" onPress={() => reqList(0)} />
        </Red>
      </ImageBackgrounds>
    </Container>
  );
}

const Container = Styled.View`
  flex: 1;
`;

const Blue = Styled.View`
  width: 150px;
  height: 150px;
  background-color: skyblue;
`;
const Red = Styled.View`
  width: 150px;
  height: 150px;
  background-color: pink;
`;

const ImageBackgrounds = Styled.ImageBackground`
  /* flex-direction: row; */
  justify-content: space-around;
  align-items: center;
  height: 100%;
  padding: 50px;
  width: 100%;
  opacity: 0.9;
`;
