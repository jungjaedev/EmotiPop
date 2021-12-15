import React from 'react';

import { Text, TextInput, View, SafeAreaView, ScrollView, Dimensions } from 'react-native';
import styled from 'styled-components/native';

// 박터지는 페이지
export default function TutorialPage4() {
  const { width: SCREEN_WIDTH } = Dimensions.get('window');

  return (
    <Page style={{ width: SCREEN_WIDTH }}>
      <Dots>
        <Dot></Dot>
        <Dot></Dot>
        <Dot style={{ backgroundColor: '#9200ab' }}></Dot>
        <Dot></Dot>
      </Dots>
      <ImageBackgrounds source={require('../../img/background.jpeg')} resizemode="cover">
        <Title>
          일주일에 한번 터지는{'\n'}감정박 <BlueBean source={require('../../img/blueBean.png')} resizemode="contain"></BlueBean>
        </Title>
        <Content>
          <Text style={{ color: '#035c50' }}>일요일</Text>에 일주일동안 쌓인 당신의 감정이 터져요!
        </Content>
        <InnerBackground source={require('../../img/tutorialpop.png')} resizemode="contain"></InnerBackground>
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
  height: 87%;
  width: 100%;
  top: 250px;
  left: 35px;
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
  text-align: center;
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
