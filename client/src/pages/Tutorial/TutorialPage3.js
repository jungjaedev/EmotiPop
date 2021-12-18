import React from 'react';

import { Text, TextInput, View, SafeAreaView, ScrollView, Dimensions } from 'react-native';
import styled from 'styled-components/native';

// 달력or통계
export default function TutorialPage3() {
  const { width: SCREEN_WIDTH } = Dimensions.get('window');

  return (
    <Page style={{ width: SCREEN_WIDTH }}>
      <Dots>
        <Dot></Dot>
        <Dot style={{ backgroundColor: '#9200ab' }}></Dot>
        <Dot></Dot>
        <Dot></Dot>
      </Dots>
      <ImageBackgrounds source={require('../../img/background.jpeg')} resizemode="cover">
        <Title>
          마이캘린더 <BlueBean source={require('../../img/redBean.png')} resizemode="cover"></BlueBean>
        </Title>
        <Content>
          <Text style={{ color: '#91008f' }}>마이캘린더</Text>를 통해 그동안의 기록들을 볼 수 있어요!
        </Content>
        <InnerBackground source={require('../../img/tutorialCalendar111.png')} resizemode="contain"></InnerBackground>
      </ImageBackgrounds>
    </Page>
  );
}
const BlueBean = styled.ImageBackground`
  margin-top: 20px;
  height: 30px;
  width: 30px;
`;
const ImageBackgrounds = styled.ImageBackground`
  flex: 1;
  height: 100%;
  width: 100%;
  opacity: 0.8;
  align-items: center;
`;

const InnerBackground = styled.ImageBackground`
  position: absolute;
  height: 90%;
  width: 100%;
  top: 230px;
  left: 15px;
`;

const Page = styled.View`
  /* margin-top: 20px; */
  width: 100%;
  height: 100%;
  background: #ddd;
  justify-content: center;
  align-items: center;
`;
const Title = styled.Text`
  margin-top: 60px;
  font-weight: bold;
  font-size: 30px;
`;

const Content = styled.Text`
  margin-top: 10px;
  font-weight: bold;
  font-size: 20px;
  padding: 20px;
  padding-left: 50px;
  padding-right: 50px;
  color: black;
`;

const Dot = styled.View`
  width: 10px;
  height: 10px;
  border: 1px solid black;
  border-radius: 10px;
  margin-right: 5px;
  background-color: lightgrey;
`;

const Dots = styled.View`
  justify-content: space-between;
  flex-direction: row;
  position: absolute;
  top: 35px;
`;
