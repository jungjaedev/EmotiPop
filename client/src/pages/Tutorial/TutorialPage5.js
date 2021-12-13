import React from 'react';

import { Text, TextInput, View, SafeAreaView, ScrollView, Dimensions } from 'react-native';
import styled from 'styled-components/native';

// 달력 or통계
export default function TutorialPage5() {
  const { width: SCREEN_WIDTH } = Dimensions.get('window');

  return (
    <Page style={{ width: SCREEN_WIDTH }}>
      <Dots>
        <Dot></Dot>
        <Dot></Dot>
        <Dot></Dot>
        <Dot style={{ backgroundColor: '#9200ab' }}></Dot>
      </Dots>

      <ImageBackgrounds source={require('../../img/background.jpeg')} resizemode="cover">
        <Title>
          차트 <BlueBean source={require('../../img/redBean.png')} resizemode="cover"></BlueBean>
        </Title>
        <Content>
          그동안 누적된 당신의 <Text style={{ color: '#035c50' }}>감정</Text>들의 수치를 확인할 수 있어요!
        </Content>

        <InnerBackground source={require('../../img/iphone.png')} resizemode="contain"></InnerBackground>
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
  width: 90%;
  top: 200px;
  left: 50px;
`;

const Page = styled.View`
  margin-top: 20px;
  width: 100%;
  height: 100%;
  background: #ddd;
  justify-content: center;
  align-items: center;
`;
const Title = styled.Text`
  margin-top: 30px;
  font-weight: bold;
  font-size: 30px;
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
  top: 10px;
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
