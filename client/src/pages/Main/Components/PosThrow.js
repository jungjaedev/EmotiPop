import React, { useState, useEffect } from 'react';
import { Dimensions, TouchableOpacity, Text, TextInput, StyleSheet, Image, View, ImageBackground } from 'react-native';
import styled from 'styled-components/native';
import ShowContentModal from '../ShowContentModal';

export default function PosThrow({navigation}) {
  const { width: SCREEN_WIDTH } = Dimensions.get('window');
  const [isPressed, setIsPressed] = useState(false);

  const data = {
    contents: 'ttt',
    createdAt: '2021-12-08T02:06:29.000Z',
    emotion_level: 8,
    emotions: '설렘',
    gourdKinds: true,
    id: 67,
    updatedAt: '2021-12-08T02:06:29.000Z',
    users_id: 26,
  };

  const showModal = () => {
    setIsPressed(true);
    // console.log(isPressed);
    // console.log(111111);
  };
  return (
    <>
      <Container style={{ width: SCREEN_WIDTH }}>
        <ImageBackgrounds source={require('../../../img/throwtopositive.gif')} resizemode="cover"></ImageBackgrounds>
        {isPressed ? <ShowContentModal data={data} /> : null}
        <TouchableOpacity onPress={showModal}>
          <Text>화면을 터치해주세요</Text>
        </TouchableOpacity>
      </Container>
    </>
  );
}
const Container = styled.View`
  position: relative;
  flex: 1;
  height: 100%;
  width: 100%;
`;

const ImageBackgrounds = styled.ImageBackground`
  /* flex: 1; */
  position: relative;
  margin-top: 100px;
  height: 300px;
  width: 120%;
  /* right: 20%; */
  /* margin-right: auto; */
  margin-left: -100px;
`;
