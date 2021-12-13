import React from 'react';

import { Text, TextInput, View, SafeAreaView, ScrollView, Dimensions } from 'react-native';
import styled from 'styled-components/native';

// 메인페이지
export default function TutorialPage2() {
  const { width: SCREEN_WIDTH } = Dimensions.get('window');

  return (
    <Page style={{ width: SCREEN_WIDTH }}>
      <Dots>
        <Dot style={{ backgroundColor: '#9200ab' }}></Dot>
        <Dot></Dot>
        <Dot></Dot>
        <Dot></Dot>
      </Dots>
      <ImageBackgrounds source={require('../../img/background.jpeg')} resizemode="cover">
        <Title>
          색다른 감정일기장 <BlueBean source={require('../../img/blueBean.png')} resizemode="cover"></BlueBean>
        </Title>
        <Content>
          <Text style={{ color: '#035c50' }}>감정 박</Text>에 <Text style={{ color: '#a1028e' }}>감정 콩주머니</Text>를 던져서 당신의 감정을
          기록해보세요!
        </Content>
        <InnerBackground source={require('../../img/tutorialthrow.png')} resizemode="contain"></InnerBackground>
        <Text style={{ top: 350, color: 'navy', fontWeight: 'bold' }}>박을 터치하면 감정을 기록할 수 있어요</Text>
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
  top: 10px;
`;
