import React, { useState, useEffect } from 'react';
import Styled from 'styled-components/native';
// import { Link } from 'react-router-dom';
import Btn from '../User/Button';
import { View, Text, StyleSheet, Button, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Feather } from '@expo/vector-icons';
import ListOfMyNegativeBeans from './ListOfMyNegativeBeans';
import ListOfMyPositiveBeans from './ListOfMyPositiveBeans';

const { width: screenWidth } = Dimensions.get('window');

export default function ChooseRoom({ navigation, route }) {
  // const  { gourdKinds } = req.params;
  const [room, setRoom] = useState(0);
  const [beansData, setBeansData] = useState();
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
    setBeansData(data.data.data);
    // if (n === 1) {
    //   navigation.navigate('ListOfMyPositiveBeans', { data: data.data.data});
    // } else {
    //   navigation.navigate('ListOfMyNegativeBeans', { data: data.data.data});
    // }

    // ! Test
    if (n === 1) {
      setRoom(1);
    } else {
      setRoom(2);
    }
  };
  console.log(beansData, '- -  - - - - - - - - - - - - - -');
  return (
    <Container style={{ width: screenWidth }}>
      <ImageBackgrounds source={require('../../img/background.jpeg')} resizemode="cover">
        {room === 0 ? (
          <>
            <TouchableOpacity activeOpacity={0.8} style={{ right: 173, bottom: 55, width: 35, height: 35 }} onPress={goBack}>
              <Text>
                <Feather name="arrow-left" size={35} color="black" />
              </Text>
            </TouchableOpacity>
            <ImageBackground
              source={require('../../img/red.png')}
              resizemode="cover"
              style={{ resizeMode: 'cover', width: 200, height: 200 }}
            >
              <TouchableOpacity style={{ alignItems: 'center', marginTop: 80 }} onPress={() => reqList(1)}>
                <Text style={{ color: 'white', fontSize: 30 }}>긍정이</Text>
              </TouchableOpacity>
            </ImageBackground>
            <ImageBackground
              source={require('../../img/yellow.png')}
              resizemode="cover"
              style={{ resizeMode: 'cover', width: 200, height: 200 }}
            >
              <TouchableOpacity style={{ alignItems: 'center', marginTop: 80 }} onPress={() => reqList(0)}>
                <Text style={{ color: 'white', fontSize: 30 }}>부정이</Text>
              </TouchableOpacity>
            </ImageBackground>
          </>
        ) : room === 1 ? (
          <ListOfMyPositiveBeans data={beansData} setRoom={setRoom} navigation={navigation} setBeansData={setBeansData} />
        ) : (
          <ListOfMyNegativeBeans data={beansData} setRoom={setRoom} navigation={navigation} setBeansData={setBeansData} />
        )}
      </ImageBackgrounds>
    </Container>
  );
}

const Container = Styled.View`
  flex: 1
`;

const ImageBackgrounds = Styled.ImageBackground`
  // flex-direction: row;
  justify-content: space-around;
  align-items: center;
  height: 100%;
  padding: 50px;
  width: 100%;
  opacity: 0.9;
`;
